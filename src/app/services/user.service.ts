import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IUser } from '../Interface/IUser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Injectable({
  providedIn: 'root'
  
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {} 

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/Users`);
  }


  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/Users/${id}`);
  }

  public registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  public updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Users/${userData.id}`, userData);
  }
}
