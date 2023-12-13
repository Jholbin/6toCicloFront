import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { IndexComponent } from './index/index.component';

import { AgregarLibroComponent } from './components/agregar-libro/agregar-libro.component';
import { AgregarAutorComponent } from './components/agregar-autor/agregar-autor.component';
import { AgregarEditorialComponent } from './components/agregar-editorial/agregar-editorial.component';
import { AgregarRevistaComponent } from './components/agregar-revista/agregar-revista.component';

import { ConsultaLibroComponent } from './components/consulta-libro/consulta-libro.component';
import { ConsultaAutorComponent } from './components/consulta-autor/consulta-autor.component';
import { ConsultaEditorialComponent } from './components/consulta-editorial/consulta-editorial.component';
import { ConsultaRevistaComponent } from './components/consulta-revista/consulta-revista.component';

import { CrudLibroComponent } from './components/crud-libro/crud-libro.component';
import { CrudAutorComponent } from './components/crud-autor/crud-autor.component';
import { CrudEditorialComponent } from './components/crud-editorial/crud-editorial.component';
import { CrudRevistaComponent } from './components/crud-revista/crud-revista.component';

import { TransaccionAsignacionRolComponent } from './components/transaccion-asignacion-rol/transaccion-asignacion-rol.component';
import { TransaccionAsignacionOpcionComponent } from './components/transaccion-asignacion-opcion/transaccion-asignacion-opcion.component';
import { TransaccionPrestamoLibroComponent } from './components/transaccion-prestamo-libro/transaccion-prestamo-libro.component';
import { TransaccionDevolucionLibroComponent } from './components/transaccion-devolucion-libro/transaccion-devolucion-libro.component';
import { TransaccionReporteLibroComponent } from './components/transaccion-reporte-libro/transaccion-reporte-libro.component';
import { TransaccionAsignacionLibroComponent } from './components/transaccion-asignacion-libro/transaccion-asignacion-libro.component';

import {CrudEditorialAddComponent} from "./components/crud-editorial-add/crud-editorial-add.component";
import {CrudEditorialUpdateComponent} from "./components/crud-editorial-update/crud-editorial-update.component";

const routes: Routes = [
  {path:"verRegistroLibro", component:AgregarLibroComponent },
  {path:"verRegistroAutor", component:AgregarAutorComponent },
  {path:"verRegistroEditorial", component:AgregarEditorialComponent },
  {path:"verRegistroRevista", component:AgregarRevistaComponent },

  {path:"verConsultaLibro", component:ConsultaLibroComponent },
  {path:"verConsultaAutor", component:ConsultaAutorComponent },
  {path:"verConsultaEditorial", component:ConsultaEditorialComponent  },
  {path:"verConsultaRevista", component:ConsultaRevistaComponent },

  {path:"verCrudLibro", component:CrudLibroComponent },
  {path:"verCrudAutor", component:CrudAutorComponent },
  {path:"verCrudEditorial", component:CrudEditorialComponent },
  {path:"verCrudRevista", component:CrudRevistaComponent },

  {path:"agregarEditorial", component:CrudEditorialAddComponent },
  { path: 'editarEditorial/:id', component: CrudEditorialUpdateComponent },

  {path:"VerAsignacionRol", component:TransaccionAsignacionRolComponent },
  {path:"VerAsignacionOpcion", component:TransaccionAsignacionOpcionComponent },
  {path:"VerAsignacionLibro", component:TransaccionAsignacionLibroComponent},
  {path:"verPrestamoLibro", component:TransaccionPrestamoLibroComponent },
  {path:"verDevolucionLibro", component:TransaccionDevolucionLibroComponent },
  {path:"verReporteLibro", component:TransaccionReporteLibroComponent},

  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
