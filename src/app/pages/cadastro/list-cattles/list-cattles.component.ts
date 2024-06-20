import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ICattle } from '../../../Interface/ICattle';
import { CattleDataService } from '../../../services/cattle-data.service';
import { IPiquete } from '../../../Interface/IPiquete';
import { IGenericItem } from '../../../Interface/IGenericItem';
import { PropertyService } from '../../../services/property.service';
let ELEMENT_DATA: ICattle[] = [];

@Component({
  selector: 'app-list-cattles',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './list-cattles.component.html',
  styleUrl: './list-cattles.component.scss'
})
export class ListCattlesComponent {
  constructor(private router: Router,  private cattleDataService: CattleDataService,  private propertyService: PropertyService ) {}

  displayedColumns: string[] = ['id', 'visualId','birthDate', 'gender', 'animalTypeId','animalSubtypeId', 'piqueteId' ];
  dataSource!: MatTableDataSource<ICattle>;
  animalTypes!: IGenericItem[];
  animalSubTypes!: IGenericItem[];
  origins!: IGenericItem[];
  destinations!: IGenericItem[];
  vaccinations!: IGenericItem[];
  piquetes!: IPiquete[];

  ngOnInit(): void {
  this.cattleDataService.getCattles().subscribe(_cattles => {
    this.dataSource = new MatTableDataSource(_cattles);
  });
  this.animalSubTypes = this.cattleDataService.getAnimalSubTypes();
  this.animalTypes = this.cattleDataService.getAnimalTypes();
  this.origins = this.cattleDataService.getCattleOrigin();
  this.destinations = this.cattleDataService.getCattleDestination();
  this.vaccinations = this.cattleDataService.getCattleVaccination();

  this.propertyService.getPiquetes().subscribe({
    next: (data: IPiquete[]) => this.piquetes = data,
    error: err => console.error('Error fetching piquetes:', err)
  });
}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToNewCattle() {
    this.router.navigate(['/home/cattle']);
  }

  redirectToCattle(id: string) {
    this.router.navigate([`/home/cattle/${id}`]);
  }

  GetBirthDate(date: Date): string {
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - new Date(date).getTime();
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44)); // Aproximadamente 30.44 dias por mês
  
    if (diffInMonths < 12) {
      return `${diffInMonths} meses`;
    } else {
      const diffInYears = Math.floor(diffInMonths / 12);
      return `${diffInYears} ano${diffInYears > 1 ? 's' : ''}`;
    }
  }
  GetGender(gender: string): string{
    if(gender == 'Male') return "Masculino"
    if(gender == 'Female') return "Feminino"
else return "Não informado"

  }

  GetAnimalType(type: number): string {
    const animalType = this.animalTypes.find(at => at.id === type);
    return animalType ? animalType.description : "Desconhecido";
  }

  GetAnimalSubType(subType: number): string {
    const animalSubType = this.animalSubTypes.find(ast => ast.id === subType);
    return animalSubType ? animalSubType.description : "Desconhecido";
  }

  GetPiquete(piqueteId: number): string {
    const piquete = this.piquetes.find(p => p.id === piqueteId);
    return piquete ? piquete.name : "Desconhecido";
  }
}