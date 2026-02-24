import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BarberService } from '../../services/barber.service';
import { Barber } from '../../models/models';

@Component({
    selector: 'app-barbers',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule,
        MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatDialogModule, MatCardModule, MatSnackBarModule,
    ],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1><mat-icon>person</mat-icon> Barberos</h1>
        <button mat-raised-button color="primary" (click)="showForm = !showForm">
          <mat-icon>add</mat-icon> Nuevo Barbero
        </button>
      </div>

      <mat-card *ngIf="showForm" class="form-card">
        <mat-card-title>{{editing ? 'Editar' : 'Nuevo'}} Barbero</mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="save()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>ID de Usuario</mat-label>
              <input matInput formControlName="user_id" type="number">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Biografía</mat-label>
              <textarea matInput formControlName="bio" rows="3"></textarea>
            </mat-form-field>
            <div class="form-actions">
              <button mat-button type="button" (click)="cancelForm()">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <table mat-table [dataSource]="barbers" class="mat-elevation-z4 full-width">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let b">{{b.User?.name || '—'}}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let b">{{b.User?.email || '—'}}</td>
        </ng-container>
        <ng-container matColumnDef="bio">
          <th mat-header-cell *matHeaderCellDef>Biografía</th>
          <td mat-cell *matCellDef="let b">{{b.bio || '—'}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let b">
            <button mat-icon-button color="primary" (click)="edit(b)"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button color="warn" (click)="delete(b)"><mat-icon>delete</mat-icon></button>
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
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; }
  `]
})
export class BarbersComponent implements OnInit {
    barbers: Barber[] = [];
    columns = ['name', 'email', 'bio', 'actions'];
    showForm = false;
    editing: Barber | null = null;
    form = this.fb.group({ user_id: [null, Validators.required], bio: [''] });

    constructor(private svc: BarberService, private fb: FormBuilder, private snack: MatSnackBar) { }
    ngOnInit(): void { this.load(); }
    load(): void { this.svc.getAll().subscribe(b => this.barbers = b); }

    save(): void {
        if (this.editing) {
            this.svc.update(this.editing.id!, this.form.value as Barber).subscribe({ next: () => { this.load(); this.cancelForm(); } });
        } else {
            this.svc.create(this.form.value as Barber).subscribe({ next: () => { this.load(); this.cancelForm(); } });
        }
    }

    edit(b: Barber): void { this.editing = b; this.form.patchValue(b); this.showForm = true; }
    delete(b: Barber): void {
        if (!confirm(`¿Eliminar a ${b.User?.name}?`)) return;
        this.svc.delete(b.id!).subscribe({ next: () => this.load() });
    }
    cancelForm(): void { this.showForm = false; this.editing = null; this.form.reset(); }
}
