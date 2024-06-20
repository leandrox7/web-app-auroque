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
import {MatSnackBar} from '@angular/material/snack-bar';
import { IRole } from '../../../Interface/IRole';
import { IUserRole } from '../../../Interface/IUserRole';

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
  private timer: any;
  roles: IRole[] = [];  // Guarda os perfis de acesso
  userRoles!: IUserRole[];

  
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', this.isEdition ? Validators.nullValidator : Validators.required],
      roleName: [''],
      contactInfo: [''],
      status: ['', Validators.required],
      phoneNumber: [''],
      userRoles: []
    });
  }

  ngOnInit(): void {

    this.userService.getRoles().subscribe({
      next: (_roles: IRole[]) => this.roles = _roles,
      error: (err: any) => console.error('Error fetching roles:', err)
    });


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
      login: user.login,  // Assumindo que 'login' corresponde a 'username'
      birthDate: user.birthDate,
      password: '',  // Senhas normalmente não são recuperadas
      roleName: user.roleName,
      contactInfo: user.observation,  // Supondo que isso precisa ser ajustado
      status: user.isActive ? 'Active' : 'Inactive',
      phoneNumber: user.phoneNumber,
      userRoles: user?.userRoles?.length > 0 ? user.userRoles[0].id : null

    });
  }

  redirectToUserList() {
    this.router.navigate([`/home/users`]);
  }


  onSubmit(): void {
    if (this.userForm.valid) {

console.log(this.roles);
     // const selectedRole = this.roles.filter(role => role.id == this.userForm.value.userRoles);

      const selectedRoleIds = this.userForm.value.userRoles as number[]; // Assuming multiple roles can be selected
      const selectedRoles = this.roles.filter(role => role.id == this.userForm.value.userRoles);
  
      // Prepare the user roles objects array for submission
    const userRolesToSend = selectedRoles.map(role => ({
      id: 0, // Assuming 'id' is set by the server if needed
      userId: this.userForm.value.id,
      roleId: role.id,
      
    }));

    this.userForm.value.userRoles = userRolesToSend;

      if (this.isEdition) {
        this.userService.updateUser(this.userForm.value).subscribe({
          next: (res) => {console.log('User registered successfully!', res)
          this.openSnackBar('Usuário atualizado!', '')
          this.redirectAfterFiveSeconds();

        },
          error: (err) => {console.error('Error registering user:', err)
          this.openSnackBar('Error:', err)
        }
        });
      }

      else {
        this.userService.registerUser(this.userForm.value).subscribe({
          next: (res) =>{ console.log('User registered successfully!', res)
          this.openSnackBar('Usuário criado!', '')
          this.redirectAfterFiveSeconds();

        },
          error: (err) => { console.error('Error registering user:', err)
          this.openSnackBar('Error:', err)
        }
        });
      }
    }

    else
        console.log('Form is not valid');
      

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 4000
    });
  }


  redirectAfterFiveSeconds() {
    this.timer = setTimeout(() => {
      this.router.navigate(['/home/users']);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
