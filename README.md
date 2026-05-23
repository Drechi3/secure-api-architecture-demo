# DevSecOps Portfolio Project
![DevSecOps](https://img.shields.io/badge/DevSecOps-Practitioner-blue)
![API Security](https://img.shields.io/badge/API-Security-green)
![Cloud Security](https://img.shields.io/badge/Cloud-Security-red)
# Secure API Authentication System (DevSecOps Project)

## Overview
This project demonstrates a secure backend API built with Node.js and Express, implementing authentication and authorization concepts commonly used in production systems.

## Features
- Public endpoint (/api/home)
- User authentication (/api/login)
- Protected route (/api/protected)
- Token-based access control (mock JWT system)
- Role-based user structure (admin / viewer)
- ES Module architecture (modern Node.js setup)

## Test Flow

1. Login:
POST /api/login  
{ "username": "alice", "password": "password123" }

2. Use token:
Authorization: Bearer <token>

3. Access protected route:
GET /api/protected

## Security Concepts Demonstrated
- Authentication vs Authorization
- Token-based security flow
- Role-based access design
- Secure route handling
- Error response consistency

## Tech Stack
- Node.js
- Express.js
- JavaScript (ES Modules)

## Purpose
This project is part of my DevSecOps and API security learning portfolio, demonstrating backend security architecture fundamentals.
