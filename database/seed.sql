USE barbershop_db;

-- Admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role) VALUES
('Administrador', 'admin@barbershop.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Carlos Rodríguez', 'carlos@barbershop.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'barber'),
('Miguel Hernández', 'miguel@barbershop.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'barber');

-- Barbers
INSERT INTO barbers (user_id, bio) VALUES
(2, 'Barbero con 8 años de experiencia. Especialista en degradados y diseños.'),
(3, 'Experto en cortes clásicos y barba. 5 años de trayectoria.');

-- Services
INSERT INTO services (name, description, duration_min, price) VALUES
('Corte de cabello',  'Corte clásico con tijeras o máquina', 30, 800.00),
('Corte + Barba',     'Corte de cabello y arreglo de barba', 45, 1200.00),
('Afeitado clásico',  'Afeitado con navaja y toalla caliente', 30, 600.00),
('Degradado',         'Fade o degradado profesional', 40, 1000.00),
('Tratamiento capilar','Hidratación y nutrición capilar', 60, 1500.00);

-- Sample clients
INSERT INTO clients (name, email, phone) VALUES
('Juan Pérez',    'juan@email.com',  '555-1001'),
('Pedro García',  'pedro@email.com', '555-1002'),
('Luis Martínez', 'luis@email.com',  '555-1003');

-- Sample appointments
INSERT INTO appointments (client_id, barber_id, service_id, date, time_slot, status, notes) VALUES
(1, 1, 1, '2026-02-25', '10:00:00', 'confirmed', 'Cliente frecuente'),
(2, 1, 4, '2026-02-25', '11:00:00', 'pending',   NULL),
(3, 2, 2, '2026-02-25', '10:00:00', 'confirmed',  'Prefiere tijeras');
