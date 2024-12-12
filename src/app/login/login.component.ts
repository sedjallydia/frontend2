import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-login',
  standalone: true, // Mark this as a standalone component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule], // Import CommonModule here for *ngIf
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  isSuccess: boolean = false; // Variable to track success or failure

  constructor() {}

  onLogin() {
    // Mock authentication logic (replace with real backend logic)
    if (this.email === 'user@example.com' && this.password === 'password') {
      this.isSuccess = true;
      this.message = 'Login Successful!';
    } else {
      this.isSuccess = false;
      this.message = 'Invalid credentials';
    }
  }
}
