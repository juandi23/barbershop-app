import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, MatButtonModule,
        MatIconModule, MatCardModule, MatSnackBarModule,
    ],
    template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-icon mat-card-avatar color="primary">content_cut</mat-icon>
          <mat-card-title>Acceso Administrador</mat-card-title>
          <mat-card-subtitle>BarberShop Pro</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="login()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" [type]="hide ? 'password' : 'text'">
              <button mat-icon-button matSuffix (click)="hide = !hide" type="button">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>
            <button mat-raised-button color="primary" class="full-width" type="submit" [disabled]="form.invalid || loading">
              <mat-icon>login</mat-icon> Iniciar Sesión
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; background: #f5f5f5; }
    .login-card { width: 400px; padding: 24px; border-radius: 16px; }
    .full-width { width: 100%; margin-bottom: 16px; }
  `]
})
export class LoginComponent {
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });
    hide = true;
    loading = false;

    constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router, private snack: MatSnackBar) { }

    login(): void {
        if (this.form.invalid) return;
        this.loading = true;
        const { email, password } = this.form.value;
        this.authSvc.login(email!, password!).subscribe({
            next: () => { this.loading = false; this.router.navigate(['/admin/appointments']); },
            error: (e) => { this.loading = false; this.snack.open(e.error?.message || 'Error de autenticación', 'Cerrar', { duration: 4000 }); }
        });
    }
}
