import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from 'src/app/models/autor.model';
import { Pais } from 'src/app/models/pais.model';
import { TokenService } from 'src/app/security/token.service';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-consulta-autor',
  templateUrl: './consulta-autor.component.html',
  styleUrls: ['./consulta-autor.component.css']
})
export class ConsultaAutorComponent  {

  dataSource:any;

  @ViewChild (MatPaginator, {static: true}) paginator!: MatPaginator;

  displayedColumns =["idAutor","nombres","telefono","estado","pais"];

  nombres:string ="";
  telefono:string="";
  estado:boolean = true;
  selPais:number = -1;

  lstPais: Pais[] = [];

  constructor(private autorService:AutorService,
     private utilService:UtilService,
     private tokenService: TokenService){
      this.utilService.listaPais().subscribe(
        x => this.lstPais = x
      );
  }


  consulta(){
    console.log(">> nombre >> "+this.nombres);
    console.log(">> telefono >> "+this.telefono);
    console.log(">> estado >> "+this.estado);
    console.log(">> pais >> "+this.selPais);

    this.autorService.consulta(this.nombres, this.telefono, this.estado ? 1 : 0, this.selPais).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Autor>(x);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  exportarPDF() {
    this.autorService.generateDocumentReport(this.nombres, this.telefono, this.estado ? 1 : 0, this.selPais).subscribe(
      response => {
        console.log(response);
        var url = window.URL.createObjectURL(response.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    });

  }

}
