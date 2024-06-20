import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  canActivate(): boolean {
    return false; // Assumindo que esta função verifica algum critério de permissão
  }
}
