# API Documentation

## Authentication Endpoints

### **1. Register**
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Description**: Creates a new user account.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `201 Created`: User registered successfully.
  - `500 Internal Server Error`: Error occurred during registration.

---

### **2. Login**
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Description**: Authenticates a user and returns access and refresh tokens.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: Access and refresh tokens issued.
    ```json
    {
      "accessToken": "<ACCESS_TOKEN>",
      "refreshToken": "<REFRESH_TOKEN>"
    }
    ```
  - `401 Unauthorized`: Invalid email or password.

---

## Multi-Factor Authentication (MFA) Endpoints

### **1. Enable MFA**
- **Method**: `POST`
- **Endpoint**: `/auth/enable-mfa`
- **Description**: Enables TOTP-based MFA for a user account.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <ACCESS_TOKEN>"
  }
  ```
- **Response**:
  - `200 OK`: QR code and recovery code returned.
    ```json
    {
      "qrCode": "<QR_CODE_URL>",
      "recoveryCode": "<RECOVERY_CODE>"
    }
    ```
  - `500 Internal Server Error`: Error enabling MFA.

### **2. Verify MFA**
- **Method**: `POST`
- **Endpoint**: `/auth/verify-mfa`
- **Description**: Verifies the TOTP code during login.
- **Request Body**:
  ```json
  {
    "tempSessionId": "<SESSION_ID>",
    "token": "123456"
  }
  ```
- **Response**:
  - `200 OK`: Access and refresh tokens issued upon successful verification.
    ```json
    {
      "accessToken": "<ACCESS_TOKEN>",
      "refreshToken": "<REFRESH_TOKEN>"
    }
    ```
  - `400 Bad Request`: Invalid session or token.

---

## Token Management Endpoints

### **1. Refresh Token**
- **Method**: `POST`
- **Endpoint**: `/auth/refresh-token`
- **Description**: Issues a new access token using a valid refresh token.
- **Request Body**:
  ```json
  {
    "refreshToken": "<REFRESH_TOKEN>"
  }
  ```
- **Response**:
  - `200 OK`: New access token issued.
    ```json
    {
      "accessToken": "<ACCESS_TOKEN>"
    }
    ```
  - `401 Unauthorized`: Invalid or expired refresh token.

### **2. Logout**
- **Method**: `POST`
- **Endpoint**: `/auth/logout`
- **Description**: Logs the user out by invalidating the refresh token.
- **Request Body**:
  ```json
  {
    "refreshToken": "<REFRESH_TOKEN>"
  }
  ```
- **Response**:
  - `200 OK`: User logged out successfully.
  - `500 Internal Server Error`: Error during logout.

---
