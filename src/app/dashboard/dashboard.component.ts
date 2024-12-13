import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, uppercase pipe
import { RouterModule } from '@angular/router'; // If you're using routerLink

@Component({
  selector: 'app-dashboard',
  standalone: true, // Standalone component
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule], // Import CommonModule and RouterModule
})
export class DashboardComponent {
  currentUser = { email: 'user@example.com', role: 'professional' }; // Example data
}
