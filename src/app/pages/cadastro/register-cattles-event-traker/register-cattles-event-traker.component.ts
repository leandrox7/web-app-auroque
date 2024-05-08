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
import{IEvent}from '../../../Interface/IEvent'

@Component({
  selector: 'app-register-cattles-event-traker',
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
  templateUrl: './register-cattles-event-traker.component.html',
  styleUrl: './register-cattles-event-traker.component.scss'
})
export class RegisterCattlesEventTrakerComponent {
  trackerEventForm!: FormGroup;
  typeEvent!: FormControlName;
  eventDate!: FormControlName;
  description!: FormControlName;

  constructor(private fb: FormBuilder, private cattleService: CattleService) { }

  ngOnInit(): void {
    this.trackerEventForm = this.fb.group({
      typeEvent: ['', Validators.required],
      eventDate:['', Validators.required],
      description:['', Validators.required]

    });
  }

  onSubmit(): void {
  /*  if (this.cattleForm.valid) {
      this.cattleService.registerCattle(this.cattleForm.value as Cattle).subscribe({
        next: (res) => console.log('Cattle registered successfully!', res),
        error: (err) => console.error('Error registering cattle:', err)
      });
    } */
  }
}
