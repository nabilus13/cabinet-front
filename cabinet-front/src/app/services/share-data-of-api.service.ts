import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ShareDataOfApiService {
  public clientData = new BehaviorSubject<Client[]>([]);
  constructor() {}

  public setClientData(clients: Client[]): void {
    this.clientData.next(clients);
  }
  public getClientData(): Observable<Client[]> {
    return this.clientData.asObservable();
  }
}
