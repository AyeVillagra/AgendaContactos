import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { API } from '../constants/api';
import { LoginData, RegisterData } from '../interfaces/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserRole: string | null = null;
  constructor() {
    this.token.set(localStorage.getItem('token'));
    this.setUserRoleFromToken(localStorage.getItem('token'));
  }
  router = inject(Router);
  token: WritableSignal<string | null> = signal(null);

  async login(loginData: LoginData) {
    try {
      const res = await fetch(API + 'authentication/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) return false;
      const tokenRecibido = await res.text();
      console.log('LOGUEANDO', tokenRecibido);
      localStorage.setItem('token', tokenRecibido);
      this.token.set(tokenRecibido);

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenRecibido);
      const sub = decodedToken.sub;
      console.log('SUB', sub);
      localStorage.setItem('userId', sub);

      return true;
    } catch {
      return false;
    }
  }

  async register(registerData: RegisterData) {
    const res = await fetch(API + 'User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    console.log('REGISTRANDO', res);
    return res;
  }

  logOut() {
    this.token.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getCurrentUserRole(): string | null {
    return this.currentUserRole;
  }

  private setUserRoleFromToken(token: string | null) {
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.currentUserRole = decodedToken.role;
    }
  }
}
