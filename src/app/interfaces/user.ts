export interface RegisterData {
  lastName: string;
  email: string;
  password: string;
  userName: string;
  name: string;
}

export interface User {
  id: number;
  userName: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  rol: number;
  state: number;
}

export interface LoginData {
  userName: string;
  password: string;
}
