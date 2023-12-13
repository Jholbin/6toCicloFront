import {Component, ViewChild} from '@angular/core';
import {Editorial} from "../../models/editorial.model";
import {EditorialService} from "../../services/editorial.service";
import {Pais} from "../../models/pais.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {UtilService} from "../../services/util.service";
import {TokenService} from "../../security/token.service";
import {Usuario} from "../../models/usuario.model";

@Component({
  selector: 'app-consulta-editorial',
  templateUrl: './consulta-editorial.component.html',
  styleUrls: ['./consulta-editorial.component.css']
})
export class ConsultaEditorialComponent {
  // Grila
  dataSource: any;

  // Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  // Cabecera
  displayedColumns = ["idEditorial","razonSocial", "direccion", "ruc","estado","pais"];

  // Parametros de la consulta
  razonSocial: string = '';
  direccion: string = '';
  ruc: string = '';
  estado: boolean = true;
  selPais: number = -1;

  //Para el pais
  paises: Pais[] = [];

  objUsuario: Usuario = {};

  constructor(
    private editorialService:EditorialService,
    private utilService:UtilService,
  ){
    this.razonSocial = '';
    this.direccion = '';
    this.ruc = '';
    this.utilService.listaPais().subscribe(
      x => this.paises = x
    )
  }

  consulta(){
    console.log(">> Razón social >> " + this.razonSocial.length) ;
    console.log(">> Dirección >> " + this.direccion.length) ;
    console.log(">> RUC >> " + this.ruc.length) ;
    console.log(">> Estado >> " + this.estado) ;
    console.log(">> País >> " + this.selPais) ;

    this.editorialService.consulta(this.razonSocial, this.direccion, this.ruc, this.estado ? 1 : 0, this.selPais).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Editorial>(x);
        this.dataSource.paginator = this.paginator;
      }
    );
  }


  exportarPDF() {

    this.editorialService.generateDocumentReport(this.razonSocial, this.direccion, this.ruc,this.estado ? 1 : 0, this.selPais).subscribe(
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
