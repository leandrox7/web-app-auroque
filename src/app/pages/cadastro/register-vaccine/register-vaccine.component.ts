import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControlName, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UserService } from '../../../services/user.service'; // Ensure UserService is correctly implemented and imported
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IUser } from '../../../Interface/IUser';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PharmacyService } from '../../../services/pharmacy.service';
import { IGenericItem } from '../../../Interface/IGenericItem';
import { IPharmacyItem } from '../../../Interface/IPharmacyItem';

@Component({
  selector: 'app-register-vaccine',
  standalone: true,
  imports: [
    
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule, FormsModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  templateUrl: './register-vaccine.component.html',
  styleUrl: './register-vaccine.component.scss'
})

export class RegisterVaccineComponent {
  vaccineForm!: FormGroup;
  type!: FormControlName;
  unity!: FormControlName;
  isEdition!: boolean;
  private timer: any;

  types!: IGenericItem[];
  unitys!: IGenericItem[];

 
  
  constructor(private fb: FormBuilder,
    private pharmacyService: PharmacyService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) { }


  private initializeForm(): void {
    this.vaccineForm = this.fb.group({
   
   id: 0,
      name: ['', Validators.required],
      manufacturer: [''],
      pharmacyTypeId: ['', Validators.required],
      pharmacyUnitTypeId: ['', Validators.required],
      price: [''],
      additionalInfo: [''],
      quantity: [1, Validators.min(1)],
      batch: [''],
      expirationDate: [''],
      isActive: [''],
      createdAt: Date.now
   
    });
  }
  ngOnInit(): void {

    this.pharmacyService.getPharmacyTypes().subscribe({
      next: (_types: IGenericItem[]) => this.types = _types,
      error: (err: any) => console.error('Error fetching types:', err)
    });

    this.pharmacyService.getPharmacyUnityTypes().subscribe({
      next: (_unitys: IGenericItem[]) => this.unitys = _unitys,
      error: (err: any) => console.error('Error fetching unitys:', err)
    });


    this.route.paramMap.subscribe(params => {
      this.isEdition = !!params.get('id');
      console.log('Is edition:', this.isEdition);
      this.initializeForm();  // Now initializing the form after isEdition is set

      if (this.isEdition) {
        const ItemId = parseInt(params.get('id')!, 10);
        this.pharmacyService.getPharmacyItem(ItemId).subscribe({
          next: (item: IPharmacyItem) => this.updateForm(item),
          error: err => console.error('Error fetching user:', err)
        });
      }
    });



  }

  updateForm(item: IPharmacyItem): void {
    this.vaccineForm.patchValue({
      id: item.id,
      name: item.name,
      manufacturer:item.manufacturer,
      pharmacyTypeId: item.pharmacyTypeId,
      pharmacyUnitTypeId: item.pharmacyUnitTypeId,
      price: item.price,
      quantity: item.quantity,
      additionalInfo: item.additionalInfo,
      batch: item.batch,
      expirationDate: item.expirationDate,
      isActive: item.isActive ? 'Active' : 'Inactive',
      createdAt: item.createdAt,
      createdBy: item.createdBy
    });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 4000
    });
  }


  redirectAfterFiveSeconds() {
    this.timer = setTimeout(() => {
      this.router.navigate(['/home/vacinas']);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }


  onSubmit(): void {
    if (this.vaccineForm.valid) {

if(this.vaccineForm.value.isActive == "Active")
this.vaccineForm.value.isActive = true;

else
this.vaccineForm.value.isActive = false;

      if (this.isEdition) {
        this.pharmacyService.updatePharmacyItem(this.vaccineForm.value).subscribe({
          next: (res) => {console.log('Item registered successfully!', res)
          this.openSnackBar('Item atualizado!', '')
          this.redirectAfterFiveSeconds();

        },
          error: (err) => {console.error('Error registering item:', err)
          this.openSnackBar('Error:', err)
        }
        });
      }

      else {
        this.pharmacyService.registerPharmacyItem(this.vaccineForm.value).subscribe({
          next: (res) =>{ console.log('item registered successfully!', res)
          this.openSnackBar('item criado!', '')
          this.redirectAfterFiveSeconds();

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

  redirectToPharmacyList() {
    this.router.navigate([`/home/vacinas`]);
  }
}