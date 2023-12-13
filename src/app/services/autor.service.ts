import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Autor } from '../models/autor.model';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/autor';
const baseUrlAutorConsulta = AppSettings.API_ENDPOINT+ '/consultaAutor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http:HttpClient) { }

  consultaPorNombre(filtro:string):Observable<Autor[]>{
    return this.http.get<Autor[]>(baseUrlAutor+ "/listaAutorPorNombreLike/"+filtro);
  }

  registrar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor+"/registraAutor", data);
  }

  actualiza(obj:Autor):Observable<any>{
    return this.http.put(baseUrlAutor +"/actualizaAutor", obj);
  }

  elimina(idAutor:number):Observable<any>{
    return this.http.delete(baseUrlAutor+"/eliminaAutor/"+idAutor)
  }

  consulta(nombres:string,
    telefono:string,
    estado:number,
    idPais:number,
    ):Observable<Autor[]>{
     const params = new HttpParams()
     .set("nombres", nombres)
     .set("telefono", telefono)
     .set("estado", estado)
     .set("idPais", idPais)




return  this.http.get<Autor[]>(baseUrlAutorConsulta +"/consultaAutorPorParametros", {params}); 
} 

generateDocumentReport(nombres:string,
  telefono:string,
  estado:number,
  idPais:number): Observable<any> {
    const params = new HttpParams()
    .set("nombres", nombres)
    .set("telefono", telefono)
    .set("estado", estado.toString())
    .set("idPais", idPais.toString());

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob' };

    return this.http.post(baseUrlAutorConsulta +"/reporteAutorPdf?nombres="+nombres+"&telefono="+telefono+"&estado="+estado+"&idPais="+idPais,'', requestOptions)
    .pipe(map((response)=>{
        return {
            filename: 'reporteAutor.pdf',
            data: new Blob([response], {type: 'application/pdf'})
        };
    }));
}


}
