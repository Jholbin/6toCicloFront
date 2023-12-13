import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/models/rol.model';
import { Opcion } from 'src/app/security/opcion';
import { OpcionService } from 'src/app/services/opcion.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaccion-asignacion-opcion',
  templateUrl: './transaccion-asignacion-opcion.component.html',
  styleUrls: ['./transaccion-asignacion-opcion.component.css']
})
export class TransaccionAsignacionOpcionComponent {

  lstRol: Rol[] = [];
  lstOpcion: Opcion[] = [];
  lstOpcionDeRol: Opcion[] = [];

  rol : string = "-1";
  opcion : string = "-1";


  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idOpcion","nombre","ruta","estado","tipo",'actions'];

  constructor(private utilService: UtilService, private opcionService: OpcionService){
        this.utilService.listaRol().subscribe(
            x   =>   this.lstRol =x
        );
        this.utilService.listaOpcion().subscribe(
            x   =>   this.lstOpcion=x
        );
  }


  cargaOpcion(){
    this.opcionService.listaOpcionRol(this.rol).subscribe(
          x   => {
                this.lstOpcionDeRol =x
                this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
                this.dataSource.paginator = this.paginator 
          } 
    );
  }

  registraOpcion(){
      console.log(">> registraOpcion >>> ");
      console.log(">> this.rol >>> " + this.rol );
      console.log(">> this.opcion >>> " + this.opcion );
      this.opcionService.registraOpcion(this.rol, this.opcion).subscribe(
          x => {
            Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
            this.lstOpcionDeRol = x.lista
            this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
            this.dataSource.paginator = this.paginator 

          }
      );
  }

  eliminaOpcion(obj:Opcion){
    console.log(">> eliminaPasatiempo >>> ");
    console.log(">> this.rol >>> " + this.rol );
    console.log(">> this.opcion >>> " + this.opcion );
    this.opcionService.eliminaOpcion(this.rol, obj.idOpcion!).subscribe(
      x => {
        Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
        this.lstOpcionDeRol = x.lista
        this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
        this.dataSource.paginator = this.paginator 

      }
  );
  }

}
