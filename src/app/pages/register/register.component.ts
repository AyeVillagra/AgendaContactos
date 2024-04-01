import {
  Component,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  errorRegister: WritableSignal<boolean> = signal(false);
  cargando = signal(false);

  registerData: RegisterData = {
    userName: '',
    name: '',
    lastName: '',
    password: '',
    email: '',
  };

  async register() {
    this.errorRegister.set(false);
    this.cargando.set(true);
    try {
      const res = await this.authService.register(this.registerData);
      if (res.ok) {
        this.router.navigate(['/login']);
      } else {
        this.errorRegister.set(true);
      }
    } catch (err) {
      console.warn('Error registrando', err);
    }
    this.cargando.set(false);
  }
}
