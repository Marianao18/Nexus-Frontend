<div align="center">

<img src="https://img.shields.io/badge/NEXUS-Beyond%20Control-00E5FF?style=for-the-badge&labelColor=060B14" alt="NEXUS"/>

# ◈ NEXUS — Beyond Control

**Plataforma educativa en Tecnologías de la Información**  
Desarrollada para Medellín · Tecnológico de Antioquia

[![Django](https://img.shields.io/badge/Django-4.2-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io)

</div>

---

## ⚡ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React.js · React Router |
| **Backend** | Django 4.2 · Django REST Framework |
| **Base de datos** | PostgreSQL 15 |
| **Autenticación** | JWT · djangorestframework-simplejwt |
| **CORS** | django-cors-headers |

---

## 🗂 Estructura del proyecto

```
NEXUS-PROJECT/
├── backend/                    # Servidor Django (Python)
│   ├── apps/
│   │   ├── usuarios/           # Registro, login, JWT
│   │   └── solicitudes/        # Flujo docentes y recuperación de contraseña
│   ├── nexus/                  # Configuración principal (settings.py)
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env                    # 🔒 Variables privadas (no se sube)
│   └── .env.example            # Plantilla para colaboradores
│
└── src/                        # Frontend React
    ├── components/
    │   ├── Background.jsx / .css
    │   ├── Navbar.jsx / .css
    │   ├── Hero.jsx / .css
    │   ├── Login.jsx / .css
    │   ├── Registro.jsx / .css
    │   ├── RecuperarPassword.jsx / .css   ← nuevo
    │   ├── RestablecerPassword.jsx / .css ← nuevo
    │   ├── Terminal.jsx / .css
    │   ├── Stats.jsx / .css
    │   ├── Features.jsx / .css
    │   ├── Rutas.jsx / .css
    │   ├── CtaBanner.jsx / .css
    │   └── Footer.jsx / .css
    ├── App.jsx                 # Componente raíz y rutas
    ├── index.js                # Punto de entrada
    └── index.css               # Estilos globales y variables de color
```

---

## 🚀 Instalación y configuración

### Prerrequisitos

- Python 3.10 o superior
- Node.js v16 o superior
- PostgreSQL 15

---

### 🔧 Backend (Django)

**1. Clonar el repositorio**
```bash
git clone https://github.com/Marianao18/Nexus.git
cd Nexus/backend
```

**2. Crear y activar el entorno virtual**
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

**3. Instalar dependencias**
```bash
pip install -r requirements.txt
```

**4. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del backend:
```env
SECRET_KEY=nexus-clave-super-secreta-cambia-esto
DEBUG=True

# Base de datos
DB_NAME=nexus_db
DB_USER=nexus_user
DB_PASSWORD=tu_password_de_postgres
DB_HOST=localhost
DB_PORT=5432

# Correo (Gmail App Password)
EMAIL_HOST_USER=tu_correo@gmail.com
EMAIL_HOST_PASSWORD=tu_codigo_de_16_letras_de_google
```

**5. Crear la base de datos en PostgreSQL**
```sql
CREATE DATABASE nexus_db;
CREATE USER nexus_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE nexus_db TO nexus_user;
GRANT ALL ON SCHEMA public TO nexus_user;
```

**6. Aplicar migraciones y crear superusuario**
```bash
python manage.py migrate
python manage.py createsuperuser
```

**7. Arrancar el servidor**
```bash
python manage.py runserver
```
> El backend corre en `http://localhost:8000`

---

### 🎨 Frontend (React)

```bash
cd Nexus/src
npm install
npm start
```

---

## 🔌 Endpoints de la API

| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| `POST` | `/api/registrar-estudiante/` | Público | Registro de estudiantes |
| `POST` | `/api/login/` | Público | Inicio de sesión |
| `GET`  | `/api/perfil/` | 🔒 JWT | Datos del usuario autenticado |
| `POST` | `/api/solicitud-docente/` | Público | Enviar solicitud para ser docente |
| `GET`  | `/api/admin/solicitudes/` | 👑 Admin | Ver solicitudes pendientes |
| `POST` | `/api/admin/aprobar-docente/{id}/` | 👑 Admin | Aprobar solicitud de docente |
| `POST` | `/api/admin/rechazar-docente/{id}/` | 👑 Admin | Rechazar solicitud de docente |
| `POST` | `/api/password-reset/` | Público | Solicitar recuperación de clave |
| `POST` | `/api/confirmar-password/` | Público | Establecer nueva clave con UID y Token |

---

## 👥 Roles de usuario

| Rol | Cómo se crea | Acceso |
|-----|-------------|--------|
| 🎓 **Estudiante** | Formulario `/registro` | Landing Page |
| 📚 **Docente** | Solicitud aprobada por admin | Landing Page |
| 🔑 **Administrador** | `python manage.py createsuperuser` | Panel Admin |

---

## 🎨 Paleta de colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--accent-cyan` | ![#00E5FF](https://img.shields.io/badge/-00E5FF-00E5FF?style=flat-square) `#00E5FF` | Acento principal / tech |
| `--accent-lime` | ![#A3FF4F](https://img.shields.io/badge/-A3FF4F-A3FF4F?style=flat-square) `#A3FF4F` | Aprendizaje / acceso libre |
| `--accent-purple` | ![#7B5CFA](https://img.shields.io/badge/-7B5CFA-7B5CFA?style=flat-square) `#7B5CFA` | IA / personalización |
| `--accent-orange` | ![#FF6B35](https://img.shields.io/badge/-FF6B35-FF6B35?style=flat-square) `#FF6B35` | Datos / dinamismo |
| `--bg-deep` | ![#060B14](https://img.shields.io/badge/-060B14-060B14?style=flat-square) `#060B14` | Fondo profundo |

---

<div align="center">

Desarrollado por Mariana Y Lina
</div>
