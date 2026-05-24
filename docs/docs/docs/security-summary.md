# Security Summary

## What I Learned

This project demonstrates how modern APIs enforce security through layered architecture:

### 1. Authentication Layer
Validates user identity using credentials.

### 2. Authorization Layer
Controls access to protected resources using tokens.

### 3. Role-Based Access (RBAC)
Users are assigned roles (admin/viewer) to simulate permission control.

### 4. Secure Design Principles
- Never trust client input
- Always validate tokens
- Separate public and protected routes
