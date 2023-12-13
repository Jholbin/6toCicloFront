import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AppSettings } from "../app.settings";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Revista } from "../models/revista.model";

const baseUrlRevista = AppSettings.API_ENDPOINT+ '/revista';

const   baseUrlRevistaConsulta = AppSettings.API_ENDPOINT+ '/consultaRevista';
@Injectable({
    providedIn: 'root'
  })
  export class RevistaService{

    constructor(private http:HttpClient) { }
    consultaPorNombre(filtro:string):Observable<Revista[]>{
      return this.http.get<Revista[]>(baseUrlRevista+ "/listaRevistaPorNombreLike/"+filtro);
    }
  
    registrar(data:Revista):Observable<any>{
      return this.http.post(baseUrlRevista+"/registraRevista", data);
    }
  
    actualiza(obj:Revista):Observable<any>{
      return this.http.put(baseUrlRevista +"/actualizaRevista", obj);
    }
  
    elimina(idRevista:number):Observable<any>{
      return this.http.delete(baseUrlRevista+"/eliminaRevista/"+idRevista)
    }

    consulta(nombre:string,
      frecuencia:string,
      estado:number,
      idPais:number,
      ):Observable<Revista[]>{
       const params = new HttpParams()
       .set("nombre", nombre)
       .set("frecuencia", frecuencia)
       .set("estado", estado)
       .set("idPais", idPais)
  
  
  
  
  return  this.http.get<Revista[]>(baseUrlRevistaConsulta +"/consultaRevistaPorParametros", {params}); 
  } 
  
  generateDocumentReport(nombre:string,
    frecuencia:string,
    estado:number,
    idPais:number): Observable<any> {
      const params = new HttpParams()
      .set("nombre", nombre)
      .set("frecuencia", frecuencia)
      .set("estado", estado.toString())
      .set("idPais", idPais.toString());
  
      let headers = new HttpHeaders();
      headers.append('Accept', 'application/pdf');
      let requestOptions: any = { headers: headers, responseType: 'blob' };
  
      return this.http.post(baseUrlRevistaConsulta +"/reporteRevistaPdf?nombre="+nombre+"&frecuencia="+frecuencia+"&estado="+estado+"&idPais="+idPais,'', requestOptions)
      .pipe(map((response)=>{
          return {
              filename: 'reporteRevista.pdf',
              data: new Blob([response], {type: 'application/pdf'})
          };
      }));
  }
  
  }