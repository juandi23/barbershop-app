export interface User {
    id?: number;
    name: string;
    email: string;
    role: 'admin' | 'barber';
}

export interface Client {
    id?: number;
    name: string;
    email?: string;
    phone: string;
}

export interface Barber {
    id?: number;
    user_id: number;
    bio?: string;
    photo_url?: string;
    User?: { name: string; email: string };
}

export interface Service {
    id?: number;
    name: string;
    description?: string;
    duration_min: number;
    price: number;
}

export interface Appointment {
    id?: number;
    client_id: number;
    barber_id: number;
    service_id: number;
    date: string;
    time_slot: string;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    client?: Client;
    barber?: Barber;
    service?: Service;
}

export interface AuthResponse {
    token: string;
    user: User;
}
