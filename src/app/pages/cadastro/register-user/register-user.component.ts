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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IUser } from '../../../Interface/IUser';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
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
})
export class RegisterUserComponent implements OnInit {
  userForm!: FormGroup;
  isEdition!: boolean;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', this.isEdition ? Validators.nullValidator : Validators.required],
      role: [''],
      contactInfo: [''],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.isEdition = !!params.get('id');
      console.log('Is edition:', this.isEdition);
      this.initializeForm();  // Now initializing the form after isEdition is set

      if (this.isEdition) {
        const userId = parseInt(params.get('id')!, 10);
        this.userService.getUser(userId).subscribe({
          next: (user: IUser) => this.updateForm(user),
          error: err => console.error('Error fetching user:', err)
        });
      }
    });



  }

  updateForm(user: IUser): void {
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.login,  // Assumindo que 'login' corresponde a 'username'
      password: '',  // Senhas normalmente não são recuperadas
      role: user.roleName,
      contactInfo: '',  // Supondo que isso precisa ser ajustado
      status: user.isActive ? 'Ativo' : 'Inativo'
    });
  }

  redirectToUserList() {
    this.router.navigate([`/home/users`]);
  }


  onSubmit(): void {
    if (this.userForm.valid) {

      if (this.isEdition) {
        this.userService.updateUser(this.userForm.value).subscribe({
          next: (res) => console.log('User registered successfully!', res),
          error: (err) => console.error('Error registering user:', err)
        });
      }

      else {
        this.userService.registerUser(this.userForm.value).subscribe({
          next: (res) => console.log('User registered successfully!', res),
          error: (err) => console.error('Error registering user:', err)
        });
      }
    }

    else
        console.log('Form is not valid');
      

  }
}
