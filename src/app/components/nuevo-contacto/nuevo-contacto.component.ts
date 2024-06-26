import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../interfaces/contacto';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import {
  generarMensajeError,
  generarMensajeExito,
} from '../../helpers/mensajes';

@Component({
  selector: 'app-nuevo-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.scss'],
})
export class NuevoContactoComponent {
  contactsService = inject(ContactsService);
  @Output() cerrar = new EventEmitter();
  @Output() contactoAgregado = new EventEmitter<Contacto>();
  @Output() contactoEditado = new EventEmitter<Contacto>();
  @Input() contacto: Contacto = {
    id: 0,
    name: '',
    telephoneNumber: 0,
    celularNumber: 0,
    description: '',
    userId: 0,
  };

  contactoEdit: Contacto = { ...this.contacto };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contacto']) {
      this.contactoEdit = { ...this.contacto };
    }
  }

  async onSubmit() {
    this.contactoEdit.id ? this.editarContacto() : this.agregarContacto();
  }

  async agregarContacto() {
    const res = await this.contactsService.create(this.contactoEdit);
    this.cerrar.emit();
    if (res) {
      generarMensajeExito('Contacto agregado');
      this.contactoAgregado.emit(this.contactoEdit);
    } else {
      generarMensajeError('Error agregando contacto');
    }
  }

  async editarContacto() {
    const res = await this.contactsService.edit(this.contactoEdit);
    this.cerrar.emit();
    if (res) {
      generarMensajeExito('Contacto editado');
      this.contactoEditado.emit(this.contactoEdit);
    } else {
      generarMensajeError('Error editando contacto');
    }
  }
}
