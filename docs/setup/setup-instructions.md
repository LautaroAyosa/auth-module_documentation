# Setup Instructions

## Prerequisites
To use the Authentication Module, ensure the following requirements are met:

### **Software Requirements**
- **Node.js**: Version 16.x or higher
- **MongoDB**: For database storage
- **NPM**: For dependency management

### **Environment Variables**
The following environment variables must be configured in a `.env` file:

| Variable         | Description                                |
|------------------|--------------------------------------------|
| `MONGO_URI`      | MongoDB connection URI                     |
| `JWT_SECRET`     | Secret key for signing JWT tokens          |
| `PORT`           | Port number for the application            |
| `NODE_ENV`       | Application environment (`development`/`production`) |

Example `.env` file:
```plaintext
MONGO_URI=mongodb://localhost:27017/auth_module
JWT_SECRET=supersecretkey
PORT=5000
NODE_ENV=development
```

---

## Installation
Follow these steps to set up the Authentication Module:

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/your-repo/auth-module.git
cd auth-module
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Configure Environment Variables**
Create a `.env` file in the root of the project and populate it with the required variables (see above).

### **Step 4: Start the Application**
#### **Development Mode**
```bash
npm start
```
#### **Production Mode**
```bash
NODE_ENV=production npm start
```

### **Step 5: Run Tests**
To verify the setup, execute the test suite:
```bash
npm test
```

---
