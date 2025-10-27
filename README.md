# Entrega 1 - Backend Ecommerce (Usuarios y Autenticación)

Proyecto backend de un ecommerce con **CRUD de usuarios**, **registro/login con JWT** y autenticación/autoridad usando Passport.

---

## Tecnologías

- Node.js
- Express
- MongoDB / Mongoose
- Passport (Local y JWT)
- Bcrypt para encriptar contraseñas
- JSON Web Tokens (JWT)
- Dotenv para variables de entorno

---

## Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz copiando `.env`:

```bash
cp .env.example .env
```

4. Configurar tus variables de entorno en `.env`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/entrega1
JWT_SECRET=TuClaveSecretaSegura
JWT_EXPIRES_IN=1d
```

5. Iniciar el servidor:

```bash
npx nodemon src/server.js
```

> El servidor correrá en `http://localhost:3000`

---

## Endpoints

### 1. Sesiones (Autenticación / JWT)

| Método | Ruta | Descripción |
|--------|-----|-------------|
| POST   | /api/sessions/register | Registrar un usuario. Body: `{ first_name, last_name, email, age, password }` |
| POST   | /api/sessions/login    | Login de usuario. Body: `{ email, password }`. Devuelve JWT |
| GET    | /api/sessions/current  | Devuelve datos del usuario logueado. Header: `Authorization: Bearer <token>` |

---

### 2. Usuarios (CRUD, protegido por JWT)

> Todas las rutas requieren header: `Authorization: Bearer <JWT>`

| Método | Ruta | Descripción |
|--------|-----|-------------|
| GET    | /api/users        | Listar todos los usuarios |
| GET    | /api/users/:id    | Obtener usuario por ID |
| PUT    | /api/users/:id    | Actualizar usuario (`first_name`, `last_name`, `email`, `age`, `password`, `role`) |
| DELETE | /api/users/:id    | Eliminar usuario |

---

## Uso con Postman / Insomnia

1. Registrar un usuario con `POST /api/sessions/register`.  
2. Hacer login con `POST /api/sessions/login` y copiar el `token`.  
3. Acceder a `/api/sessions/current` o cualquier ruta de `/api/users` con header:

```
Authorization: Bearer <TOKEN_AQUI>
```

---

## Notas importantes

- La contraseña se **almacena encriptada** con bcrypt.  
- JWT se genera con la clave en `.env` (`JWT_SECRET`) y expira según `JWT_EXPIRES_IN`.  
- No subir `node_modules` ni `.env` a GitHub.  
- Se puede ver la base de datos y los usuarios usando **MongoDB Compass**.  
- Proyecto listo para entregar con todas las rutas funcionales.

---

## Ejemplo de `.env`

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/entrega1
JWT_SECRET=TU_CLAVE_SECRETA_AQUI
JWT_EXPIRES_IN=1d
```

---

