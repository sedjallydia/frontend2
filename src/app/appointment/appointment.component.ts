import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Slot {
  date: Date;
  professional: {
    id: number;
    name: string;
  };
  status: string;
}

interface Appointment {
  date: Date;
  professional: {
    id: number;
    name: string;
  };
  status: string;
}

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  professionals = [
    { id: 1, name: 'Dr. Jean' },
    { id: 2, name: 'Dr. Marie' },
    { id: 3, name: 'Dr. Ahmed' },
  ];

  availableSlots: Slot[] = [
    { date: new Date('2024-12-15T09:00:00'), professional: this.professionals[0], status: 'disponible' },
    { date: new Date('2024-12-15T10:00:00'), professional: this.professionals[1], status: 'disponible' },
    { date: new Date('2024-12-16T11:00:00'), professional: this.professionals[2], status: 'disponible' },
  ];

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  filteredSlots: Slot[] = [];
  selectedProfessional: any = null;
  filterDate: string = '';

  isProfessionalLoggedIn: boolean = true; // Simule la connexion d'un professionnel

  ngOnInit(): void {
    this.filterAvailableSlots();
    this.filterAppointments();
  }

  filterAvailableSlots(): void {
    this.filteredSlots = this.availableSlots.filter(slot => {
      let matchesProfessional = true;
      let matchesDate = true;

      if (this.selectedProfessional) {
        matchesProfessional = slot.professional.id === this.selectedProfessional.id;
      }

      if (this.filterDate) {
        const slotDate = slot.date.toISOString().split('T')[0];
        matchesDate = slotDate === this.filterDate;
      }

      return matchesProfessional && matchesDate;
    });
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      let matchesProfessional = true;
      let matchesDate = true;

      if (this.selectedProfessional) {
        matchesProfessional = appointment.professional.id === this.selectedProfessional.id;
      }

      if (this.filterDate) {
        const appointmentDate = appointment.date.toISOString().split('T')[0];
        matchesDate = appointmentDate === this.filterDate;
      }

      return matchesProfessional && matchesDate;
    });
  }

  reserveAppointment(slot: Slot): void {
    if (slot.status === 'disponible') {
      slot.status = 'réservé';
      this.appointments.push({
        date: slot.date,
        professional: slot.professional,
        status: 'en attente'
      });
      this.filterAppointments();
      alert(`Rendez-vous réservé avec ${slot.professional.name} pour le ${slot.date}`);
    } else {
      alert('Ce créneau n\'est plus disponible');
    }
  }

  cancelAppointmentByClient(appointment: Appointment): void {
    this.appointments = this.appointments.filter(a => a !== appointment);
    this.availableSlots.find(slot => slot.date === appointment.date && slot.professional.id === appointment.professional.id)!.status = 'disponible';
    this.filterAppointments();
    alert('Rendez-vous annulé par le client');
  }

  confirmAppointment(appointment: Appointment): void {
    appointment.status = 'confirmé';
    this.filterAppointments();
    alert('Rendez-vous confirmé');
  }

  cancelAppointmentByProfessional(appointment: Appointment): void {
    this.cancelAppointmentByClient(appointment);
    alert('Rendez-vous annulé par le professionnel');
  }
}

