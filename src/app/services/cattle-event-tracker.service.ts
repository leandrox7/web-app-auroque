import { Injectable } from '@angular/core';
import { IEvent } from '../Interface/IEvent';
import { ICattle } from '../Interface/ICattle';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGenericItem } from '../Interface/IGenericItem';
import { ICattleEvent } from '../Interface/ICattleEvent';
import { IEventType } from '../Interface/IEventType';

@Injectable({
  providedIn: 'root'
})
export class CattleEventTrackerService {
  private apiUrl = environment.apiUrl;
  private events: IEvent[] = []; // Armazenamento para eventos
  private weight!: ICattleEvent[];

  constructor(private http: HttpClient) { }

  public getEventType(): Observable<IEventType[]> {
    return this.http.get<IEventType[]>(`${this.apiUrl}/CattleEventTypes`);
  }



  public getEvents(): Observable<ICattleEvent[]> {
    return this.http.get<ICattleEvent[]>(`${this.apiUrl}/CattleEvents`);
  }
  public getEventsbyCattle(id: number): Observable<ICattleEvent[]> {
    return this.http.get<ICattleEvent[]>(`${this.apiUrl}/CattleEvents/GetCattleEventByCattle/${id}`);
  }

  public registerEvent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CattleEvents`, data);
  }

  public updateEvent(data: any): Observable<any> {
    console.log(data);
    console.log('data')
    return this.http.put(`${this.apiUrl}/CattleEvents/${data.id}`, data);
  }
}
 