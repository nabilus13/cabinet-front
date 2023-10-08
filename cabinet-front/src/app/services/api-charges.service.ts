import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Charges, Charges2, ChargesItem, TypeCharges } from '../models/charges';
import { Expenses } from '../models/financial-table';

@Injectable({
  providedIn: 'root',
})
export class ApiChargesServices {
  public cacheCharges$: Observable<Charges[]>;
  public cacheTypeCharges$: Observable<TypeCharges[]>;
  public cacheInitialized = false;
  public cacheTypeInitialized = false;
  // private charges = new BehaviorSubject<Expenses[]>([]);

  constructor(private http: HttpClient) {}

  setCharges(value: Expenses[]) {
    localStorage.setItem('tableCharges', JSON.stringify(value));
  }
  setListCharges(value: { [monthYear: string]: ChargesItem[] }) {
    localStorage.setItem('tableListCharges', JSON.stringify(value));
  }

  get apiAllCharges() {
    if (!this.cacheInitialized) {
      this.cacheCharges$ = this.apiGetCharges().pipe(shareReplay(1));
      this.cacheInitialized = true;
    }
    return this.cacheCharges$;
  }

  get apiTypeAllCharges() {
    if (!this.cacheTypeInitialized) {
      this.cacheTypeCharges$ = this.apiGetTypeCharges().pipe(shareReplay(1));
      this.cacheTypeInitialized = true;
    }
    return this.cacheTypeCharges$;
  }

  apiGetCharges(): Observable<Charges[]> {
    return this.http.get<Charges[]>(`${environment.API_BACKEND}charges`);
  }

  apiGetTypeCharges(): Observable<TypeCharges[]> {
    return this.http.get<Charges[]>(`${environment.API_BACKEND}type-charges`);
  }

  apisaveAllCharges(body:Charges2[]): Observable<any> {
     
    return this.http.post<Charges2[]>(`${environment.API_BACKEND}charges/saveAll`, body, {
      // el observe response es el q hace q mi respuesta sea un objeto con body status y hhttpheaders
      observe: 'response',
    });
  }
}
