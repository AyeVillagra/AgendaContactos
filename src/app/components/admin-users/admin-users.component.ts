import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { generarMensajeExito } from '../../helpers/mensajes';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing = false;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.loading = true;
      this.users = await this.userService.getAllUsers();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      this.loading = false;
    }
  }

  startEditing(user: User) {
    this.selectedUser = { ...user }; // Crear una copia del usuario seleccionado
    this.isEditing = true;
  }

  async updateUser() {
    if (this.selectedUser) {
      try {
        await this.userService.updateUser(this.selectedUser);
        this.isEditing = false;
        this.selectedUser = null;
        await this.loadUsers();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.selectedUser = null;
  }

  async deleteUser(userId: number) {
    if (confirm('¿Estás seguro que deseas eliminar este usuario?')) {
      try {
        await this.userService.deleteUser(userId);
        generarMensajeExito('Usuario eliminado');
        // Actualizar los usuarios después de eliminar
        await this.loadUsers();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  }
}
