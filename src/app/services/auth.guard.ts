import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface JwtPayload {
  exp: number;
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  getToken(): string | null {
      return localStorage.getItem('token');
    
   
     
  }
  isTokenExpired(token: string): boolean {
    try {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
      
      // Other functions
      const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);

      return isExpired;
    } 
    catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
}

// Criar uma função para autenticação
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && !authService.isTokenExpired(token)) {
    return true;
  } else {
    // Se não estiver logado ou o token tiver expirado, redirecione para a página de login
    router.navigate(['/login']);
    return false;
  }
};
