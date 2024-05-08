import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CattleService {
  private apiUrl = 'http://your-backend-api.com/cattles';

  constructor(){}
 // constructor(private http: HttpClient) { }

  /*registerCattle(cattleData: any): Observable<any> {
   return this.http.post(this.apiUrl, cattleData);
  }
  */
}
