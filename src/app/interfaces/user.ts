export interface RegisterData extends User {
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  userName: string;
  name: string;
}

export interface LoginData {
  userName: string;
  password: string;
}
