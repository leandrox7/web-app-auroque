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
@Component({
  selector: 'app-register-cattles-genealogy',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  templateUrl: './register-cattles-genealogy.component.html',
  styleUrl: './register-cattles-genealogy.component.scss'
})
export class RegisterCattlesGenealogyComponent {
  cattleGenealogyForm!: FormGroup;
  idFather!: FormControlName;
  nameFather!: FormControlName;
  idMother!: FormControlName;
  nameMother!: FormControlName;

  constructor(private fb: FormBuilder, private cattleService: CattleService) { }

  ngOnInit(): void {
    this.cattleGenealogyForm = this.fb.group({
      idFather: ['', Validators.required],
      nameFather:['', Validators.required],
      idMother:['', Validators.required],
      nameMother:['', Validators.required]


    });}

  onSubmit(): void {
    /*  if (this.cattleForm.valid) {
        this.cattleService.registerCattle(this.cattleForm.value as Cattle).subscribe({
          next: (res) => console.log('Cattle registered successfully!', res),
          error: (err) => console.error('Error registering cattle:', err)
        });
      } */
    }
}
