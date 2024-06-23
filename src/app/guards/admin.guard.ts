import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.token()) {
    router.navigate(['login']);
    return false;
  }

  const currentUserRole = auth.getCurrentUserRole();
  console.log('Rol del usuario:', currentUserRole);
  if (currentUserRole !== null && currentUserRole == 'Admin') {
    return true;
  } else {
    router.navigate(['/']); // Redirige al inicio si el usuario no es administrador
    return false;
  }
};
