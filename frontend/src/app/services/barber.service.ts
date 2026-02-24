import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barber } from '../models/models';

@Injectable({ providedIn: 'root' })
export class BarberService {
    private apiUrl = 'http://localhost:3000/api/barbers';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Barber[]> { return this.http.get<Barber[]>(this.apiUrl); }
    getById(id: number): Observable<Barber> { return this.http.get<Barber>(`${this.apiUrl}/${id}`); }
    create(data: Barber): Observable<Barber> { return this.http.post<Barber>(this.apiUrl, data); }
    update(id: number, data: Partial<Barber>): Observable<Barber> {
        return this.http.put<Barber>(`${this.apiUrl}/${id}`, data);
    }
    delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/${id}`); }
}
