# 📋 File Navigation Guide

Quick reference for all files in SkillForge and their purposes.

---

## 📖 Documentation Files (Start Here!)

| File | Purpose |
|------|---------|
| **[README.md](README.md)** | 🏠 Main overview, tech stack, quick start |
| **[QUICKSTART.md](QUICKSTART.md)** | 🚀 5-minute setup guide |
| **[SETUP.md](SETUP.md)** | 🔧 Detailed setup, Docker, troubleshooting |
| **[FEATURES.md](FEATURES.md)** | 📡 Platform workflows, API reference, code examples |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | 🤝 How to contribute, code style, PR guidelines |
| **[BUILD_SUMMARY.md](BUILD_SUMMARY.md)** | ✅ What was built, architecture, quality checklist |
| **[FILE_GUIDE.md](FILE_GUIDE.md)** | 📋 This file! Navigation reference |

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| **package.json** (root) | Root scripts, meta dependencies |
| **.gitignore** | Git ignore patterns |
| **docker-compose.yml** | Docker Compose config (MongoDB + Backend) |

---

## 🖥️ Backend Files (`server/`)

### Configuration & Main
| File | Purpose |
|------|---------|
| **server/index.js** | Express app entry point, route mounting |
| **server/package.json** | Backend dependencies & scripts |
| **server/.env.example** | Environment variable template |
| **server/Dockerfile** | Docker image for backend |
| **server/jest.config.js** | Jest testing configuration |

### Database
| File | Purpose |
|------|---------|
| **server/config/db.js** | MongoDB connection logic |

### Data Models
| File | Purpose |
|------|---------|
| **server/models/User.js** | User schema (student, business, admin) |
| **server/models/Project.js** | Project schema (with status tracking) |
| **server/models/Review.js** | Review schema (optional ratings) |

### Business Logic
| File | Purpose |
|------|---------|
| **server/controllers/authController.js** | Register & login logic |
| **server/controllers/projectController.js** | Project CRUD & assignment logic |
| **server/controllers/adminController.js** | User & project management (admin) |

### Security & Routing
| File | Purpose |
|------|---------|
| **server/middleware/authMiddleware.js** | JWT verification, token extraction |
| **server/middleware/roleMiddleware.js** | Role-based access control (RBAC) |
| **server/routes/authRoutes.js** | `/api/auth/*` endpoints |
| **server/routes/projectRoutes.js** | `/api/projects/*` endpoints |
| **server/routes/adminRoutes.js** | `/api/admin/*` endpoints |

### Testing
| File | Purpose |
|------|---------|
| **server/tests/auth.test.js** | Example Jest tests for auth |

---

## ⚛️ Frontend Files (`client/`)

### Main App Structure
| File | Purpose |
|------|---------|
| **client/src/index.js** | React entry point |
| **client/src/App.js** | Main router & page components |
| **client/src/index.css** | Tailwind CSS imports |
| **client/package.json** | Frontend dependencies |

### API & Configuration
| File | Purpose |
|------|---------|
| **client/src/api.js** | Axios client with interceptors |
| **client/.env** | Frontend environment variables |

### Components
| File | Purpose |
|------|---------|
| **client/src/components/Header.js** | Navigation header with logout |
| **client/src/components/ProtectedRoute.js** | Route guard (auth + role check) |

### Pages & Dashboards
| File | Purpose |
|------|---------|
| **client/src/views/StudentDashboard.js** | Student project view & submission |
| **client/src/views/BusinessDashboard.js** | Business project creation & monitoring |
| **client/src/views/AdminDashboard.js** | Admin user & project management |

### Configuration
| File | Purpose |
|------|---------|
| **client/package.json** | React dependencies & scripts |
| **client/tailwind.config.js** | Tailwind CSS configuration |
| **client/postcss.config.js** | PostCSS configuration for Tailwind |

---

## 📚 Documentation Structure

```
Start here: README.md
     ↓
Quick setup: QUICKSTART.md
     ↓
Detailed setup: SETUP.md
     ↓
Features & API: FEATURES.md
     ↓
Code style & contributing: CONTRIBUTING.md
     ↓
Project completion: BUILD_SUMMARY.md
```

---

## 🚀 How to Navigate by Task

### Setting Up Locally
→ [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md)

### Understanding Platform Features
→ [FEATURES.md](FEATURES.md)

### Finding API Documentation
→ [FEATURES.md](FEATURES.md) → API Reference section

### Adding a New Feature
→ [CONTRIBUTING.md](CONTRIBUTING.md)

### Debugging Issues
→ [SETUP.md](SETUP.md) → Troubleshooting section

### Writing Tests
→ [CONTRIBUTING.md](CONTRIBUTING.md) → Testing section

### Deploying to Production
→ [SETUP.md](SETUP.md) → Deployment section

---

## 💾 Project Statistics

| Metric | Value |
|--------|-------|
| Total Files | ~30 |
| Backend Routes | 10+ |
| Frontend Pages | 7 |
| API Endpoints | 10+ |
| Data Models | 3 |
| Middleware | 2 |
| Controllers | 3 |
| Documentation Pages | 7 |
| Code Comments | Extensive |

---

## 📦 Key Dependencies

### Backend
- **express** — Web framework
- **mongoose** — MongoDB ODM
- **jsonwebtoken** — JWT auth
- **bcrypt** — Password hashing
- **cors** — CORS handling
- **morgan** — HTTP logging

### Frontend
- **react** — UI library
- **react-router-dom** — Routing
- **axios** — HTTP client
- **tailwindcss** — CSS framework

### DevOps
- **docker** — Containerization
- **docker-compose** — Multi-container orchestration

---

## 🔍 Quick Command Reference

### Backend
```bash
cd server
npm install          # Install deps
npm run dev          # Start with hot reload
npm test             # Run tests
npm start            # Production start
```

### Frontend
```bash
cd client
npm install          # Install deps
npm start            # Start dev server
npm test             # Run tests
npm run build        # Production build
```

### Full Stack
```bash
npm run dev          # Both server + client
docker-compose up    # Docker start
```

---

## 🎓 Learning Paths

### For Backend Developers
1. **server/index.js** — Understand Express setup
2. **server/routes/*.js** — Review API structure
3. **server/controllers/*.js** — Study business logic
4. **server/middleware/*.js** — Learn auth flow
5. **server/models/*.js** — Review data schemas

### For Frontend Developers
1. **client/src/App.js** — Understand routing
2. **client/src/api.js** — Review API client
3. **client/src/components/ProtectedRoute.js** — Learn route guards
4. **client/src/views/*.js** — Study page logic

### For DevOps
1. **docker-compose.yml** — Service configuration
2. **Dockerfile** — Backend containerization
3. **SETUP.md** → Deployment section

---

## 🆘 Troubleshooting Reference

| Problem | File to Check |
|---------|:-------------:|
| Module not found | `package.json` |
| API 404 | `server/routes/*.js` |
| Auth not working | `server/middleware/authMiddleware.js` |
| Can't access admin | `server/middleware/roleMiddleware.js` |
| Database error | `server/config/db.js` & `.env` |
| CORS issues | `server/index.js` |
| Component not rendering | `client/src/App.js` |
| API call failing | `client/src/api.js` |

---

## 📞 Support

- **Questions about setup?** → [SETUP.md](SETUP.md)
- **Questions about features?** → [FEATURES.md](FEATURES.md)
- **Want to contribute?** → [CONTRIBUTING.md](CONTRIBUTING.md)
- **General info?** → [README.md](README.md)

---

**Happy exploring! 🔥**
