import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { expeneses } from '../mocks/data-base-mock';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  public cacheCLients$: Observable<Client[]>;
  public cacheInitialized = false;
  constructor(private http: HttpClient) {}
  /*Método singleton para llamar una vez a los servicios necesarios*/

  // getClients(): Observable<any[]> {
  //   return of(clientSource);
  // }
  getExpenses(): Observable<any[]> {
    return of(expeneses);
  }

  get apiAllClients() {
    if (!this.cacheInitialized) {
      this.cacheCLients$ = this.apiGetClients().pipe(shareReplay(1));
      this.cacheInitialized = true;
    }
    return this.cacheCLients$;
  }

  apiGetClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.API_BACKEND}clients`);
  }
  apiGetClientsByDate(date: String): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${environment.API_BACKEND}clientsByDate?date=${date}`
    );
  }
  apiSaveClient(client: Client): Observable<any> {
    return this.http.post<any>(`${environment.API_BACKEND}clients`, client, {
      observe:'response'
    });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${environment.API_BACKEND}clients/${id}`, {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   observe: 'response',
      // }),
    });
  }

  updateClient(
    client: Client,
    id: number
  ): Observable<{ client: any; status: number }> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .put<Client>(
        `${environment.API_BACKEND}clients/${id}`,
        client,
        httpOptions
      )
      .pipe(
        tap((_) => console.log(`updated client id=${id}`)),

        map((response) => ({ client: response, status: 200 })),
        catchError((error) => {
          console.error(error);
          console.log(`operation failed: ${error.message}`);
          return of({ client: null, status: error.status });
        })
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
