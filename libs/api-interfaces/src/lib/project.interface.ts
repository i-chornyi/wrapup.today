import { IsNotEmpty, IsString } from 'class-validator';

export interface Project {
  id: string;
  name: string;
}

export interface ProjectCreation {
  name: string;
}
