import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: AuthService) {}

  async getCurrentUser(): Promise<User | undefined> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User Id not found in local storage');
      }
      const response = await fetch(`${API}user/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token(),
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
      return undefined;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API}user`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token(),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(userId: number): Promise<User | undefined> {
    try {
      const response = await fetch(`${API}user/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + this.auth.token(),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      const response = await fetch(`${API}user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.auth.token(),
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const response = await fetch(`${API}user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.auth.token(),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async archiveUser(userId: number): Promise<void> {
    try {
      const response = await fetch(`${API}user/archive/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.auth.token(),
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to archive user');
      }
    } catch (error) {
      console.error('Error archiving user:', error);
      throw error;
    }
  }
}
