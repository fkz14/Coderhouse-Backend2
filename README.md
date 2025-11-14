# 🚀 ShopCore-Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.1-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19-brightgreen)
![Passport](https://img.shields.io/badge/Passport-0.7-red)
![JWT](https://img.shields.io/badge/JWT-9.0-orange)

## 📋 Descripción

Backend profesional con arquitectura escalable implementando patrones de diseño modernos:
- **DAO Pattern** - Acceso a datos desacoplado
- **Repository Pattern** - Lógica de negocio centralizada
- **DTO Pattern** - Transferencia de datos segura
- **Middleware de Autorización** - Control de acceso basado en roles

---

## ✨ Características Principales

### 🔐 Autenticación & Seguridad
- ✅ Registro con validación de email único
- ✅ Login con JWT (JSON Web Tokens)
- ✅ Recuperación de contraseña sin SMTP (token de 1 hora)
- ✅ Bcrypt para hasheo de contraseñas
- ✅ Roles y permisos (admin/user)

### 👥 Gestión de Usuarios
- ✅ CRUD completo de usuarios
- ✅ DTOs que excluyen datos sensibles
- ✅ Validaciones en todas las operaciones

### 📦 Gestión de Productos
- ✅ CRUD de productos (solo admin)
- ✅ Validación de stock
- ✅ Listado público

### 🛒 Carritos y Compras
- ✅ Crear y gestionar carritos (user)
- ✅ Agregar/quitar productos
- ✅ Lógica de compra con validación de stock
- ✅ Generación automática de tickets
- ✅ Separación de productos comprados vs. sin stock

### 🎫 Sistema de Tickets
- ✅ Generación con código único
- ✅ Timestamp de compra
- ✅ Monto total y email del comprador
- ✅ Detalles de productos

---

## 📂 Estructura del Proyecto

```
coderHouse-backend2/
├── src/
│   ├── config/          # Configuración (Passport)
│   ├── controllers/     # Controladores de lógica
│   ├── dao/            # Data Access Objects
│   ├── dto/            # Data Transfer Objects
│   ├── middlewares/    # Middleware de autenticación
│   ├── models/         # Esquemas Mongoose
│   ├── repository/     # Lógica de negocio
│   ├── routes/         # Rutas de la API
│   ├── utils/          # Utilidades
│   └── server.js       # Servidor principal
├── .env               # Variables de entorno
├── package.json       # Dependencias
└── README.md         # Este archivo
```

---

## 🛠️ Instalación

### Requisitos Previos
- Node.js 18+
- MongoDB (local o Atlas)
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar o descargar el proyecto
cd coderHouse-backend2

# 2. Instalar dependencias
npm install

# 3. Configurar .env
cp .env.example .env
# Editar .env con valores reales

# 4. Iniciar servidor
npm run dev
```

### Variables de Entorno (.env)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/entrega1
JWT_SECRET=claveMuySegura
JWT_RESET_SECRET=resetClaveSegura
JWT_EXPIRES_IN=1d
RESET_TOKEN_EXPIRES=1h
```

---

## 🚀 Inicio Rápido

### 1. Registrar Usuario
```bash
curl -X POST http://localhost:3000/api/sessions/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@example.com",
    "age": 25,
    "password": "Pass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/sessions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Pass123"
  }'
# Obtener token
```

### 3. Usar API
```bash
curl -X GET http://localhost:3000/api/sessions/current \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 🔗 Endpoints Principales

### Autenticación
```
POST   /api/sessions/register              # Registrar usuario
POST   /api/sessions/login                 # Login
GET    /api/sessions/current               # Usuario actual
POST   /api/sessions/forgot-password       # Solicitar reset token
POST   /api/sessions/reset-password/:token # Cambiar contraseña
```

### Usuarios (Protegido)
```
GET    /api/users                          # Listar todos
GET    /api/users/:id                      # Obtener por ID
PUT    /api/users/:id                      # Actualizar
DELETE /api/users/:id                      # Eliminar
```

### Productos (Público para GET)
```
GET    /api/products                       # Listar (público)
GET    /api/products/:pid                  # Obtener (público)
POST   /api/products                       # Crear (admin)
PUT    /api/products/:pid                  # Actualizar (admin)
DELETE /api/products/:pid                  # Eliminar (admin)
```

### Carritos (User)
```
POST   /api/carts                          # Crear carrito
GET    /api/carts/:cid                     # Obtener carrito
POST   /api/carts/:cid/product/:pid        # Agregar producto
POST   /api/carts/:cid/purchase            # Procesar compra
DELETE /api/carts/:cid                     # Vaciar carrito
DELETE /api/carts/:cid/product/:pid        # Eliminar producto
```

---

## 🔐 Seguridad Implementada

| Medida | Descripción |
|--------|------------|
| **Bcrypt** | Hashing de contraseñas (10 rounds) |
| **JWT** | Tokens sin sesión, con expiración |
| **Roles** | Sistema de permisos (admin/user) |
| **DTO** | Exclusión de datos sensibles |
| **Validaciones** | En cada endpoint |
| **CORS Ready** | Compatible con frontend |

---

## 📊 Ejemplo de Flujo de Compra

```
1. Usuario crea carrito
   ↓
2. Agrega productos
   ↓
3. Procesa compra
   ↓
4. Sistema valida stock
   ↓
5. Reduce stock de disponibles
   ↓
6. Genera ticket
   ↓
7. Vacía carrito
   ↓
8. Retorna respuesta con detalles
```

```bash
# Ejemplo rápido
npm run dev           # Iniciar servidor
# En otra terminal
curl http://localhost:3000/api/products
```

---

## 🛠️ Dependencias Principales

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.2",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "passport-local": "^1.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^6.0.0",
  "dotenv": "^17.2.3"
}
```

---

## 🐛 Troubleshooting

### Error: Cannot connect to MongoDB
```bash
# Verificar que MongoDB esté corriendo
mongosh
# Si no está instalado: https://www.mongodb.com/try/download/community
```

### Error: Port already in use
```bash
# Cambiar PORT en .env o ejecutar:
lsof -i :3000
kill -9 <PID>
```

### Error: Module not found
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Licencia

ISC

---

## 👤 Autor

Proyecto desarrollado para CoderHouse Backend 2

---

## ✅ Checklist de Entrega

- [x] DAO Pattern implementado
- [x] Repository Pattern implementado
- [x] DTO Pattern implementado
- [x] Middleware de autorización
- [x] Autenticación con JWT
- [x] Reset password sin SMTP
- [x] CRUD de usuarios
- [x] CRUD de productos
- [x] Sistema de carritos
- [x] Lógica de compra
- [x] Generación de tickets
- [x] Roles y permisos
- [x] Documentación completa

---

## 🚀 Está Listo para Producción

Este proyecto implementa todas las mejores prácticas de desarrollo backend:
- ✅ Arquitectura escalable
- ✅ Separación de responsabilidades
- ✅ Seguridad robusta
- ✅ Documentación completa
- ✅ Validaciones exhaustivas
- ✅ Manejo de errores

**Puedes comenzar ahora con:**
```bash
npm run dev
```
