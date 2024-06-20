import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PropertyService } from '../../../services/property.service'; // Certifique-se de que o PropertyService está corretamente implementado e importado
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty } from '../../../Interface/IProperty';
import { PiqueteComponent } from '../../../components/piquete/piquete.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    PiqueteComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, OnDestroy {
  propertyForm!: FormGroup;
  private timer: any;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      id: 1,
      name: ['', Validators.required],
      cnpj: [''],
      area: [''],
      tradeName: [''],
      location: [''],
      isActive: [true],
      createdAt: [''],
      updatedAt: [''],
      lastUpdatedBy: [''],
      createdBy: [''],
      piquetes: this.fb.array([]) // Certifique-se de que o FormArray está definido
    });

    this.propertyService.getProperty().subscribe({
      next: (property: IProperty[]) => this.updateForm(property[0]),
      error: err => console.error('Error fetching property:', err)
    });
  }

  updateForm(property: IProperty): void {
    this.propertyForm.patchValue({
      id: property.id,
      name: property.name,
      cnpj: property.cnpj,
      area: property.area,
      tradeName: property.tradeName,
      location: property.location,
      isActive: property.isActive,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      lastUpdatedBy: property.lastUpdatedBy,
      createdBy: property.createdBy
    });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      this.propertyService.updatePropert(this.propertyForm.value).subscribe({
        next: (res) => {
          console.log('Property updated successfully!', res);
          this.openSnackBar('Property atualizado!', '');
          this.redirectAfterFiveSeconds();
        },
        error: (err) => {
          console.error('Error updating property:', err);
          this.openSnackBar('Error:', err);
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000
    });
  }

  redirectAfterFiveSeconds() {
    this.timer = setTimeout(() => {
      this.router.navigate(['/home/property']);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  get piquetes(): FormArray {
    return this.propertyForm.get('piquetes') as FormArray;
  }
}
