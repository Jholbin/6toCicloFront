import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Libro } from '../models/libro.model';
import { map } from 'rxjs/operators';
import { TokenService } from 'src/app/security/token.service';

const baseUrlLibro = AppSettings.API_ENDPOINT + '/libro';
const baseUrlConsulta = AppSettings.API_ENDPOINT + '/consultaLibro';

@Injectable({
  providedIn: 'root',
})

export class LibroService {
/* CORTEZ */
  constructor(
    private http:HttpClient,
    private tokenService: TokenService){
  }

  /* PC-02 */
  consultaPorNombre(filtro: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(
      baseUrlLibro + '/listaLibroPorTituloLike/' + filtro
    )
  }
/* CORTEZ */
  inserta(obj: Libro): Observable<any> {
    return this.http.post(baseUrlLibro + '/registraLibro', obj);
  }

  actualiza(obj: Libro): Observable<any> {
    return this.http.put(baseUrlLibro + '/actualizaLibro', obj);
  }
/* CORTEZ */
  elimina(idLibro: number): Observable<any> {
    return this.http.delete(baseUrlLibro + '/eliminaLibro/' + idLibro);
  }

  /* PC-01 */
  registrar(data: Libro): Observable<any> {
    return this.http.post(baseUrlLibro, data);
  }

  /* PC-03 */
  consulta(
    titulo: string,
    anio: string,
    serie: string,/* CORTEZ */
    idCategoriaLibro: number, 
    idDataCatalogo: number
  ): Observable<Libro[]> {

    const params = new HttpParams()
      .set("titulo", titulo)
      .set("anio", anio)/* CORTEZ */
      .set("serie", serie)
      .set("idCategoriaLibro", idCategoriaLibro.toString())
      .set("idDataCatalogo", idDataCatalogo.toString());/* CORTEZ */
    
    return this.http.get<Libro[]>(baseUrlLibro + "/consultaLibroPorParametros", { params });
  }

  generateDocumentReport(
    titulo:string, anio:string, serie:string, idCategoriaLibro:number, idDataCatalogo:number
    ): Observable<any> {
    const params = new HttpParams()
    .set("titulo", titulo)
    .set("anio", anio)/* CORTEZ */
    .set("serie", serie)
    .set("idCategoriaLibro", idCategoriaLibro.toString())
    .set("idDataCatalogo", idDataCatalogo.toString());
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob' };
    return this.http.post(
      baseUrlConsulta +"/reporteLibroPdf?titulo="+titulo+"&anio="+anio+"&serie="+serie+"&idCategoriaLibro="+idCategoriaLibro+"&idDataCatalogo="+idDataCatalogo,'', requestOptions).pipe(map((response)=>{
        return {/* CORTEZ */
            filename: 'reporteLibro.pdf',
            data: new Blob([response], {type: 'application/pdf'})
        };
    }));
  }

  consultaFiltro(filtro:string, page: number, size: number):Observable<Libro[]>{
    return  this.http.get<Libro[]>(baseUrlLibro +'/listaLibro/'+filtro+'?page='+ page+'&size=' + size); 
  }
  


  generateExcelReport(
    titulo: string,anio: string,serie: string,idCategoriaLibro: number, idDataCatalogo: number
  ): Observable<any> {  
    const params = new HttpParams()
      .set("titulo", titulo)
      .set("anio", anio)
      .set("serie", serie)/* CORTEZ */
      .set("idCategoriaLibro", idCategoriaLibro.toString())
      .set("idDataCatalogo", idDataCatalogo.toString());
  
    let headers = new HttpHeaders();
    headers = headers.set(/* CORTEZ */
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ); 
    const requestOptions: any = { headers: headers, responseType: 'blob' };
  
    console.log("------------*****------------------");
    console.log(params);
    console.log(baseUrlConsulta + '/reporteLibroExcel');
  
/*
  const params = new HttpParams()
      .set("titulo", titulo)
      .set("anio", anio)
      .set("serie", serie)
      .set("idCategoriaLibro", idCategoriaLibro.toString())
      .set("idDataCatalogo", idDataCatalogo.toString());
    
    return this.http.get<Libro[]>(baseUrlLibro + "/consultaLibroPorParametros", { params });
*/
/* CORTEZ */


    return this.http
      .post(baseUrlConsulta + '/reporteLibroExcel', params, requestOptions) // Adjunta los parámetros a la solicitud POST
      .pipe(
        map((response) => {
          return {/* CORTEZ */
            filename: 'ReporteLibro.xlsx',
            data: new Blob([response], {
              type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
          };
        })
      );
  }
  

}