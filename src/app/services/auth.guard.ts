
import { Observable } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

// Criar uma função para autenticação
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  console.log('Guard');
  console.log(token);

  if (token) {
    return true;
  } else {
    // Se não estiver logado, redirecione para a página de login
    router.navigate(['/login']);
    return false;
  }
};
