import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability',
  standalone: true, // Standalone component
  imports: [FormsModule, CommonModule], // Import required modules
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
})
export class AvailabilityComponent {
  availability: { day: string; startTime: string; endTime: string }[] = [];
  newAvailability = { day: '', startTime: '', endTime: '' };
  message: string = '';

  onAddAvailability() {
    if (
      this.newAvailability.day &&
      this.newAvailability.startTime &&
      this.newAvailability.endTime
    ) {
      this.availability.push({ ...this.newAvailability });
      this.message = 'Availability added successfully!';
      this.newAvailability = { day: '', startTime: '', endTime: '' }; // Reset form
    } else {
      this.message = 'Please fill out all fields.';
    }
  }

  onDeleteAvailability(index: number) {
    this.availability.splice(index, 1);
    this.message = 'Availability deleted successfully!';
  }
}
