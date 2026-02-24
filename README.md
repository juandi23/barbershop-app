# BarberShop Pro — Gestión de Turnos

[![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)](https://angular.io)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=nodedotjs)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://mysql.com)

Sistema de gestión de turnos para barbería con panel administrativo completo.

## 🚀 Funcionalidades

- 📅 **Reserva de turnos** — Los clientes pueden reservar sin necesidad de registrarse
- 🔐 **Panel Admin** — Gestión de turnos, barberos y servicios con autenticación JWT
- ✂️ **Gestión de Barberos** — Alta, baja y modificación
- 💈 **Catálogo de Servicios** — Con precios y duraciones
- 🚫 **Detección de conflictos** — Evita doble reserva en el mismo horario
- 📊 **Estados de turnos** — Pendiente / Confirmado / Completado / Cancelado

## 🛠️ Tech Stack

| Layer | Tecnología |
|---|---|
| Frontend | Angular 17 + Angular Material |
| Backend | Node.js + Express.js |
| Base de Datos | MySQL 8 |
| ORM | Sequelize |
| Autenticación | JWT (JSON Web Tokens) |

## 📁 Estructura del Proyecto

```
barbershop-app/
├── backend/          # API REST — Node.js + Express
├── frontend/         # SPA — Angular 17
├── database/
│   ├── schema.sql    # Crear tablas
│   └── seed.sql      # Datos de prueba
└── README.md
```

## ⚙️ Instalación

### Prerequisitos

- Node.js >= 18
- Angular CLI (`npm install -g @angular/cli`)
- MySQL 8.0 corriendo localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/barbershop-app.git
cd barbershop-app
```

### 2. Configurar la Base de Datos

```sql
-- En MySQL Workbench o consola:
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

### 3. Configurar el Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de MySQL
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### 4. Configurar el Frontend

```bash
cd frontend
npm install
ng serve
```

La app estará disponible en `http://localhost:4200`

## 🌐 Endpoints de la API

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/login` | Iniciar sesión | ❌ |
| POST | `/api/auth/register` | Registrar usuario | ❌ |
| GET | `/api/appointments` | Listar turnos | ✅ |
| POST | `/api/appointments` | Crear turno | ❌ |
| PUT | `/api/appointments/:id` | Actualizar turno | ✅ |
| DELETE | `/api/appointments/:id` | Eliminar turno | ✅ |
| GET | `/api/barbers` | Listar barberos | ❌ |
| POST | `/api/barbers` | Crear barbero | ✅ |
| GET | `/api/services` | Listar servicios | ❌ |
| POST | `/api/services` | Crear servicio | ✅ |
| GET | `/api/clients` | Listar clientes | ✅ |

## 🔑 Variables de Entorno

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=barbershop_db
JWT_SECRET=clave_secreta_jwt
JWT_EXPIRES_IN=24h
```

## 👤 Usuarios por defecto (seed)

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `admin@barbershop.com` | `password` | Admin |
| `carlos@barbershop.com` | `password` | Barbero |
| `miguel@barbershop.com` | `password` | Barbero |

## 📄 Licencia

MIT © 2026
