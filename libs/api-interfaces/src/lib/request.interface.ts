import { Request } from 'express';

export interface AppRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}
