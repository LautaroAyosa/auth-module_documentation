# ⚙️ General Setup Instructions  

Before integrating the **Authentication Module** into your project, ensure that your system meets the required dependencies and configurations.

---

## 📌 Prerequisites  

To run this module, you need the following installed on your system:  

- **Node.js** (LTS recommended) → [Download](https://nodejs.org/)  
- **npm** (comes with Node.js) or **yarn**  
- **Docker & Docker Compose** (optional but recommended for local setup) → [Download](https://www.docker.com/get-started/)  
- **A Database** (PostgreSQL or MongoDB)  
  - **PostgreSQL** (Recommended) → [Download](https://www.postgresql.org/)  
  - **MongoDB** → [Download](https://www.mongodb.com/)  

---

## 🛠️ Software Requirements  

| Dependency  | Version | Required |
|------------|---------|----------|
| **Node.js** | 18+  | ✅ |
| **npm** / **yarn** | Latest | ✅ |
| **PostgreSQL** | 14+ | ✅ (if using Postgres) |
| **MongoDB** | 6+ | ✅ (if using MongoDB) |
| **Docker & Docker Compose** | Latest | ⚡ Recommended |

> **Note:** If using Docker, you don't need to install PostgreSQL or MongoDB separately, as they will be handled via Docker Compose.

---

## 🌍 Environment Variables  

This module requires an `.env` file for configuration. Below is a list of essential environment variables:  
A complete `.env.example` file is included in the code with this information.

### 🔹 **Database Configuration**  
``` ini
DB_TYPE=postgres                             # Options: "postgres" | "mongo"

PG_URI=postgres://user:password@host:port/database_name
MONGO_URI=mongodb://user:password@host:port/database_name
```
> **Note:** Both `PG_URI` and `MONGO_URI` can be set at the same time or you can the one you're not using empty. The only one that will be used is the one indicated by DB_TYPE. 

### 🔹 **Authentication & Security**  
```ini
JWT_SECRET=your-jwt-secret
BCRYPT_COST=intended-cost-of-calculation    # Default=10
ACCESS_TOKEN_LIFETIME=15m
REFRESH_TOKEN_LIFETIME=7d
```

### 🔹 **Backend Configuration**  
```ini
APP_NAME=YourAppName                        # For page Metadata and some email configurations.
FRONTEND_URL=https://your-frontend.com      # Important for CORS and password reset emails
PORT=intended-port                          # Default=5000
NODE_ENV=development                        # Options: 'development' | 'production'
```

### 🔹 **Frontend Configuration**
``` ini
NEXT_PUBLIC_API_BASE_URL=https://your-backend.com
```

### 🔹 **Email Configuration (for Password Resets)**  
```ini
MAIL_HOST=smtp.your-email-provider.com
MAIL_PORT=587
MAIL_USER=your-email@example.com          # Emails will be sent from this address
MAIL_PASSWORD=your-email-password
```

---

This setup ensures that all necessary dependencies and configurations are in place before moving on to project installation and execution.