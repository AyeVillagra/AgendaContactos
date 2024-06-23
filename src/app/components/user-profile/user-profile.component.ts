import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {
  generarMensajeError,
  generarMensajeExito,
} from '../../helpers/mensajes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input() user: User | undefined;
  @Output() saveChanges = new EventEmitter<void>();
  @Output() closeProfileModal = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  onSaveChanges() {
    if (this.user) {
      this.userService
        .updateUser(this.user)
        .then(() => {
          generarMensajeExito('Cambios guardados correctamente');
          this.saveChanges.emit();
        })
        .catch((error) => {
          generarMensajeError('Error al guardar cambios');
          console.error('Error al actualizar usuario:', error);
        });
    }
  }

  onCloseProfileModal() {
    this.closeProfileModal.emit();
  }
}
