// src/app/list-vaccines/list-vaccines.component.ts
import { Component, OnInit } from '@angular/core';
import { VaccineService } from '../../../services/vaccine.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Ensure RouterModule and Routes are imported
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


export interface Vaccine {
  id:number
  name: string;
  manufacturer: string;
  type: string;
  doses: number;
  additionalInfo: string;
}

const ELEMENT_DATA: Vaccine[] = [
  {
    id:1,
    name: 'Brucelose RB51',
    manufacturer: 'Zoetis Inc.',
    type: 'Vivo Atenuado',
    doses: 1,
    additionalInfo: 'Previne brucelose, administrada em bezerras fêmeas entre 4 a 12 meses de idade.'
  },
  {
    id:2,
    name: 'IBR-PI3-BVD',
    manufacturer: 'Boehringer Ingelheim',
    type: 'Vírus Vivo Modificado',
    doses: 2,
    additionalInfo: 'Vacina respiratória contra os vírus IBR, PI3 e BVD tipos 1 e 2. Necessário reforço após a dose inicial.'
  },
  {
    id:3,
    name: 'Vacina Clostridial',
    manufacturer: 'Merck Saúde Animal',
    type: 'Remedio',
    doses: 2,
    additionalInfo: 'Protege contra doenças clostridiais como carbúnculo sintomático, edema maligno. Duas doses inicialmente, depois anualmente.'
  },
  {
    id:4,
    name: 'Leptospirose',
    manufacturer: 'Elanco Saúde Animal',
    type: 'Antibiotico',
    doses: 2,
    additionalInfo: 'Previne leptospirose; administrar duas doses no primeiro ano seguido de reforços anuais.'
  },
  {
    id:5,
    name: 'Vacina contra Podridão dos Cascos',
    manufacturer: 'Pfizer Saúde Animal',
    type: 'Vacina',
    doses: 2,
    additionalInfo: 'Para prevenção de podridão dos cascos em bovinos, curso inicial de duas doses, depois reforço anual.'
  }
];



@Component({
  selector: 'app-list-vaccines',
  templateUrl: './list-vaccines.component.html',
  styleUrls: ['./list-vaccines.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatTooltipModule, MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class ListVaccinesComponent implements OnInit {

  constructor(private router: Router, private vaccineService: VaccineService) { }
  displayedColumns: string[] = ['id','name', 'manufacturer', 'type', 'doses', 'additionalInfo'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
  }
  editVaccine(vaccineId: number): void {
    this.router.navigate(['/home/vacina', vaccineId]); // Adjust route as needed
  }
  addVaccine(){
    this.router.navigate(['/home/vacina']); // Adjust route as needed
  }
}
