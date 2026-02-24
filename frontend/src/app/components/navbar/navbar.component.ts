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
        <span class="brand-mark">
          <span class="stripe stripe-red"></span>
          <span class="stripe stripe-white"></span>
          <span class="stripe stripe-blue"></span>
        </span>
        <span class="brand-text">
          <span class="brand-title">BarberShop Pro</span>
          <span class="brand-subtitle">Agenda y turnos profesionales</span>
        </span>
      </span>
      <span class="spacer"></span>
      <a mat-button routerLink="/home" routerLinkActive="active">Inicio</a>
      <a mat-button routerLink="/booking" routerLinkActive="active">Reservar Turno</a>
      <ng-container *ngIf="authService.isLoggedIn(); else loginBtn">
        <button mat-button [matMenuTriggerFor]="adminMenu">
          <mat-icon>admin_panel_settings</mat-icon> Admin
        </button>
        <mat-menu #adminMenu="matMenu" panelClass="admin-menu-panel">
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
    .navbar {
      position: fixed;
      top: 0;
      z-index: 100;
      background: linear-gradient(90deg, #111827, #1f2937) !important;
      color: #f9fafb;
      box-shadow: 0 10px 30px rgba(0,0,0,.45);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-mark {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 4px 6px;
      border-radius: 999px;
      background: rgba(15,23,42,0.9);
      box-shadow: 0 4px 10px rgba(0,0,0,.6);
    }
    .stripe {
      width: 18px;
      height: 3px;
      border-radius: 999px;
    }
    .stripe-red { background: #f97373; }
    .stripe-white { background: #f9fafb; }
    .stripe-blue { background: #3b82f6; }
    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .brand-title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .brand-subtitle {
      font-size: 0.75rem;
      opacity: .8;
    }
    .spacer { flex: 1; }
    a { color: #e5e7eb !important; font-weight: 500; }
    a.active { border-bottom: 2px solid #f97316; border-radius: 0; }
  `]
})
export class NavbarComponent {
    constructor(public authService: AuthService) { }
    logout() { this.authService.logout(); }
}
