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

interface Type {
  value: string;
  viewValue: string;
}

interface Unidade {
  value: string;
  viewValue: string;
}

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

  types: Type[] = [
    {value: 'medicamento', viewValue: 'Medicamento'},
    {value: 'pesticida', viewValue: 'Pesticida'},
    {value: 'vacina', viewValue: 'Vacina'},
    {value: 'quimico', viewValue: 'Quimico'},
  ];

  unidades: Unidade[] = [
    {value: 'medicamento', viewValue: 'Doses'},
    {value: 'pesticida', viewValue: 'Litros'},
    {value: 'vacina', viewValue: 'KG'},
    {value: 'quimico', viewValue: 'Unidade'},
  ];

 
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.vaccineForm = this.fb.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      type: ['', Validators.required],
      unity: ['', Validators.required],
      valor: ['', Validators.required],
      data: ['', Validators.required],
      additionalInfo: [''],
      doses: [1, Validators.min(1)]
    });
  }

  onSubmit() {
    if (this.vaccineForm.valid) {
      console.log('Form Data:', this.vaccineForm.value);
      // Implementar envio dos dados ou outras ações necessárias
    }
  }
}
