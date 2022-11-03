import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientSource, expeneses } from '../mocks/data-base-mock';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return of(clientSource);
  }
  getExpenses(): Observable<any[]> {
    return of(expeneses);
  }

  apiGetClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.API_BACKEND}clients`);
  }
}
