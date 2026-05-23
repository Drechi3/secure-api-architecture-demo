# Security Notes

## Key Learnings

### 1. Authentication vs Authorization
Authentication = verifying identity  
Authorization = checking permissions

### 2. Token-Based Access
The API uses a simple token system to simulate JWT behavior.

### 3. Security Best Practices
- Never expose raw passwords in real systems
- Always validate tokens before protected routes
- Return generic error messages to prevent user discovery attacks

## Real-World Equivalent
In production systems, this would be replaced with:
- JWT (JSON Web Tokens)
- OAuth2 or OpenID Connect
- Encrypted password storage (bcrypt)
