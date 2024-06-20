import { Injectable } from '@angular/core';
import { IEvent } from '../Interface/IEvent';
import { ICattle } from '../Interface/ICattle';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGenericItem } from '../Interface/IGenericItem';
import { map } from 'rxjs/operators';
import { ICattleEvent } from '../Interface/ICattleEvent';


@Injectable({
  providedIn: 'root'
})
export class CattleDataService {

  private apiUrl = environment.apiUrl;
  private events: IEvent[] = []; // Armazenamento para eventos
  private cattles: ICattle[] = []; // Armazenamento para gado
  // Array de opções para os tipos de animais
  private animalTypes = [
    { id: 1, isEnabled: true, description: 'Bovino' },
    { id: 2, isEnabled: true, description: 'Ovino' },
    { id: 3, isEnabled: true, description: 'Equino' }

  ];

  private animalSubTypes = [
    { id: 1, isEnabled: true, description: 'Bezerro/Bezerra' },
    { id: 2, isEnabled: true, description: 'Novilho/Novilha' },
    { id: 3, isEnabled: true, description: 'Reprodutor/Reprodutora' },
    { id: 4, isEnabled: true, description: 'Primeira' },
    { id: 5, isEnabled: true, description: 'Segunda' },
    { id: 6, isEnabled: true, description: 'Outros' }

  ];

  private origins = [
    { id: 1, isEnabled: true, description: 'Compra' },
    { id: 2, isEnabled: true, description: 'Inceminação' },
    { id: 3, isEnabled: true, description: 'Outros' }
  ];

  private detinations = [
    { id: 1, isEnabled: true, description: 'Gado de Corte' },
    { id: 2, isEnabled: true, description: 'Gado Leiteiro' },
    { id: 3, isEnabled: true, description: 'Gado de Trabalho<' },
    { id: 4, isEnabled: true, description: 'Outro' }
  ];

  private vacination = [
    { id: 1, isEnabled: true, description: 'Completa' },
    { id: 2, isEnabled: true, description: 'Pendente' },
    { id: 3, isEnabled: true, description: 'Não Informado' },
    { id: 4, isEnabled: true, description: 'Outro' }
  ];


  constructor(private http: HttpClient) { }


  public getCattleBreeds(): Observable<IGenericItem[]> {
    return this.http.get<IGenericItem[]>(`${this.apiUrl}/CattleBreeds`);
  }
  // Método para adicionar um evento
  addEvent(event: IEvent): void {
    this.events.push(event);
  }

  // Método para buscar todos os eventos
  getEvents(): IEvent[] {
    return this.events;
  }

  // Método para adicionar um gado
  addCattle(cattle: ICattle): void {
    this.cattles.push(cattle);
  }

  // Método para buscar todos os gados


  public getCattles(): Observable<ICattle[]> {
    return this.http.get<ICattle[]>(`${this.apiUrl}/Cattle`);
  }

  public getCattle(id: number): Observable<ICattle> {
    return this.http.get<ICattle>(`${this.apiUrl}/Cattle/${id}`);
  }

  public registerCattle(data: any): Observable<any> {
    data.idProperty = 1;
    return this.http.post(`${this.apiUrl}/Cattle`, data);
  }

  public updateCattle(data: any): Observable<any> {
    console.log(data);
    console.log('data')
    return this.http.put(`${this.apiUrl}/Cattle/${data.id}`, data);
  }

  public getAnimalTypes() {
    return this.animalTypes;
  }

  public getAnimalSubTypes() {
    return this.animalSubTypes;
  }

  public getCattleOrigin() {
    return this.origins;
  }

  public getCattleDestination() {
    return this.detinations;
  }

  public getCattleVaccination() {
    return this.vacination;
  }

  public getEventDescription(id: number): Observable<ICattleEvent[] | undefined> {


    let events = this.http.get<ICattleEvent[]>(`${this.apiUrl}/CattleEvents/GetCattleEventByCattle/${id}`).pipe(
  
      map(events => events.filter(event => event.typeId === 3 && event.isActive))
   
    );
    return events
  }
}