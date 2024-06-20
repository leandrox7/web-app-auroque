// src/app/list-vaccines/list-vaccines.component.ts
import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../../../services/pharmacy.service';
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
import { IPharmacyItem } from '../../../Interface/IPharmacyItem';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-list-vaccines',
  templateUrl: './list-vaccines.component.html',
  styleUrls: ['./list-vaccines.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatTooltipModule, MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[DatePipe],

})
export class ListVaccinesComponent implements OnInit {

  constructor(private router: Router, private pharmacyService: PharmacyService, private datePipe: DatePipe ) { }
  displayedColumns: string[] = ['id','name', 'manufacturer', 'type', 'doses', 'expirationDate','additionalInfo'];
  dataSource!: MatTableDataSource<IPharmacyItem>;

  ngOnInit(): void {
    this.pharmacyService.getPharmacyItems().subscribe(items => {
      this.dataSource = new MatTableDataSource(items);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editVaccine(vaccineId: number): void {
    this.router.navigate(['/home/vacina', vaccineId]); // Adjust route as needed
  }
  addVaccine(){
    this.router.navigate(['/home/vacina']); // Adjust route as needed
  }
  isExpired(expirationDate: Date): boolean {
    const today = new Date();
    const expDate = new Date(expirationDate);
    return expDate <= today;
  }
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  GetType(type: number): string{
    switch (type) {
      case 1:
        return 'Remédio';
      case 2:
        return 'Carrapaticida';
      case 3:
        return 'Antibiótico';
      case 4:
        return 'Vermífugo';
      case 5:
        return 'Suplemento';
      default:
        return 'ID não encontrado';
    }
  }
}
