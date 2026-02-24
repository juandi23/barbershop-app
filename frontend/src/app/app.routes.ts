import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'booking',
        loadComponent: () => import('./components/booking/booking.component').then(m => m.BookingComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'admin/appointments',
        loadComponent: () => import('./components/appointments/appointments.component').then(m => m.AppointmentsComponent),
        canActivate: [authGuard],
    },
    {
        path: 'admin/barbers',
        loadComponent: () => import('./components/barbers/barbers.component').then(m => m.BarbersComponent),
        canActivate: [authGuard],
    },
    {
        path: 'admin/services',
        loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent),
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: 'home' },
];
