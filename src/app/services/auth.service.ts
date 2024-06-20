import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/Auth/login";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log('Auth Service');
    console.log('TOKEN')
    
    return this.http.post<{token: string}>(this.apiUrl, body, {
      
      headers: { 'Content-Type': 'application/json' }
      
    });

  
  }
}