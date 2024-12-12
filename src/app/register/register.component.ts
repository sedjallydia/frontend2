import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, // If standalone, ensure correct imports
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = 'user'; // Default to 'user'
  message: string = '';

  onRegister() {
    // Simulate registration success
    this.message = `Registration successful for ${this.email} as a ${this.role}.`;
  }
}
