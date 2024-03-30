export interface RegisterData extends User {
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
