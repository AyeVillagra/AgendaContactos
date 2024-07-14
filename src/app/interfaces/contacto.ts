import { User } from './user';
import { Number } from './number';

export interface Contacto {
  id: number;
  name: string;
  numbers: Number[];
  description: string;
  userId: number;
  user?: User;
}
