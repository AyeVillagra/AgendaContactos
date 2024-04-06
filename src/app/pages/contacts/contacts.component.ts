import { Component, OnInit, inject } from '@angular/core';
import { Contacto } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contactsService = inject(ContactsService);
  contactos: Contacto[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.contactsService.getAll().then((res) => {
      this.contactos = res;
    });
  }

  // Método para cerrar sesión
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
