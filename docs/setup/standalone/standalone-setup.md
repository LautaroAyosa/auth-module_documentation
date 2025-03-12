---
title: Standalone Setup
---

# 🏗️ Standalone Setup  

The **Standalone Setup** method allows you to run the authentication module as a separate backend service in your project. This is ideal if you:  

✅ Want to **run authentication as an independent service** alongside your main app  
✅ Need a **self-contained authentication API** that can be used by multiple clients  
✅ Prefer **full control** over the authentication logic and database  

> ⚠️ **Note:** This setup only includes the **backend**. The frontend UI for authentication should be implemented in your own app.  

---

## 📥 1️⃣ Clone the Repository  

Start by cloning the authentication module into your project directory:  

```sh
git clone https://github.com/LautaroAyosa/AuthModule.git
cd auth-module
```

---

## 📦 2️⃣ Install Dependencies  

Make sure you have **Node.js** installed (preferably v18+), then install the required dependencies:  

```sh
npm install
```

or using **yarn**:

```sh
yarn install
```

---

## ⚙️ 3️⃣ Configure Environment Variables  

Set up your `.env` file in the **root directory** of the project. You can use the provided `.env.example` as a reference:  

```sh
cp .env.example .env
```

Then, open `.env` and fill in the necessary values. 

> For a full list of environment variables, see the [**General Setup Instructions**](/docs/setup/setup-instructions#-environment-variables).  

---

## 🛢️ 4️⃣ Set Up the Database  

This module supports **PostgreSQL and MongoDB**. Make sure your chosen database is installed and running.  

### ➤ If Using PostgreSQL (Recommended)  
Run database migrations to create the necessary tables:  

```sh
npm run migrate
```

> If needed, you can rollback migrations with:  
```sh
npm run migrate:rollback
```

### ➤ If Using MongoDB  
No migrations are needed. The database will initialize automatically on first use.  

---

## 🚀 5️⃣ Start the Authentication Service  

Once everything is set up, start the server:  

```sh
npm run dev
```

This will launch the authentication module in **development mode** on `http://localhost:5000`.  

For production, use:  

```sh
npm start
```

> The **PORT** can be customized in the `.env` file.  

---

## 🐳 (Optional) Running with Docker  

If you prefer using Docker, the module comes with a `docker-compose.yml` file that simplifies setup:  

```sh
docker-compose up -d
```

This will:  
✅ Start the authentication service  
✅ Launch a PostgreSQL or MongoDB container (depending on your config)  

---

