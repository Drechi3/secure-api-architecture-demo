![DevSecOps](https://img.shields.io/badge/DevSecOps-Practitioner-blue)
![API Security](https://img.shields.io/badge/API-Security-green)
![Cloud Security](https://img.shields.io/badge/Cloud-Security-red)
# Secure API Authentication Demo

This project demonstrates a simple authentication system using Node.js and Express.

## Features
- Public route (/api/home)
- Login system (/api/login)
- Protected route with token check (/api/protected)
- Simple Bearer token authentication simulation

## How It Works

1. User sends login request with credentials
2. Server returns a token if credentials are valid
3. Token is required to access protected routes
4. Invalid or missing token blocks access

## Test Users
- alice / password123 (admin)
- bob / hunter2 (viewer)

## Security Concepts Demonstrated
- Authentication flow
- Authorization using tokens
- Secure route protection
- Error handling for unauthorized access

## Purpose
This project is part of my DevSecOps and API security learning portfolio.
