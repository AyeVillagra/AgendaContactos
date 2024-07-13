import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Contacto } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts.service';
import {
  generarMensajeError,
  generarMensajeExito,
} from '../../helpers/mensajes';

@Component({
  selector: 'app-contacto-details',
  standalone: true,
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent {
  contactsService = inject(ContactsService);
  @Input() contacto: Contacto | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() contactoEliminado = new EventEmitter<number>();
  @Output() editar = new EventEmitter<Contacto>();

  ngOnInit(): void {
    console.log('Datos del contacto:', this.contacto);
  }
  async eliminarContacto() {
    if (
      this.contacto &&
      confirm('¿Estás seguro de que quieres eliminar este contacto?')
    ) {
      const eliminado = await this.contactsService.delete(this.contacto.id);
      if (eliminado) {
        this.contactoEliminado.emit(this.contacto.id);
        this.cerrar.emit();
        generarMensajeExito('Contacto eliminado');
      } else {
        generarMensajeError('Error al eliminar el contacto');
      }
    }
  }

  editarContacto() {
    if (this.contacto) {
      const contactoEdit = { ...this.contacto }; // Copiar los datos del contacto
      console.log('Editar contacto:', contactoEdit);
      this.editar.emit(contactoEdit);
    }
  }
}
