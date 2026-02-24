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
            <mat-card-subtitle>{{s.duration}} min &middot; {{ s.price | currency:'ARS':'symbol':'1.0-0' }}</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: white; text-align: center; padding: 100px 24px 80px; }
    h1 { font-size: 3rem; margin-bottom: 16px; color: #f0a500; display: flex; align-items: center; justify-content: center; gap: 12px; }
    .title-icon { font-size: 2.5rem; width: 2.5rem; height: 2.5rem; }
    .subtitle { font-size: 1.3rem; margin-bottom: 32px; opacity: .85; }
    .cta-btn { font-size: 1.1rem; padding: 12px 32px; }
    .services-preview { padding: 60px 24px; text-align: center; background: #f9f9f9; }
    h2 { font-size: 2rem; margin-bottom: 32px; color: #1a1a2e; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 16px; max-width: 960px; margin: 0 auto; }
    .service-card { border-radius: 12px; }
  `]
})
export class HomeComponent {
  services = [
    { icon: 'content_cut', name: 'Corte de Cabello', duration: 30, price: 800 },
    { icon: 'face', name: 'Corte + Barba', duration: 45, price: 1200 },
    { icon: 'spa', name: 'Afeitado Clásico', duration: 30, price: 600 },
    { icon: 'style', name: 'Degradado', duration: 40, price: 1000 },
  ];
}
