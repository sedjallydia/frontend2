import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { Availability } from './models/availability.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    new User('user@example.com', 'password', 'user'),
    new User('professional@example.com', 'password', 'professional', [
      new Availability('Monday', '09:00', '17:00'),
      new Availability('Tuesday', '09:00', '17:00')
    ])
  ];
  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string): string {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      this.router.navigate(['/dashboard']);
      return 'Login successful!';
    }
    return 'Invalid credentials';
  }

  register(email: string, password: string, role: 'user' | 'professional'): string {
    const newUser = new User(email, password, role);
    this.users.push(newUser);
    this.currentUser = newUser;
    this.router.navigate(['/dashboard']);
    return 'Registration successful!';
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getAvailabilityForProfessional(): Availability[] {
    return this.currentUser && this.currentUser.role === 'professional'
      ? this.currentUser.availability
      : [];
  }

  updateAvailability(availability: Availability[]) {
    if (this.currentUser && this.currentUser.role === 'professional') {
      this.currentUser.availability = availability;
    }
  }
}
