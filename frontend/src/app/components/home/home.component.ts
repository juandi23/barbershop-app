import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1><mat-icon class="title-icon">content_cut</mat-icon> BarberShop Pro</h1>
        <p class="subtitle">El mejor corte te está esperando. Reservá tu turno en segundos.</p>
        <a mat-raised-button color="warn" routerLink="/booking" class="cta-btn">
          <mat-icon>calendar_today</mat-icon> Reservar Turno
        </a>
      </div>
    </div>

    <section class="services-preview">
      <h2>Nuestros Servicios</h2>
      <div class="cards-grid">
        <mat-card *ngFor="let s of services" class="service-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>{{s.icon}}</mat-icon>
            <mat-card-title>{{s.name}}</mat-card-title>
            <mat-card-subtitle>{{s.duration}} min &middot; {{ s.price | currency:'COP':'symbol':'1.0-0' }}</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      padding: 110px 24px 90px;
      text-align: center;
      color: #f9fafb;
      background:
        radial-gradient(circle at top left, rgba(249,115,22,0.3) 0, transparent 45%),
        radial-gradient(circle at bottom right, rgba(148,163,184,0.4) 0, transparent 55%),
        linear-gradient(135deg, #020617 0%, #0b1120 45%, #111827 100%);
    }
    .hero::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.12;
      background-image: repeating-linear-gradient(
        -45deg,
        transparent 0,
        transparent 8px,
        rgba(249,115,22,0.25) 8px,
        rgba(249,115,22,0.25) 10px
      );
      mix-blend-mode: screen;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 720px;
      margin: 0 auto;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 16px;
      color: #fef3c7;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .title-icon { font-size: 2.6rem; width: 2.6rem; height: 2.6rem; color: #f97316; }
    .subtitle { font-size: 1.2rem; margin-bottom: 32px; opacity: .9; }
    .cta-btn { font-size: 1.05rem; padding: 12px 32px; border-radius: 999px; }
    .services-preview {
      padding: 56px 24px 72px;
      text-align: center;
      background: #020617;
      color: #e5e7eb;
    }
    h2 { font-size: 2rem; margin-bottom: 28px; color: #e5e7eb; }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      max-width: 980px;
      margin: 0 auto;
    }
    .service-card {
      border-radius: 16px;
      background: radial-gradient(circle at top left, rgba(249,115,22,0.22), transparent 55%),
                  #020617;
      color: #e5e7eb;
    }
  `]
})
export class HomeComponent {
  services = [
    { icon: 'content_cut', name: 'Corte de Cabello', duration: 30, price: 25000 },
    { icon: 'face', name: 'Corte + Barba', duration: 45, price: 35000 },
    { icon: 'spa', name: 'Afeitado Clásico', duration: 30, price: 20000 },
    { icon: 'style', name: 'Degradado', duration: 40, price: 28000 },
  ];
}
