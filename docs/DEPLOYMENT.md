# Deployment Documentation

## Overview

This document provides comprehensive guidance for deploying the AI Chat Application to various platforms and environments. The application consists of a React frontend and Node.js backend with MongoDB database.

## Prerequisites

### Required Accounts
- **GitHub** - Source code repository
- **MongoDB Atlas** - Cloud database (recommended)
- **API Keys** - OpenRouter and/or Google Gemini
- **Deployment Platform** - Vercel, Netlify, Railway, etc.

### Local Setup
- Node.js (v16 or higher)
- Git
- MongoDB (for local development)

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/aichat?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=production

# AI Services (Optional - for server.js)
OPENROUTER_API_KEY=your_openrouter_api_key

# Security
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
# AI Services
VITE_API_GENERATIVE_LANGUAGE_CLIENT=your_gemini_api_key

# Backend URL
VITE_API_URL=https://your-backend-domain.com

# Environment
VITE_NODE_ENV=production
```

## Deployment Strategies

### Strategy 1: Separate Frontend/Backend Deployment

#### Backend Deployment

**Platform Options:**
- Railway
- Render
- Heroku
- DigitalOcean App Platform

**Steps:**

1. **Prepare Backend:**
   ```bash
   cd backend
   npm install
   npm run build  # if applicable
   ```

2. **Environment Setup:**
   - Set environment variables in deployment platform
   - Configure MongoDB Atlas connection
   - Add API keys

3. **Deploy:**
   ```bash
   # For Railway
   railway login
   railway init
   railway up

   # For Render
   # Connect GitHub repository
   # Configure build settings
   ```

#### Frontend Deployment

**Platform Options:**
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

**Steps:**

1. **Prepare Frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Environment Setup:**
   - Set environment variables
   - Update API URL to point to backend

3. **Deploy:**
   ```bash
   # For Vercel
   npm install -g vercel
   vercel

   # For Netlify
   # Drag and drop dist folder
   # Or connect GitHub repository
   ```

### Strategy 2: Monorepo Deployment

#### Railway (Recommended)

**Advantages:**
- Single platform for both frontend and backend
- Automatic deployments
- Built-in environment variable management

**Steps:**

1. **Create Railway Project:**
   ```bash
   railway login
   railway init
   ```

2. **Configure Services:**
   - Backend service (Node.js)
   - Frontend service (Static Site)

3. **Environment Variables:**
   ```env
   # Backend service
   MONGO_URI=mongodb+srv://...
   NODE_ENV=production
   
   # Frontend service
   VITE_API_URL=https://backend-service.railway.app
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

### Strategy 3: Docker Deployment

#### Docker Configuration

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/aichat
      - NODE_ENV=production
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## Platform-Specific Deployment

### Vercel (Frontend)

**Configuration:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-domain.com/api/$1"
    }
  ]
}
```

**Environment Variables:**
- `VITE_API_GENERATIVE_LANGUAGE_CLIENT`
- `VITE_API_URL`

### Railway (Backend)

**Configuration:**
```json
// railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Render (Backend)

**Configuration:**
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Environment:** Node

**Environment Variables:**
- `MONGO_URI`
- `NODE_ENV`
- `PORT`

### Netlify (Frontend)

**Configuration:**
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-domain.com/api/:splat"
  status = 200
```

## Database Setup

### MongoDB Atlas

**Steps:**

1. **Create Cluster:**
   - Sign up at MongoDB Atlas
   - Create new cluster
   - Choose cloud provider and region

2. **Configure Network Access:**
   - Add IP address: `0.0.0.0/0` (for all IPs)
   - Or specific IP addresses

3. **Create Database User:**
   - Username and password
   - Database access permissions

4. **Get Connection String:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/aichat?retryWrites=true&w=majority
   ```

### Local MongoDB

**Installation:**
```bash
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Windows
# Download from MongoDB website
```

**Start Service:**
```bash
# macOS
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod

# Windows
# Start MongoDB service
```

## Production Considerations

### Security

1. **Environment Variables:**
   - Never commit API keys to repository
   - Use platform-specific environment variable management
   - Rotate keys regularly

2. **CORS Configuration:**
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-domain.com'],
     credentials: true,
     methods: ['GET', 'POST', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

3. **HTTPS:**
   - Enable HTTPS on all platforms
   - Configure SSL certificates
   - Redirect HTTP to HTTPS

### Performance

1. **Database Optimization:**
   ```javascript
   // Add indexes
   chatSchema.index({ createdAt: 1 });
   chatSchema.index({ type: 1 });
   ```

2. **Caching:**
   ```javascript
   // Add Redis for caching
   import Redis from 'ioredis';
   const redis = new Redis(process.env.REDIS_URL);
   ```

3. **Compression:**
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

### Monitoring

1. **Health Checks:**
   ```javascript
   app.get('/health', (req, res) => {
     res.json({
       status: 'OK',
       timestamp: new Date().toISOString(),
       uptime: process.uptime(),
       memory: process.memoryUsage(),
       database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
     });
   });
   ```

2. **Logging:**
   ```javascript
   import morgan from 'morgan';
   app.use(morgan('combined'));
   ```

3. **Error Tracking:**
   - Sentry integration
   - Application performance monitoring

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check CORS configuration
   - Verify frontend URL in backend CORS settings
   - Test with Postman

2. **Database Connection:**
   - Verify MongoDB URI
   - Check network access
   - Test connection locally

3. **Environment Variables:**
   - Verify all variables are set
   - Check variable names (case-sensitive)
   - Test locally with .env file

4. **Build Errors:**
   - Check Node.js version
   - Verify all dependencies
   - Check for syntax errors

### Debug Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Test database connection
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected')).catch(console.error)"

# Test API endpoints
curl -X GET https://your-backend-domain.com/api/chats

# Check environment variables
node -e "console.log(process.env)"
```

## Maintenance

### Regular Tasks

1. **Security Updates:**
   - Update dependencies regularly
   - Monitor security advisories
   - Rotate API keys

2. **Performance Monitoring:**
   - Monitor response times
   - Check database performance
   - Review error logs

3. **Backup:**
   - Database backups
   - Configuration backups
   - Code repository backups

### Scaling

1. **Horizontal Scaling:**
   - Multiple server instances
   - Load balancer configuration
   - Database clustering

2. **Vertical Scaling:**
   - Increase server resources
   - Optimize database queries
   - Implement caching

## Cost Optimization

### Free Tiers

- **Vercel:** Free tier for frontend
- **Railway:** Free tier for small projects
- **MongoDB Atlas:** Free tier (512MB)
- **Render:** Free tier for backend

### Paid Services

- **Vercel Pro:** $20/month
- **Railway:** Pay-as-you-use
- **MongoDB Atlas:** Starting at $9/month
- **Render:** Starting at $7/month

### Cost Monitoring

- Set up billing alerts
- Monitor usage regularly
- Optimize resource usage
- Use appropriate instance sizes 