export interface UserRegistration {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_repeat: string;
}

export interface UpdatePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface User extends UserData {
  id: number;
}
