# 🔐 PassGuard - Your Own Password Manager (MongoDB Version)

**PassGuard** is a full-stack password manager built using **Vite**, **React**, **Express**, and **MongoDB**. It allows users to securely store and manage credentials with persistent storage powered by a **MongoDB database** and a RESTful **API backend**.

This version uses a **server-side backend** to handle all CRUD operations through Express APIs, enabling centralized and scalable data management beyond the limitations of Local Storage.

---

## 🚀 Features

- ✅ Add new credentials:
  - Website URL
  - Username
  - Password
- 🔗 Website URLs are saved as **clickable links**
- 👁️ Toggle password visibility (Show/Hide)
- 📝 Edit saved credentials
- 🗑️ Delete credentials
- 📋 Copy Website URL, Username, or Password with one click
- 🌐 Backend connected to **MongoDB** for persistent storage
- 🔐 Secure communication between frontend and backend via **APIs**

---

## 🛠️ Tech Stack

### 🔧 Frontend
- **React** – Frontend library for building UI
- **Vite** – Fast bundler and development server
- **Tailwind CSS** – Utility-first styling
- **JavaScript** – Logic and interaction
- **HTML** – Page structure

### 🔧 Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework for handling API routes
- **MongoDB** – NoSQL database for storing user data
- **mongodb** – MongoDB driver for Node.js

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/namankr17/PassGuard--MongoDB.git
cd PassGuard--MongoDB
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

#### Create a .env file in the backend/ directory with:

```env
MONGO_URI=your_mongodb_connection_string
```

#### Start the server

```bash
node server.js
```

### 3️⃣ Setup Frontend

```bash
cd ..
npm install
npm run dev
```

#### Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

🔗 **LocalStorage version**: [https://github.com/namankr17/PassGuard--LS](https://github.com/namankr17/PassGuard--LS)

---

*Made with ❤️ by [namankr17](https://github.com/namankr17)*