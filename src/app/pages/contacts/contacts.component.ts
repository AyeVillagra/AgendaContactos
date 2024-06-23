import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Contacto } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  currentUser: User | undefined;
  contactsService = inject(ContactsService);
  contactos: Contacto[] = [];
  filteredContactos: any[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  selectedContact: Contacto | null = null;
  showProfileModal: boolean = false;

  openProfileModal() {
    this.showProfileModal = true;
  }

  closeProfileModal() {
    this.showProfileModal = false;
  }

  contactoSeleccionado: Contacto = {
    id: 0,
    name: '',
    telephoneNumber: 0,
    celularNumber: 0,
    description: '',
    userId: 0,
  };

  @ViewChild('dialogNuevoContacto')
  dialogNuevoContacto!: ElementRef<HTMLDialogElement>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadContactos();
    this.loadCurrentUser();
  }
  loadContactos() {
    this.contactsService.getAll().then((res) => {
      this.contactos = res;
      this.filteredContactos = this.contactos; // Asegura que los contactos se copian a filteredContactos después de cargar
    });
  }

  filterContacts(): void {
    this.filteredContactos = this.contactos.filter((contacto) =>
      contacto.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async loadCurrentUser() {
    try {
      this.currentUser = await this.userService.getCurrentUser();
      console.log('Datos del usuario actual:', this.currentUser);
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
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
    this.loadContactos();
  }

  handleContactoEliminado(id: number) {
    this.contactos = this.contactos.filter((contacto) => contacto.id !== id);
    this.loadContactos();
  }

  handleEditarContacto(contacto: Contacto) {
    console.log('Editar contacto recibido:', contacto);
    this.contactoSeleccionado = contacto;
    this.openDialogNuevoContacto();
  }

  openDialogNuevoContacto() {
    const dialog = this.dialogNuevoContacto.nativeElement;
    if (dialog) {
      dialog.showModal();
    }
  }

  handleNuevoContacto() {
    // Reinicializar el objeto contactoSeleccionado para que el formulario esté vacío luego de una edición
    this.contactoSeleccionado = {
      id: 0,
      name: '',
      telephoneNumber: 0,
      celularNumber: 0,
      description: '',
      userId: 0,
    };
    this.openDialogNuevoContacto();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  async guardarCambios() {
    if (this.currentUser) {
      try {
        await this.userService.updateUser(this.currentUser);
        console.log('Datos del usuario actualizados:', this.currentUser);
      } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
      }
    }
  }
}
