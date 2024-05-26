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
export class ContactsComponent implements OnInit {
  contactsService = inject(ContactsService);
  contactos: Contacto[] = [];
  showModal: boolean = false;
  selectedContact: Contacto | null = null;

  contactoSeleccionado: Contacto = {
    id: 0,
    name: '',
    telephoneNumber: 0,
    celularNumber: 0,
    description: '',
    userId: 0,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.contactsService.getAll().then((res) => {
      this.contactos = res;
    });
  }
  openModal(contacto: Contacto) {
    this.selectedContact = contacto;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async cargarContactos() {
    this.contactos = await this.contactsService.getAll();
  }
  actualizarLista(contacto: Contacto) {
    this.cargarContactos();
  }

  handleContactoEliminado(id: number) {
    this.contactos = this.contactos.filter((contacto) => contacto.id !== id);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
