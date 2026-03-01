# Coding Tracker

A quick and dirty full stack application with .NET and Vue. Made as part of the exercise of the Full Stack Open curriculum.

## ✅ Project Requirements

The requirements were to create a full stack application and then Dockerising it. The folder structure must be as follows:

```
└── my-app
    ├── frontend
    |    ├── dev.Dockerfile
    |    └── Dockerfile
    ├── backend
    |    └── dev.Dockerfile
    |    └── Dockerfile
    ├── nginx.dev.conf
    ├── nginx.conf
    ├── docker-compose.dev.yml
    └── docker-compose.yml
```

## 🛠️ Tech stack

- Backend: ASP.NET Core 10 (Minimal API)
- Database: SQLite with Entity Framework Core
- Frontend: Vue3, Bootstrap 5
- Containerisation: Docker with Docker compose

## 📁 Folder structure

```
.
├── CodingTracker.Backend
│   ├── Data
│   ├── Migrations
│   ├── Models
│   ├── Properties
│   ├── dev.Dockerfile
│   ├── Dockerfile
│   ├── docker-compose.dev.yml
│   └── docker-compose.yml
├── CodingTracker.Vue
│   ├── dev.Dockerfile
│   ├── Dockerfile
│   ├── docker-compose.dev.yml
│   ├── docker-compose.yml
│   ├── public
│   └── src
│       ├── assets
│       ├── components
│       ├── router
│       └── views
├── docker-compose.dev.yml
└── docker-compose.yml
```

## 🏗️ Getting Started

### 1. Prerequisites

- [Docker](https://docker.com)
- [Podman](https://podman.io/)

### 2. Clone the repository

```bash
git clone <repository-url> CodingTracker
cd CodingTracker
```

### 3. Run the application containerised

> [!WARNING]
> When not running the containers with the compose files make sure to set the correct environment variables:
>
> - **Backend**: ASPNETCORE_HTTP_PORTS
> - **Frontend (during build)**: VITE_API_URL

The application supports 2 container modes. Production and development. Follow the following instruction for each of the

#### Development mode

```sh
docker compose -f docker-compose.dev.yml up
```

or

```sh
docker build -t <image_name> -f dev.Dockerfile .
docker run -p "<host_port>:<container_port>" <image_name>
```

#### Production mode

```sh
docker compose -f docker-compose.yml up
```

or

```sh
docker build -t <image_name> -f Dockerfile .
docker run -p "<host_port>:<container_port>" <image_name>
```

### 4. Access the app

If you start the containers from the root of the application:

- Dev: http://localhost:8080
  - `/api` for the API
- Production: http://localhost:80 - `/api` for the API
  If from frontend:
- dev: open http://localhost:5173
- production: open http://localhost:80
  If from backend:
- dev: open http://localhost:5000
- production: open http://localhost/api

> **Note**: Above ports are default ports. Change according to own changes.
