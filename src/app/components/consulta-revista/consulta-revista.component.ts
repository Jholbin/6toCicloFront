import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pais } from 'src/app/models/pais.model';
import { Revista } from 'src/app/models/revista.model';
import { TokenService } from 'src/app/security/token.service';
import { RevistaService } from 'src/app/services/revista.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-consulta-revista',
  templateUrl: './consulta-revista.component.html',
  styleUrls: ['./consulta-revista.component.css']
})
export class ConsultaRevistaComponent  {

  dataSource:any;

  @ViewChild (MatPaginator, {static: true}) paginator!: MatPaginator;

  displayedColumns =["idRevista","nombre","frecuencia","estado","pais"];

  nombre:string ="";
  frecuencia:string="";
  estado:boolean = true;
  selPais:number = -1;

  lstPais: Pais[] = [];

  constructor(private revistaService:RevistaService,
     private utilService:UtilService,
     private tokenService: TokenService){
      this.utilService.listaPais().subscribe(
        x => this.lstPais = x
      );
  }


  consulta(){
    console.log(">> nombre >> "+this.nombre);
    console.log(">> frecuencia >> "+this.frecuencia);
    console.log(">> estado >> "+this.estado);
    console.log(">> pais >> "+this.selPais);

    this.revistaService.consulta(this.nombre, this.frecuencia, this.estado ? 1 : 0, this.selPais).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Revista>(x);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  exportarPDF() {
    this.revistaService.generateDocumentReport(this.nombre, this.frecuencia, this.estado ? 1 : 0, this.selPais).subscribe(
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
