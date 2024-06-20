import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IPiquete } from '../../Interface/IPiquete';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-piquete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './piquete.component.html',
  styleUrls: ['./piquete.component.scss']
})
export class PiqueteComponent implements OnInit {
  piqueteForm!: FormGroup;
  piqueteList!: IPiquete[];

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.piqueteForm = this.fb.group({
      piquetes: this.fb.array([]),
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      propertyId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastUpdatedBy: ['admin'],
      createdBy: ['admin']
    });
    this.GetPiquetes();
  }

  get piquetes(): FormArray {
    return this.piqueteForm.get('piquetes') as FormArray;
  }

  GetPiquetes() {
    this.propertyService.getPiquetes().subscribe({
      next: (res) => {
        this.setPiquetes(res);
      },
      error: (err) => console.error('Error get piquete:', err)
    });
  }

  setPiquetes(piquetes: IPiquete[]): void {
    const piqueteFGs = piquetes.map(piquete => this.fb.group({
      id: [piquete.id],
      name: [piquete.name, Validators.required],
      description: [piquete.description, Validators.required],
      propertyId: [piquete.propertyId],
      isActive: [piquete.isActive],
      createdAt: [piquete.createdAt],
      updatedAt: [piquete.updatedAt],
      lastUpdatedBy: [piquete.lastUpdatedBy],
      createdBy: [piquete.createdBy]
    }));
    const piqueteFormArray = this.fb.array(piqueteFGs);
    this.piqueteForm.setControl('piquetes', piqueteFormArray);
  }

  onSubmit(): void {
    const formData = { ...this.piqueteForm.value };
    delete formData.piquetes; // Remove `piquetes` from the payload

    this.propertyService.addPiquete(formData).subscribe({
      next: (res) => {
        console.log('Piquete registered successfully!', res);
        this.piqueteForm.setControl('name', "");
        this.piqueteForm.setControl('description', "");
        this.clearForm();
        this.GetPiquetes();
      },
      error: (err) => console.error('Error registering piquete:', err)
    });
  }


  clearForm(): void {
    this.piqueteForm.patchValue({
      name: '',
      description: ''
    });
  }
  isExpired(expirationDate: string): boolean {
    const today = new Date();
    const expDate = new Date(expirationDate);
    return expDate <= today;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
