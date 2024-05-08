// src/app/services/vaccine.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor() { }

  getVaccines() {
    return [
      { name: 'Vacina A', manufacturer: 'Fabricante A', type: 'Tipo A', doses: 2, additionalInfo: 'Info A' },
      { name: 'Vacina B', manufacturer: 'Fabricante B', type: 'Tipo B', doses: 1, additionalInfo: 'Info B' }
      // Adicione mais dados conforme necessário
    ];
  }
}
