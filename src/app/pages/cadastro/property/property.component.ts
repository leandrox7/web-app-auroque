import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service'; // Ensure UserService is correctly implemented and imported
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    MatFormFieldModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent  implements OnInit {
  propertyForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      area: ['', [Validators.required]],
      tradeName: ['', [Validators.nullValidator]],
      cnpj: ['', [Validators.required]],

    });
  }

  onSubmit(): void {
   /* if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe({
        next: (res) => console.log('User registered successfully!', res),
        error: (err) => console.error('Error registering user:', err)
      });
    }*/
  }
}
