import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { expeneses } from '../mocks/data-base-mock';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private cacheCLients$: Observable<Client[]>;
  constructor(private http: HttpClient) {}
  /*Método singleton para llamar una vez a los servicios necesarios*/

  // getClients(): Observable<any[]> {
  //   return of(clientSource);
  // }
  getExpenses(): Observable<any[]> {
    return of(expeneses);
  }

  get apiAllClients() {
    if (!this.cacheCLients$) {
      this.cacheCLients$ = this.apiGetClients().pipe(shareReplay(1));
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
}
