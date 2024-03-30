import { User } from './user';

export interface Contacto {
  id: number;
  name: string;
  celularNumber: number;
  telephoneNumber?: number;
  description: string;
  userId: number;
  user?: User;
}
