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
import { NewNumber } from '../../interfaces/number';

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
    numbers: [],
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
    /* if (
      !this.contactoEdit.celularNumber ||
      this.contactoEdit.celularNumber === 0
    ) {
      alert('Por favor ingrese un número de celular válido.');
      return;
    } */
    this.contactoEdit.id ? this.editarContacto() : this.agregarContacto();
  }

  async agregarContacto() {
    const newNumbers: NewNumber[] = this.contactoEdit.numbers.map((num) => ({
      contactNumber: num.contactNumber,
      type: typeof num.type === 'string' ? parseInt(num.type) : num.type,
      contactId: this.contactoEdit.id,
    }));
    const contactoParaCrear = { ...this.contactoEdit, numbers: newNumbers };

    console.log('Datos a enviar al backend:', contactoParaCrear);

    const res = await this.contactsService.create(contactoParaCrear);
    this.cerrar.emit();
    if (res) {
      generarMensajeExito('Contacto agregado');
      this.contactoAgregado.emit(this.contactoEdit);
    } else {
      generarMensajeError('Error agregando contacto');
    }
  }

  async editarContacto() {
    const contactoParaEditar = { ...this.contactoEdit };

    console.log('Datos a enviar al backend (Editar):', contactoParaEditar);

    const res = await this.contactsService.edit(contactoParaEditar);
    // const res = await this.contactsService.edit(this.contactoEdit);
    this.cerrar.emit();
    if (res) {
      generarMensajeExito('Contacto editado');
      this.contactoEditado.emit(this.contactoEdit);
    } else {
      generarMensajeError('Error editando contacto');
    }
  }

  agregarNumero(): void {
    this.contactoEdit.numbers.push({
      contactNumber: '',
      type: 0,
      contactId: this.contactoEdit.id,
    });
  }

  eliminarNumero(index: number): void {
    this.contactoEdit.numbers.splice(index, 1);
  }
}
