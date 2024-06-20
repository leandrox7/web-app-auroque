import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
    standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class LoginFormComponent {
  loginForm!: FormGroup;
  


  constructor(private authService: AuthService, private fb: FormBuilder,   private router: Router,) {

    this.loginForm = this.fb.group({
   
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

   }

  
   onSubmit(): void {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (response) => {
        console.log('Token:', response.token);
        // Decodificar o token para extrair a data de expiração
        
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.token);
        
        // Other functions
        const expirationDate = helper.getTokenExpirationDate(response.token);

        // Armazenar o token e a data de expiração no localStorage
        localStorage.setItem('token', response.token);
        if(expirationDate !=null)
        localStorage.setItem('tokenExpiration', expirationDate.toDateString());

        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}