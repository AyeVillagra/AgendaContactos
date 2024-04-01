import { Component, OnInit, inject } from '@angular/core';
import { Contacto } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contactsService = inject(ContactsService);
  contactos: Contacto[] = [];

  constructor() {}

  async verTodos() {
    try {
      // Llama a la función para obtener todos los contactos
      this.contactos = await this.contactsService.getAll();
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }
}
