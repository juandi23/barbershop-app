import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule,
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon>spa</mat-icon> Servicios</h1>
        <button mat-raised-button color="primary" (click)="showForm = !showForm">
          <mat-icon>add</mat-icon> Nuevo Servicio
        </button>
      </div>

      <mat-card *ngIf="showForm" class="form-card">
        <mat-card-title>{{editing ? 'Editar' : 'Nuevo'}} Servicio</mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="save()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripcion</mat-label>
              <textarea matInput formControlName="description" rows="2"></textarea>
            </mat-form-field>
            <div class="two-col">
              <mat-form-field appearance="outline">
                <mat-label>Duracion (min)</mat-label>
                <input matInput formControlName="duration_min" type="number">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Precio ($)</mat-label>
                <input matInput formControlName="price" type="number">
              </mat-form-field>
            </div>
            <div class="form-actions">
              <button mat-button type="button" (click)="cancelForm()">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <table mat-table [dataSource]="services" class="mat-elevation-z4 full-width">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Servicio</th>
          <td mat-cell *matCellDef="let s">{{s.name}}</td>
        </ng-container>
        <ng-container matColumnDef="duration">
          <th mat-header-cell *matHeaderCellDef>Duracion</th>
          <td mat-cell *matCellDef="let s">{{s.duration_min}} min</td>
        </ng-container>
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Precio</th>
          <td mat-cell *matCellDef="let s">{{ s.price | currency:'ARS':'symbol':'1.0-0' }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let s">
            <button mat-icon-button color="primary" (click)="edit(s)"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button color="warn" (click)="delete(s)"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px 24px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    h1 { display: flex; align-items: center; gap: 8px; margin: 0; color: #1a1a2e; }
    .form-card { margin-bottom: 24px; padding: 16px; }
    .full-width { width: 100%; margin-bottom: 12px; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; }
  `]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  columns = ['name', 'duration', 'price', 'actions'];
  showForm = false;
  editing: Service | null = null;
  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    duration_min: [30, Validators.required],
    price: [null, Validators.required],
  });

  constructor(private svc: ServiceService, private fb: FormBuilder, private snack: MatSnackBar) { }
  ngOnInit(): void { this.load(); }
  load(): void { this.svc.getAll().subscribe(s => this.services = s); }

  save(): void {
    if (this.editing) {
      this.svc.update(this.editing.id!, this.form.value as unknown as Service).subscribe({ next: () => { this.load(); this.cancelForm(); } });
    } else {
      this.svc.create(this.form.value as unknown as Service).subscribe({ next: () => { this.load(); this.cancelForm(); } });
    }
  }

  edit(s: Service): void { this.editing = s; this.form.patchValue(s as any); this.showForm = true; }
  delete(s: Service): void {
    if (!confirm('Desea eliminar "' + s.name + '"?')) return;
    this.svc.delete(s.id!).subscribe({ next: () => this.load() });
  }
  cancelForm(): void { this.showForm = false; this.editing = null; this.form.reset({ duration_min: 30 }); }
}
