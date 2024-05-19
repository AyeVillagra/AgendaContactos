import { Injectable, inject } from '@angular/core';
import { Contacto } from '../interfaces/contacto';
import { API } from '../constants/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends ApiService {
  async create(contacto: Contacto): Promise<boolean> {
    if (contacto.id) return false;
    const res = await fetch(API + 'Contact/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(contacto),
    });
    return res.ok;
  }

  async delete(id: number): Promise<boolean> {
    const res = await fetch(API + 'Contact/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return res.ok;
  }

  async edit(contacto: Contacto): Promise<boolean> {
    if (!contacto.id) return false;
    const res = await fetch(API + 'Contact/' + contacto.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(contacto),
    });
    return res.ok;
  }

  async getAll(): Promise<Contacto[]> {
    const res = await this.getAuth('Contact');
    const resJson = await res.json();
    return resJson;
  }

  async getById(id: number | string): Promise<Contacto | undefined> {
    const res = await fetch(API + 'Contact/' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return await res.json();
  }
}
