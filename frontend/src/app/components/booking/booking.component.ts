import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { AppointmentService } from '../../services/appointment.service';
import { BarberService } from '../../services/barber.service';
import { ServiceService } from '../../services/service.service';
import { Barber, Service } from '../../models/models';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule,
    MatSnackBarModule, MatIconModule, MatStepperModule,
  ],
  template: `
    <div class="booking-container">
      <h1><mat-icon>calendar_today</mat-icon> Reservar Turno</h1>

      <mat-stepper [linear]="true" #stepper class="stepper">

        <!-- Step 1: Personal Info -->
        <mat-step [stepControl]="clientForm" label="Tus Datos">
          <form [formGroup]="clientForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre completo</mat-label>
              <input matInput formControlName="name" placeholder="Ej: Juan Perez">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Telefono</mat-label>
              <input matInput formControlName="phone" placeholder="555-1234">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email (opcional)</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>
            <div class="step-actions">
              <button mat-raised-button color="primary" matStepperNext [disabled]="clientForm.invalid">Siguiente</button>
            </div>
          </form>
        </mat-step>

        <!-- Step 2: Select Service & Barber -->
        <mat-step [stepControl]="appointmentForm" label="Servicio y Barbero">
          <form [formGroup]="appointmentForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Servicio</mat-label>
              <mat-select formControlName="service_id">
                <mat-option *ngFor="let s of services" [value]="s.id">
                  {{s.name}} - {{s.duration_min}}min - {{ s.price | currency:'COP':'symbol':'1.0-0' }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Barbero</mat-label>
              <mat-select formControlName="barber_id">
                <mat-option *ngFor="let b of barbers" [value]="b.id">
                  {{b.User?.name}}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Fecha</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="date" [min]="minDate">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Horario</mat-label>
              <mat-select formControlName="time_slot">
                <mat-option *ngFor="let t of timeSlots" [value]="t">{{t}}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Notas (opcional)</mat-label>
              <textarea matInput formControlName="notes" rows="3"></textarea>
            </mat-form-field>
            <div class="step-actions">
              <button mat-button matStepperPrevious>Atras</button>
              <button mat-raised-button color="primary" (click)="submit()" [disabled]="appointmentForm.invalid || loading">
                <mat-icon>check_circle</mat-icon> Confirmar Turno
              </button>
            </div>
          </form>
        </mat-step>

        <!-- Step 3: Confirmation -->
        <mat-step label="Listo!">
          <div class="success-msg">
            <mat-icon class="success-icon">check_circle</mat-icon>
            <h2>Turno reservado con exito!</h2>
            <p>Te esperamos. Hasta pronto!</p>
            <button mat-raised-button color="primary" (click)="stepper.reset(); resetForms()">Reservar otro</button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .booking-container { max-width: 680px; margin: 32px auto; padding: 24px; }
    h1 { display: flex; align-items: center; gap: 8px; color: #1a1a2e; margin-bottom: 24px; }
    .full-width { width: 100%; margin-bottom: 12px; }
    .step-actions { display: flex; gap: 12px; margin-top: 16px; justify-content: flex-end; }
    .success-msg { text-align: center; padding: 48px; }
    .success-icon { font-size: 80px; height: 80px; width: 80px; color: #4caf50; }
    h2 { color: #1a1a2e; }
    .stepper { box-shadow: 0 4px 20px rgba(0,0,0,.1); border-radius: 12px; }
  `]
})
export class BookingComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  clientForm!: FormGroup;
  appointmentForm!: FormGroup;
  barbers: Barber[] = [];
  services: Service[] = [];
  loading = false;
  minDate = new Date();
  timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  constructor(
    private fb: FormBuilder,
    private appointmentSvc: AppointmentService,
    private barberSvc: BarberService,
    private serviceSvc: ServiceService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
    });
    this.appointmentForm = this.fb.group({
      service_id: [null, Validators.required],
      barber_id: [null, Validators.required],
      date: [null, Validators.required],
      time_slot: ['', Validators.required],
      notes: [''],
    });
    this.barberSvc.getAll().subscribe(b => this.barbers = b);
    this.serviceSvc.getAll().subscribe(s => this.services = s);
  }

  submit(): void {
    if (this.clientForm.invalid || this.appointmentForm.invalid) return;
    this.loading = true;
    const clientData = this.clientForm.value;
    const apptData = this.appointmentForm.value;
    const dateStr = apptData.date instanceof Date
      ? apptData.date.toISOString().split('T')[0]
      : apptData.date;

    fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    })
      .then(r => r.json())
      .then(client => {
        this.appointmentSvc.create({
          ...apptData,
          client_id: client.id,
          date: dateStr,
          time_slot: apptData.time_slot + ':00',
        }).subscribe({
          next: () => {
            this.loading = false;
            this.stepper.next();
          },
          error: (e) => {
            this.loading = false;
            this.snack.open(e.error?.message || 'Error al reservar', 'Cerrar', { duration: 4000 });
          }
        });
      })
      .catch(() => {
        this.loading = false;
        this.snack.open('No se pudo conectar al servidor', 'Cerrar', { duration: 4000 });
      });
  }

  resetForms(): void {
    this.clientForm.reset();
    this.appointmentForm.reset();
  }
}
