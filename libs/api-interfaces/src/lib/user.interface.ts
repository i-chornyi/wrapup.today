import { AvatarSettings } from './avatar.interface';

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

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: AvatarSettings;
}
