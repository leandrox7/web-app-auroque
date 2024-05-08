import { Component } from '@angular/core';
import { LoginImageComponent } from '../../components/login-image/login-image.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [LoginImageComponent, MatFormFieldModule, MatInputModule , LoginFormComponent]
})
export class LoginComponent {

}
