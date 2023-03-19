import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Charges, ChargesItem } from '../models/charges';
import { Expenses } from '../models/financial-table';

@Injectable({
  providedIn: 'root',
})
export class ApiChargesServices {
  public cacheCharges$: Observable<Charges[]>;
  public cacheInitialized = false;
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

  apiGetCharges(): Observable<Charges[]> {
    return this.http.get<Charges[]>(`${environment.API_BACKEND}charges`);
  }
}
