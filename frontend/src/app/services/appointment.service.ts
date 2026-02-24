import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private apiUrl = 'http://localhost:3000/api/appointments';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Appointment[]> { return this.http.get<Appointment[]>(this.apiUrl); }
    getById(id: number): Observable<Appointment> { return this.http.get<Appointment>(`${this.apiUrl}/${id}`); }
    create(data: Appointment): Observable<Appointment> { return this.http.post<Appointment>(this.apiUrl, data); }
    update(id: number, data: Partial<Appointment>): Observable<Appointment> {
        return this.http.put<Appointment>(`${this.apiUrl}/${id}`, data);
    }
    delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/${id}`); }
}
