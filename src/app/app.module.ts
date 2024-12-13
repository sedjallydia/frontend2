import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvailabilityComponent } from './availability/availability.component'; // Standalone component
import { AppointmentComponent } from './appointment/appointment.component';

// Define the routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'availability', component: AvailabilityComponent },
  { path: 'appointment', component: AppointmentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    // No need to declare AvailabilityComponent as it's standalone
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AvailabilityComponent,  // Import the standalone AvailabilityComponent here
    AppointmentComponent  // Add if necessary
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
