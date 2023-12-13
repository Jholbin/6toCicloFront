import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Pais } from '../models/pais.model';
import { DataCatalogo } from '../models/dataCatalogo.model';
import { Rol } from '../models/rol.model';
import { Opcion } from '../models/opcion.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }


  listaRol():Observable<Rol[]>{
    return this.http.get<Rol[]>(baseUrlUtil+"/listaRol");
  }

  listaOpcion():Observable<Opcion[]>{
    return this.http.get<Opcion[]>(baseUrlUtil+"/listaOpcion");
  }

  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }


  listaCategoriaDeLibro():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaCategoriaDeLibro");
  }



  listaGradoAutor():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaGradoAutor");
  }

  listaTipoLibroRevista():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTipoLibroRevista");
  }


  listaSede():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaSede");
  }

}


