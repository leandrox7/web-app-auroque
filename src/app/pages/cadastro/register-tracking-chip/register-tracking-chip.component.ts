import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Ensure RouterModule and Routes are imported
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register-tracking-chip',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule ],
  templateUrl: './register-tracking-chip.component.html',
  styleUrl: './register-tracking-chip.component.scss'
})
export class RegisterTrackingChipComponent implements OnInit {
  chipForm: FormGroup = this.fb.group({
    chipNumber: ['', Validators.required],
    animalNumber: ['', Validators.required],
    installationDate: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialization logic if needed, but the form is already initialized above
  }

  onSubmit() {
    if (this.chipForm.valid) {
      console.log('Form Data:', this.chipForm.value);
      // Logic to handle form submission
    }
  }
}