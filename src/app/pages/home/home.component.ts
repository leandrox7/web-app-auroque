import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {  ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RegisterVaccineComponent } from '../../pages/cadastro/register-vaccine/register-vaccine.component';
import { RouterModule, Routes } from '@angular/router'; // Ensure RouterModule and Routes are imported

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RegisterVaccineComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeComponent {

}
