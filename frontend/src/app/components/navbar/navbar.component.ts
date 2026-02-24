import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
    template: `
    <mat-toolbar class="navbar">
      <span class="brand">
        <mat-icon>content_cut</mat-icon>
        BarberShop Pro
      </span>
      <span class="spacer"></span>
      <a mat-button routerLink="/home" routerLinkActive="active">Inicio</a>
      <a mat-button routerLink="/booking" routerLinkActive="active">Reservar Turno</a>
      <ng-container *ngIf="authService.isLoggedIn(); else loginBtn">
        <button mat-button [matMenuTriggerFor]="adminMenu">
          <mat-icon>admin_panel_settings</mat-icon> Admin
        </button>
        <mat-menu #adminMenu="matMenu">
          <a mat-menu-item routerLink="/admin/appointments"><mat-icon>event</mat-icon> Turnos</a>
          <a mat-menu-item routerLink="/admin/barbers"><mat-icon>person</mat-icon> Barberos</a>
          <a mat-menu-item routerLink="/admin/services"><mat-icon>spa</mat-icon> Servicios</a>
          <button mat-menu-item (click)="logout()"><mat-icon>logout</mat-icon> Cerrar Sesión</button>
        </mat-menu>
      </ng-container>
      <ng-template #loginBtn>
        <a mat-raised-button color="accent" routerLink="/login">Iniciar Sesión</a>
      </ng-template>
    </mat-toolbar>
  `,
    styles: [`
    .navbar { position: fixed; top: 0; z-index: 100; background: #1a1a2e !important; color: white; }
    .brand { display: flex; align-items: center; gap: 8px; font-size: 1.2rem; font-weight: 700; color: #f0a500; }
    .spacer { flex: 1; }
    a { color: white !important; }
    .active { border-bottom: 2px solid #f0a500; }
  `]
})
export class NavbarComponent {
    constructor(public authService: AuthService) { }
    logout() { this.authService.logout(); }
}
