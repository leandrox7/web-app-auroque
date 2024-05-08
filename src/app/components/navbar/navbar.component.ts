import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-navbar',
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RegisterVaccineComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {menuValue:boolean=false;
  @ViewChild('drawer') drawer!: MatSidenav;  // Uso do `!` para afirmar a inicialização definitiva

  toggleSidenav() {
    this.drawer.toggle();
  }
}