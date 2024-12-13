import { Availability } from './availability.model';

export class User {
  constructor(
    public email: string,
    public password: string,
    public role: 'user' | 'professional',
    public availability: Availability[] = []
  ) {}
}
