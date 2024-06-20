import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IGenericItem } from '../Interface/IGenericItem';
import { IPharmacyItem } from '../Interface/IPharmacyItem';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {} 


  public getPharmacyItems(): Observable<IPharmacyItem[]> {
    return this.http.get<IPharmacyItem[]>(`${this.apiUrl}/PharmacyItems`);
  }

  public getPharmacyUnityTypes(): Observable<IGenericItem[]> {
    return this.http.get<IGenericItem[]>(`${this.apiUrl}/PharmacyUnitTypes`);
  }

  public getPharmacyTypes(): Observable<IGenericItem[]> {
    return this.http.get<IGenericItem[]>(`${this.apiUrl}/PharmacyTypes`);
  }
  public getPharmacyItem(id: number): Observable<IPharmacyItem> {
    return this.http.get<IPharmacyItem>(`${this.apiUrl}/PharmacyItems/${id}`);
  }

  public registerPharmacyItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/PharmacyItems`, data);
  }

  public updatePharmacyItem(data: any): Observable<any> {
    console.log(data);
    console.log('data')
    return this.http.put(`${this.apiUrl}/PharmacyItems/${data.id}`, data);
  }
}

