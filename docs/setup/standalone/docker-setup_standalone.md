---
title: Docker Compose for Standalone setup
---

# 🐳 Standalone Setup - Docker  

This guide explains how to set up and run the **Authentication Module (Backend Only)** using **Docker**.

---

## 📌 1️⃣ Prerequisites  

Ensure you have the following installed:  

✅ **Docker** → [Download](https://www.docker.com/get-started/)  
✅ **Docker Compose** (comes with Docker)  

> If you are using **Windows**, make sure WSL 2 is enabled.  

---

## 📥 2️⃣ Clone the Repository   // modify

First, clone the authentication module repository:  

```sh
git clone https://github.com/your-repo/auth-module.git
cd auth-module
```

---

## ⚙️ 3️⃣ Configure Environment Variables  

Before running the container, create a **`.env` file** in the root directory:

```sh
cp .env.example .env
```

Modify the database settings to match **Docker’s network**:

```ini
DB_TYPE=postgres   # Or "mongo"
DB_HOST=database   # Must match the service name in docker-compose.standalone.yml
DB_PORT=5432       # Use 27017 for MongoDB
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=auth_db
```

> **❗ Important:** Do **NOT** set `DB_URI` directly in `.env`. The app will construct the URI automatically from `DB_HOST`, `DB_USER`, etc.

---

## 📝 4️⃣ Create `docker-compose.standalone.yml`  

This file should be placed in the root directory of the authentication module and should be used only when running the **backend** as a standalone service.

```yaml
version: '3.8'

services:
  auth-backend:
    container_name: auth-backend
    build: .
    ports:
      - "4000:4000"
    env_file:
      - .env
    depends_on:
      - database
    restart: unless-stopped

  database:
    image: postgres:14  # Change to mongo:6 if using MongoDB
    container_name: auth-db
    restart: unless-stopped
    ports:
      - "5432:5432"  # Change to "27017:27017" for MongoDB
    environment:
      POSTGRES_USER: your-username
      POSTGRES_PASSWORD: your-password
      POSTGRES_DB: auth_db
    volumes:
      - auth-db-data:/var/lib/postgresql/data  # Change volume for MongoDB

volumes:
  auth-db-data:
```

> **🔧 Notes:**  
> - This example uses **PostgreSQL** by default. If you prefer MongoDB, replace `postgres:14` with `mongo:6`, adjust the port, and remove the PostgreSQL environment variables.  
> - The backend is set to **auto-restart** and will wait for the database before running.  

---

## 🚀 5️⃣ Run the Authentication Module with Docker  

Run the following command to start the backend:

```sh
docker-compose -f docker-compose.standalone.yml up -d
```

This will:  
✅ Start the **Authentication Module (Backend)** on `http://localhost:4000`  
✅ Launch a **PostgreSQL or MongoDB** database in a separate container  

---

## 🛢️ 6️⃣ Running Database Migrations (PostgreSQL Only)  

If you're using **PostgreSQL**, you must run migrations after starting the service:

```sh
docker exec -it auth-backend npm run migrate
```

To **rollback** migrations:

```sh
docker exec -it auth-backend npm run migrate:rollback
```

> **MongoDB does not require migrations**. The database initializes automatically.  


---

## 🔄 Stopping & Restarting  

To **stop** the containers:  

```sh
docker-compose -f docker-compose.standalone.yml down
```

To **restart** the service:  

```sh
docker-compose -f docker-compose.standalone.yml up -d --build
```

