import { Component, OnInit } from '@angular/core';
import { MatPaginator,  } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-libro',
  templateUrl: './consulta-libro.component.html',
  styleUrls: ['./consulta-libro.component.css']
})
/* CORTEZ */
export class ConsultaLibroComponent implements OnInit {

  dataSource:any;
/* CORTEZ */
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
 
  lstCategorias: DataCatalogo[] = [];
  lstTipos: DataCatalogo[] = [];
  maxYear: number = new Date().getFullYear();
/* CORTEZ */
  displayedColumns = ["idLibro","titulo","anio","serie","idCategoriaLibro","idDataCatalogo"];

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private utilService: UtilService,/* CORTEZ */
    private tokenService: TokenService
  ) {}

  objUsuario: Usuario = {};

  objCategoria: DataCatalogo = {};/* CORTEZ */
  objTipoLibro: DataCatalogo = {};

  titulo:string  = "";
  anio:string  = "";
  serie:string  = "";
  idCategoriaLibro:number = -1;/* CORTEZ */
  idDataCatalogo:number = -1;
  
  ngOnInit() {

    this.utilService.listaCategoriaDeLibro().subscribe(
      c => this.lstCategorias = c/* CORTEZ */
    );

    this.utilService.listaTipoLibroRevista().subscribe(
      t => this.lstTipos = t
    );/* CORTEZ */

    this.objUsuario.idUsuario = this.tokenService.getUserId();

    this.consulta();/* CORTEZ */

  }

  consulta(){

    this.anio = this.anio !== null ? this.anio : '';
/* CORTEZ */
    console.log(">> titulo >> " + this.titulo) ;
    console.log(">> anio >> " + this.anio) ;
    console.log(">> serie >> " + this.serie) ;/* CORTEZ */
    console.log(">> idCategoriaLibro >> " + this.idCategoriaLibro) ;
    console.log(">> idDataCatalogo >> " + this.idDataCatalogo) ;

    this.libroService.consulta(/* CORTEZ */
      this.titulo, this.anio, this.serie, this.idCategoriaLibro, this.idDataCatalogo
      ).subscribe(
      x => {/* CORTEZ */
            console.log(x);
            this.dataSource = new MatTableDataSource<Libro>(x);
            this.dataSource.paginator = this.paginator;/* CORTEZ */
      }
    );
  }

  exportarPDF() {

    this.consulta();
    this.anio = this.anio !== null ? this.anio : '';
/* CORTEZ */
    this.libroService.generateDocumentReport(
      this.titulo, 
      this.anio,
      this.serie,
      this.idCategoriaLibro,/* CORTEZ */
      this.idDataCatalogo
      ).subscribe(
          response => {
            console.log(response);/* CORTEZ */
            var url = window.URL.createObjectURL(response.data);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');/* CORTEZ */
            a.setAttribute('target', 'blank');
            a.href = url;
            a.download = response.filename;
            a.click();/* CORTEZ */
            window.URL.revokeObjectURL(url);
            a.remove();
        }); 
  }



  exportarExcel() {
/* CORTEZ */
    this.consulta();
    this.anio = this.anio !== null ? this.anio : '';

    console.log(this.titulo);
    console.log(this.anio);
    console.log(this.serie);/* CORTEZ */
    console.log(this.idCategoriaLibro);
    console.log(this.idDataCatalogo);
/* CORTEZ */
    this.libroService
      .generateExcelReport(
        this.titulo, 
        this.anio,
        this.serie,/* CORTEZ */
        this.idCategoriaLibro,
        this.idDataCatalogo
      )
      .subscribe((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');/* CORTEZ */
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }

/* CORTEZ */


}
