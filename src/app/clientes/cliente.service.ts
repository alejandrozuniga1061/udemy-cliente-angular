import { Injectable } from '@angular/core';
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<Cliente[]> {
    //return of(CLIENTES); para utilizar el archivo JSON
    //return this.http.get<Cliente[]>(this.urlEndPoint); Primera forma de consultar al api y castear
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe( // Segunda forma de castear y consultar api
      map((response: any) => {
        let clientes = response.content as Cliente[];
        response.content = clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.apellido = cliente.apellido.toUpperCase();
          //let datePipe = new DatePipe('es-CO');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //EEE dia abreviado, EEEE dia completo
          //MMM mes abreviado, MMMM mes completo
          // con formatDate cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response;
      }
      ));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeader }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id, urlError?: String): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        swal('Error al editar', e.error.mensaje, 'error')
          .finally(() => {
            if (urlError) {
              this.router.navigate([urlError]);
            }
          });
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeader }).pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
