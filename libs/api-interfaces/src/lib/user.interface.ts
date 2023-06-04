export interface User {
  email: string;
  password: string;
}

export interface UserCreation {
  email: string;
  password: string;
}

export interface UserFullName {
  firstName?: string;
  lastName?: string;
}
