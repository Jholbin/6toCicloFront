import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Editorial} from '../models/editorial.model';
import {AppSettings} from '../app.settings';
import {Pais} from '../models/pais.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT + '/editorial';
const baseUrlConsulta = AppSettings.API_ENDPOINT + "/consultaEditorial";

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  constructor(
    private http: HttpClient,
  ) {
  }

  registrar(data: Editorial): Observable<any> {
    return this.http.post(baseUrlPrueba, data);
  }

  listar(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(baseUrlPrueba + '/listar');
  }

  obtener(id: number): Observable<Editorial> {
    return this.http.get<Editorial>(`${baseUrlPrueba}/obtener/${id}`);
  }

  editar(id: number, data: Editorial): Observable<any> {
    return this.http.put(`${baseUrlPrueba}/editarEditorial/${id}`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${baseUrlPrueba}/eliminar/${id}`);
  }

  //consulta
  consulta(
    razonSocial: string,
    direccion: string,
    ruc: string,
    estado: number,
    idPais: number
  ): Observable<Editorial[]> {
    const params = new HttpParams()
      .set('razonSocial', razonSocial)
      .set('direccion', direccion)
      .set('ruc', ruc)
      .set('estado', estado)
      .set('idPais', idPais);
    console.log(razonSocial);
    console.log(direccion);
    console.log(ruc);
    console.log(estado);
    console.log(idPais);
    return this.http.get<Editorial[]>(baseUrlConsulta + "/consultaEditorialPorParametros", {params});
  }

  generateDocumentReport(
    razonSocial: string,
    direccion: string,
    ruc: string,
    estado: number,
    idPais: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('razonSocial', razonSocial)
      .set('direccion', direccion)
      .set('ruc', ruc)
      .set("estado", estado.toString())
      .set("idPais", idPais.toString());

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = {headers: headers, responseType: 'blob'};

    return this.http.post(
      baseUrlConsulta + "/reporteEditorialPdf?razonSocial=" + razonSocial + "&direccion=" + direccion + "&ruc=" + ruc + "&estado="+estado+ "&idPais=" + idPais,
      '',
      requestOptions
    ).pipe(map((response) => {
          return {
            filename: 'reporteEditorial20232.pdf',
            data: new Blob([response], {type: 'application/pdf'})
          };
        }
      )
    );
  }

}
