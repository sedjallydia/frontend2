import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [FormsModule, CommonModule], // Import required modules
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
})
export class AvailabilityComponent {
  availability: { day: string; startTime: string; endTime: string }[] = [];
  newAvailability = { day: '', startTime: '', endTime: '' };
  message: string = '';

  events: CalendarEvent[] = [];
  selectedEvent: CalendarEvent | null = null; // Track the selected event for modification

  onAddAvailability() {
    if (
      this.newAvailability.day &&
      this.newAvailability.startTime &&
      this.newAvailability.endTime
    ) {
      const start = new Date(`${this.newAvailability.day}T${this.newAvailability.startTime}`);
      const end = new Date(`${this.newAvailability.day}T${this.newAvailability.endTime}`);

      // Check for overlapping events
      if (this.events.some(event => this.isOverlapping(event, start, end))) {
        this.message = 'The selected time overlaps with an existing availability.';
        return;
      }

      const newEvent: CalendarEvent = {
        start,
        end,
        title: `Available: ${this.newAvailability.startTime} - ${this.newAvailability.endTime}`,
      };

      this.events.push(newEvent);
      this.message = 'Availability added successfully!';
      this.newAvailability = { day: '', startTime: '', endTime: '' }; // Reset form
    } else {
      this.message = 'Please fill out all fields.';
    }
  }

  onDeleteAvailability(index: number) {
    this.events.splice(index, 1);
    this.message = 'Availability deleted successfully!';
    this.selectedEvent = null; // Clear selected event after deletion
  }

  onModifyAvailability(event: CalendarEvent) {
    // Pre-fill the modification form with the current event values
    this.selectedEvent = event;
    this.newAvailability.day = event.start.toISOString().split('T')[0];
    this.newAvailability.startTime = event.start.toISOString().split('T')[1].substring(0, 5);
    this.newAvailability.endTime = event.end ? event.end.toISOString().split('T')[1].substring(0, 5) : '';
  }

  // Method to save the modified event
  onSaveModifiedAvailability() {
    if (this.selectedEvent && this.newAvailability.day && this.newAvailability.startTime && this.newAvailability.endTime) {
      const start = new Date(`${this.newAvailability.day}T${this.newAvailability.startTime}`);
      const end = new Date(`${this.newAvailability.day}T${this.newAvailability.endTime}`);

      // Check for overlapping events
      if (this.events.some(event => event !== this.selectedEvent && this.isOverlapping(event, start, end))) {
        this.message = 'The selected time overlaps with an existing availability.';
        return;
      }

      // Update the selected event
      this.selectedEvent.start = start;
      this.selectedEvent.end = end;
      this.selectedEvent.title = `Available: ${this.newAvailability.startTime} - ${this.newAvailability.endTime}`;

      this.message = 'Availability modified successfully!';
      this.selectedEvent = null; // Reset selected event after modification
      this.newAvailability = { day: '', startTime: '', endTime: '' }; // Reset form
    } else {
      this.message = 'Please fill out all fields correctly.';
    }
  }

  // Updated isOverlapping method to handle undefined end
  isOverlapping(event: CalendarEvent, start: Date, end: Date): boolean {
    if (!event.end) return false; // If event.end is undefined, no overlap possible
    return start < event.end && end > event.start;
  }

  dayClicked(day: CalendarMonthViewDay): void {
    // Handle day click for adding availability
    this.newAvailability.day = day.date.toISOString().split('T')[0]; // Format: yyyy-mm-dd
  }
}

