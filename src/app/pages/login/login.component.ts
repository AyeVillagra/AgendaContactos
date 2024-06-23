import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  errorLogin = signal(false);
  cargando = signal(false);
  passwordVisible = false;

  loginData: LoginData = {
    userName: '',
    password: '',
  };

  login() {
    this.errorLogin.set(false);
    this.cargando.set(true);
    this.authService.login(this.loginData).then((res) => {
      if (res) {
        const currentUserRole = this.authService.getCurrentUserRole();
        if (currentUserRole == 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/contacts']);
        }
      } else {
        this.errorLogin.set(true);
      }
      this.cargando.set(false);
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
