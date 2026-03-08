# SkillForge Integration & Deployment Guide

## Local Development Setup

### 1. Backend Setup

```bash
cd server

# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env

# Install dependencies
npm install

# Run development server (with nodemon)
npm run dev
```

Server runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd client

# Create .env if it doesn't exist
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Install dependencies
npm install

# Start React dev server
npm start
```

Frontend runs on `http://localhost:3000`

---

## Docker Setup (Recommended for Production)

### Prerequisites
- Docker & Docker Compose installed

### Quick Start

```bash
# From root directory
docker-compose up

# Backend available at http://localhost:5000
# MongoDB available at mongodb://localhost:27017
```

To stop:
```bash
docker-compose down
```

To rebuild:
```bash
docker-compose up --build
```

---

## Database Setup

### Option A: Docker (Easiest)
MongoDB automatically starts when running `docker-compose up`.

### Option B: Local MongoDB

**macOS (Homebrew):**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Windows (WSL2):**
```bash
# Inside WSL2 Ubuntu
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

Verify connection:
```bash
mongo # or mongosh for newer versions
use skillforge
```

---

## Environment Variables

### Server `.env`
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillforge
JWT_SECRET=change_this_to_a_secure_random_string
NODE_ENV=development
```

### Client `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

---

## Sample User Credentials (for testing)

After running seed script:

**Student:**
- Email: `student@example.com`
- Password: `changeme`

**Business:**
- Email: `business@example.com`
- Password: `changeme`

**Admin:**
- Email: `admin@example.com`
- Password: `changeme`

---

## Troubleshooting

### MongoDB Connection Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Fix:**
- Ensure MongoDB is running: `ps aux | grep mongod`
- Check `MONGO_URI` in `.env` is correct
- If using Docker, run: `docker-compose up`

### React Module Not Found
```
Error: Cannot find module 'react'
```
**Fix:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```
EADDRINUSE: address already in use :::5000
```
**Fix:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Mac/Linux

# Or in Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## Deployment

### Vercel (Frontend)
1. Push to GitHub
2. Connect repo to Vercel
3. Set `REACT_APP_API_URL` env var to production backend
4. Deploy

### Heroku (Backend)
```bash
heroku login
heroku create skillforge-api
heroku config:set JWT_SECRET=your_production_secret
heroku config:set MONGO_URI=your_atlas_uri
git push heroku main
```

### AWS EC2
See AWS deployment docs for Node.js + MongoDB setup.

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a PR with description

---

## Support

For issues, questions, or contributions, open a GitHub issue or contact the team.
