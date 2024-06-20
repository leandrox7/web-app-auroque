import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterVaccineComponent } from './pages/cadastro/register-vaccine/register-vaccine.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { ListVaccinesComponent } from './pages/cadastro/list-vaccines/list-vaccines.component';
import { RegisterTrackingChipComponent } from './pages/cadastro/register-tracking-chip/register-tracking-chip.component';
import { RegisterCattlesComponent } from './pages/cadastro/register-cattles/register-cattles.component';
import { RegisterUserComponent } from './pages/cadastro/register-user/register-user.component';
import { ListCattlesComponent } from './pages/cadastro/list-cattles/list-cattles.component';
import { ListUsersComponent } from './pages/cadastro/list-users/list-users.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyComponent } from './pages/cadastro/property/property.component';
import { AuthGuard } from '../app/services/auth.guard'; // Importe o AuthGuard


export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent,  canActivate: [AuthGuard],  children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Adiciona redirecionamento padrão para 'dashboard'
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vacina', component: RegisterVaccineComponent }, // Certifique-se de que 'vacinas' está correto
      { path: 'vacina/:id', component: RegisterVaccineComponent }, // Certifique-se de que 'vacinas' está correto
      { path: 'vacinas', component: ListVaccinesComponent },
      { path: 'chip', component: RegisterTrackingChipComponent } ,
      { path: 'cattles', component: ListCattlesComponent },
      { path: 'cattle', component: RegisterCattlesComponent },
      { path: 'cattle/:id', component: RegisterCattlesComponent }, // Detail view route for a specific cattle
      { path: 'user', component: RegisterUserComponent },
      { path: 'user/:id', component: RegisterUserComponent },
      { path: 'users', component: ListUsersComponent },
      { path: 'property', component: PropertyComponent }  
    ]
  },
  { path: 'teste', component: RegisterVaccineComponent},

    // outras rotas aqui, se necessário
];
