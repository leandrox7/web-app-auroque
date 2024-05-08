import { Injectable } from '@angular/core';
import { IEvent } from '../Interface/IEvent';
import { ICattle } from '../Interface/ICattle';

@Injectable({
  providedIn: 'root'
})
export class CattleDataService {

  constructor() { 

    const cattleMock: ICattle = {
      id: 123,
      idVisualIdentification: "VIS123",
      idSisbovIdentification: "SIS123",
      gender: "Male",
      animalType: "Bull",
      animalSubtype: "BeefCattle",
      breed: "Angus",
      origin: "Buy",
      purpose: "Sale",
      birthDate: new Date("2015-04-15"),  // Use a data de nascimento real
      vaccinationStatus: "Complete",
      weight: 540
    };
    const cattleMock2: ICattle = {
      id: 876,
      idVisualIdentification: "VIS123",
      idSisbovIdentification: "SIS123",
      gender: "Male",
      animalType: "Bull",
      animalSubtype: "BeefCattle",
      breed: "Angus",
      origin: "Buy",
      purpose: "Sale",
      birthDate: new Date("2015-04-15"),  // Use a data de nascimento real
      vaccinationStatus: "Complete",
      weight: 540
    };

    const cattleMock3: ICattle = {
      id: 657,
      idVisualIdentification: "VIS123",
      idSisbovIdentification: "SI765673",
      gender: "male",
      animalType: "Bull",
      animalSubtype: "BeefCattle",
      breed: "Angus",
      origin: "Buy",
      purpose: "Sale",
      birthDate: new Date("2019-07-25"),  // Use a data de nascimento real
      vaccinationStatus: "Pendency",
      weight: 324
    };


    this.addCattle(cattleMock);
    this.addCattle(cattleMock2);
    this.addCattle(cattleMock3);


  }
  private events: IEvent[] = []; // Armazenamento para eventos
  private cattles: ICattle[] = []; // Armazenamento para gado

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
  getCattles(): ICattle[] {
    return this.cattles;
  }
  getCattle(id: number): ICattle | undefined {
    console.log(this.cattles.find(cattle => cattle.id === id))
    return this.cattles.find(cattle => cattle.id === id);
  }
}