---
id: greetings
title: Welcome!
slug: /
---

# 📢 Welcome to the Authentication Module Docs!

Welcome to the **Authentication Module**, a plug-and-play authentication solution designed for seamless integration into any Node.js-based application. This module provides a secure and scalable authentication system with JWT-based authentication, refresh tokens, and multi-factor authentication (MFA).  

Whether you are building a new project from scratch or adding authentication to an existing app, this module allows you to **quickly implement** user authentication with minimal configuration.

---

## 🔍 What is this Module?  

The **Authentication Module** is a fully functional authentication system designed to be **cloned, configured, and deployed** inside any project. Unlike a central authentication API, this module is meant to be included **inside your own application** as a GitHub submodule or a standalone service. It supports both **PostgreSQL and MongoDB**, making it highly flexible for different use cases.

---

## 🚀 Features  

✅ **Email/Password Authentication** - Secure login system with JWT authentication  
✅ **Refresh Token Flow** - Automatic access token renewal for better security  
✅ **Multi-Factor Authentication (MFA)** - Optional 2FA for enhanced security  
✅ **Password Reset System** - Secure password reset via email tokens  
✅ **Database Support** - Works with both **PostgreSQL** and **MongoDB**  
✅ **Docker Support** - Easily deploy with `docker-compose`  
✅ **Frontend Included** - Ready-to-use Next.js frontend with authentication flows  
✅ **Environment-Based Configuration** - Easily configure database, email settings, and more  
✅ **Plug-and-Play Integration** - Add it to any project with minimal setup  

> 🔒 Future Improvements: Refresh Token Rotation, Social Logins (Google, GitHub, etc.)

---

## 🏗️ How it Works  

This module follows a **JWT-based authentication flow** with refresh tokens and optional multi-factor authentication (MFA).

### 1️⃣ User Login Flow  
- The user enters their **email** and **password**.  
- The backend **verifies** the credentials.  
- If **MFA is disabled**, the server generates **access** and **refresh tokens**, sending them via **`httpOnly` cookies**.  
- If **MFA is enabled**, a **Temporary Session Token** (generated via Node.js `crypto`) is sent to the frontend for MFA verification.  

### 2️⃣ MFA Verification Flow (if enabled)  
- The user enters their **MFA code**.  
- The backend verifies the **Temporary Session Token**.  
- If valid, it retrieves the user and verifies the **MFA code**.  
- If successful, **access** and **refresh tokens** are issued and sent via **`httpOnly` cookies**.  
- **Temporary Session Tokens** expire automatically and are deleted after use.  

### 3️⃣ Token Lifecycle  
- **Access Token** → **15 minutes**  
- **Refresh Token** → **7 days** (rotation planned for future updates)  
- **Password Reset Token** → **1 hour**  
- **Temporary Session Token (MFA)** → **15 minutes**  

### 4️⃣ Password Reset Flow  
- The user requests a **password reset**.  
- A **password reset token** (generated via Node.js `crypto`) is sent via email as a **URL** to the frontend.  
- The frontend submits the **token** and **new password** to the backend.  
- If the token is valid, the **password is updated**.  

---

## 🛠️ Tech Stack  

### Backend  
- **Node.js** (Express)  
- **PostgreSQL / MongoDB** (selectable)  
- **JWT for authentication**  
- **Crypto for secure tokens**  

### Frontend  
- **Next.js** (React framework)  
- **Axios** (API requests)  
- **TailwindCSS** (Styling)  
- **TypeScript**  

### Deployment  
- **Docker Support** (`docker-compose` for easy setup)  

---

## 🎯 Who is This For?  

This module is built for **developers** who need a **fast, reliable, and secure** authentication system in their projects. Whether you're an **indie developer, a startup, or a larger team**, this module helps you **save time and effort** when implementing authentication.

