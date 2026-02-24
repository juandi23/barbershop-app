import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/models';

@Component({
    selector: 'app-appointments',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        MatTableModule, MatButtonModule, MatIconModule, MatChipsModule,
        MatSelectModule, MatFormFieldModule, MatSnackBarModule, MatCardModule,
    ],
    template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-group">
          <h1><mat-icon>event</mat-icon> Gestión de Turnos</h1>
          <p class="subtitle">Vista diaria de la agenda de la barbería</p>
        </div>
        <span class="badge">{{appointments.length}} turnos</span>
      </div>

      <mat-card class="appointments-card mat-elevation-z8">
        <table mat-table [dataSource]="appointments" class="full-width">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Fecha</th>
          <td mat-cell *matCellDef="let a">{{a.date | date:'dd/MM/yyyy'}}</td>
        </ng-container>
        <ng-container matColumnDef="time">
          <th mat-header-cell *matHeaderCellDef>Hora</th>
          <td mat-cell *matCellDef="let a">{{a.time_slot?.substring(0,5)}}</td>
        </ng-container>
        <ng-container matColumnDef="client">
          <th mat-header-cell *matHeaderCellDef>Cliente</th>
          <td mat-cell *matCellDef="let a">{{a.client?.name}}<br><small>{{a.client?.phone}}</small></td>
        </ng-container>
        <ng-container matColumnDef="barber">
          <th mat-header-cell *matHeaderCellDef>Barbero</th>
          <td mat-cell *matCellDef="let a">{{a.barber?.User?.name}}</td>
        </ng-container>
        <ng-container matColumnDef="service">
          <th mat-header-cell *matHeaderCellDef>Servicio</th>
          <td mat-cell *matCellDef="let a">{{a.service?.name}}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Estado</th>
          <td mat-cell *matCellDef="let a">
            <mat-select [(ngModel)]="a.status" (ngModelChange)="updateStatus(a)" class="status-select"
              [class]="'status-' + a.status">
              <mat-option value="pending">Pendiente</mat-option>
              <mat-option value="confirmed">Confirmado</mat-option>
              <mat-option value="completed">Completado</mat-option>
              <mat-option value="cancelled">Cancelado</mat-option>
            </mat-select>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let a">
            <button mat-icon-button color="warn" (click)="delete(a)"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
      </mat-card>
    </div>
  `,
    styles: [`
    .page-container {
      padding: 32px 24px 40px;
      min-height: calc(100vh - 64px);
    }
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
      color: #f9fafb;
    }
    .title-group h1 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-weight: 600;
    }
    .subtitle {
      margin: 4px 0 0;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    .badge {
      background: linear-gradient(135deg,#f0a500,#ff6b35);
      color: #111827;
      padding: 4px 14px;
      border-radius: 999px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    .appointments-card {
      background: #f9fafb;
      color: #111827;
      border-radius: 18px;
      padding: 8px 0;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(0,0,0,.25);
      border: 1px solid rgba(148,163,184,0.6);
    }
    table { background: transparent; }
    th.mat-header-cell {
      background: #111827;
      color: #f9fafb;
      font-weight: 600;
    }
    td.mat-cell, th.mat-header-cell {
      border-color: rgba(209,213,219,0.9);
    }
    tr.mat-row:nth-child(odd) td.mat-cell {
      background: #ffffff;
    }
    tr.mat-row:nth-child(even) td.mat-cell {
      background: #f3f4f6;
    }
    .full-width { width: 100%; }
    .status-select { font-size: 0.85rem; }
    .status-pending   { color: #ff9800; }
    .status-confirmed { color: #2196f3; }
    .status-completed { color: #4caf50; }
    .status-cancelled { color: #f44336; }
  `]
})
export class AppointmentsComponent implements OnInit {
    appointments: Appointment[] = [];
    columns = ['date', 'time', 'client', 'barber', 'service', 'status', 'actions'];

    constructor(private svc: AppointmentService, private snack: MatSnackBar) { }

    ngOnInit(): void { this.load(); }

    load(): void { this.svc.getAll().subscribe(a => this.appointments = a); }

    updateStatus(a: Appointment): void {
        this.svc.update(a.id!, { status: a.status }).subscribe({
            next: () => this.snack.open('Estado actualizado', '', { duration: 2000 }),
            error: () => this.snack.open('Error al actualizar', 'Cerrar', { duration: 3000 }),
        });
    }

    delete(a: Appointment): void {
        if (!confirm(`¿Eliminar el turno de ${a.client?.name}?`)) return;
        this.svc.delete(a.id!).subscribe({ next: () => this.load() });
    }
}
