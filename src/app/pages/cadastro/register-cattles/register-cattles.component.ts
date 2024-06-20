import { ActivatedRoute, Router } from '@angular/router';
import { CattleDataService } from '../../../services/cattle-data.service';
import { ICattle } from '../../../Interface/ICattle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CattleService } from './../../../services/cattle.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterCattlesGenealogyComponent } from '../register-cattles-genealogy/register-cattles-genealogy.component';
import { RegisterCattlesEventTrakerComponent } from '../register-cattles-event-traker/register-cattles-event-traker.component';
import { RegisterCattlesHistoryComponent } from '../register-cattles-history/register-cattles-history.component';
import { IGenericItem } from '../../../Interface/IGenericItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {CdkScrollable} from '@angular/cdk/scrolling';
import { IPiquete } from '../../../Interface/IPiquete';
import { PropertyService } from '../../../services/property.service';


@Component({
  selector: 'app-register-cattles',
  templateUrl: './register-cattles.component.html',
  styleUrls: ['./register-cattles.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    RegisterCattlesEventTrakerComponent,
    RegisterCattlesGenealogyComponent,
    RegisterCattlesHistoryComponent,
    MatTooltipModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterCattlesComponent implements OnInit {
  cattleForm!: FormGroup;
  breeds!: IGenericItem[];
  isEdition!: boolean;
  idPiquete!:number;
  private timer: any;
  animalTypes!: IGenericItem[];
  animalSubTypes!: IGenericItem[];
  origins!: IGenericItem[];
  destinations!: IGenericItem[];
  vaccinations!: IGenericItem[];
  piquetes!: IPiquete[];

  showCattleEvents!: boolean;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private cattleDataService: CattleDataService,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showCattleEvents = false;
    this.cattleDataService.getCattleBreeds().subscribe({
      next: (_breeds: IGenericItem[]) => this.breeds = _breeds,
      error: (err: any) => console.error('Error fetching breeds:', err)
    });

    this.animalSubTypes = this.cattleDataService.getAnimalSubTypes();
    this.animalTypes = this.cattleDataService.getAnimalTypes();
    this.origins = this.cattleDataService.getCattleOrigin();
    this.destinations = this.cattleDataService.getCattleDestination();
    this.vaccinations = this.cattleDataService.getCattleVaccination();


    this.route.paramMap.subscribe(params => {
      this.isEdition = !!params.get('id');
      console.log('Is edition:', this.isEdition);
      this.initializeForm();  // Now initializing the form after isEdition is set

      if (this.isEdition) {
        this.showCattleEvents = true;
        const cattleId = parseInt(params.get('id')!, 10);
        this.cattleDataService.getCattle(cattleId).subscribe({
          next: (cattle: ICattle) => this.updateForm(cattle),
          error: err => console.error('Error fetching cattle:', err)
        });
      }
    });

    this.propertyService.getPiquetes().subscribe({
      next: (data: IPiquete[]) => this.piquetes = data,
      error: err => console.error('Error fetching piquetes:', err)
    });
 
  

  }

 
  updateForm(cattle: ICattle): void {
    this.cattleForm.patchValue({
      id: cattle.id,
      weight: this.loadCattleData(cattle.id),
      sisbovId: cattle.sisbovId,
      visualId: cattle.visualId,
      piqueteId: cattle.piqueteId,  
      propertyId: cattle.propertyId,
      animalTypeId: cattle.animalTypeId,
      animalSubtypeId: cattle.animalSubtypeId,
      breedId: cattle.breedId,
      birthDate: cattle.birthDate,  // Transform to string if using Date objects and format is needed
      fatherId: cattle.fatherId,
      motherId: cattle.motherId,
      gender: cattle.gender,
      pregnant: cattle.pregnant,
      destinationId: cattle.destinationId,
      originId: cattle.originId,
      vaccinationStatusId: cattle.vaccinationStatusId,
      isActive: cattle.isActive,
      createdBy: cattle.createdBy,
      lastUpdatedBy: cattle.lastUpdatedBy,
      createdAt: cattle.createdAt,  // Transform to string if using Date objects and format is needed
      updatedAt: Date.now   // Transform to string if using Date objects and format is needed
    });
    this.loadCattleData(cattle.id);
    
  }
  initializeForm(): void {
    this.cattleForm = this.fb.group({
      id: 0,
      weight: 0,
      sisbovId: [''],
      visualId: [''],
      propertyId: [''],
      animalTypeId: [''],
      animalSubtypeId: [''],
      piqueteId: [''],
      breedId: [''],
      birthDate: [''],
      fatherId: [''],
      motherId: [''],
      gender: [''],
      pregnant: [''],
      destinationId: [''],
      originId: [''],
      vaccinationStatusId: [''],
      isActive: [''],
      createdBy: [''],
      lastUpdatedBy: [''],
      createdAt: [''],
      updatedAt: ['']
    });
  }

  
  loadCattleData(cattleId: number) {
    this.subscription = this.cattleDataService.getEventDescription(cattleId)
      .subscribe(description => {
        console.log(description)

      
     //et result= description?.sort((a, b) => b?.date?.getTime() - a?.date?.getTime());

     let result= description;
       if(result){
        this.cattleForm.get('weight')?.setValue(result[0]?.description)
        return result[0]?.description;

       }

        this.cattleForm.value.weight = "Nao foi possivel obter o historico"
        return "Nao foi possivel obter o historico";

      });
  }
  
  redirectToCattleList() {
    this.router.navigate([`/home/cattles`]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 4000
    });
  }


  redirectAfterFiveSeconds() {
  }


  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  onSubmit(): void {
    if (this.cattleForm.valid) {

      if (this.isEdition) {
        this.cattleDataService.updateCattle(this.cattleForm.value).subscribe({
          next: (res) => {console.log('Item registered successfully!', res)
          this.openSnackBar('Item atualizado!', '')
          this.showCattleEvents = true;

        },
          error: (err) => {console.error('Error registering item:', err)
          this.openSnackBar('Error:', err)
        }
        });
      }

      else {
        this.cattleDataService.registerCattle(this.cattleForm.value).subscribe({
          next: (res) =>{ console.log('item registered successfully!', res)
          this.openSnackBar('item criado!', '')
          this.showCattleEvents = true;

        },
          error: (err) => { console.error('Error registering user:', err)
          this.openSnackBar('Error:', err)
        }
        });
      }
    }

    else
        console.log('Form is not valid');
      

  }
}
