# Secure API Authentication System (DevSecOps Portfolio Project)

![DevSecOps](https://img.shields.io/badge/DevSecOps-Practitioner-blue)
![API Security](https://img.shields.io/badge/API-Security-green)
![Cloud Security](https://img.shields.io/badge/Cloud-Security-red)

---

## 📌 Overview
This project demonstrates a secure backend API built with Node.js and Express, focusing on authentication, authorization, and API security principles used in production systems.

---

## 🏗️ Architecture

Client → Express Server → Authentication Middleware → Protected Routes → Response

---

## ⚙️ Features
- Public endpoint (`/api/home`)
- User authentication (`/api/login`)
- Protected route (`/api/protected`)
- Token-based access control (mock JWT system)
- Role-based user structure (admin / viewer)
- ES Module architecture

---

## 🔐 Security Concepts Demonstrated
- Authentication vs Authorization
- Token-based security flow
- Role-based access control
- Secure route handling
- Consistent error responses

---

## 🧪 Test Flow

### 1. Login
```http
POST /api/login