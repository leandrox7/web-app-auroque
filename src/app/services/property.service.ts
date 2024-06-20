import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IUser } from '../Interface/IUser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { IRole } from '../Interface/IRole';
import { IPiquete } from '../Interface/IPiquete';
import { IProperty } from '../Interface/IProperty';

@Injectable({
  providedIn: 'root'
  
})
export class PropertyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {} 

  public getProperty(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(`${this.apiUrl}/Properties`);
  }

  public getPiquetes(): Observable<IPiquete[]> {
    return this.http.get<IPiquete[]>(`${this.apiUrl}/Piquetes`);
  }

  public addPiquete(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Piquetes`, data);
  }

  public updatePropert(property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Properties/${property.id}`, property);
  }

}

