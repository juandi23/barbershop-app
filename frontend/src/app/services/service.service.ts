import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ServiceService {
    private apiUrl = 'http://localhost:3000/api/services';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Service[]> { return this.http.get<Service[]>(this.apiUrl); }
    getById(id: number): Observable<Service> { return this.http.get<Service>(`${this.apiUrl}/${id}`); }
    create(data: Service): Observable<Service> { return this.http.post<Service>(this.apiUrl, data); }
    update(id: number, data: Partial<Service>): Observable<Service> {
        return this.http.put<Service>(`${this.apiUrl}/${id}`, data);
    }
    delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/${id}`); }
}
