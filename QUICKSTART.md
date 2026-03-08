# 🚀 SkillForge Quick Start (5 Minutes)

## Prerequisites
- Node.js 16+
- Docker & Docker Compose (optional, but recommended)

---

## Option 1: Docker (Simplest)

```bash
# Clone & enter repo
git clone https://github.com/your-username/skillforge.git
cd skillforge

# Start everything
docker-compose up

# In another terminal, start frontend
cd client && npm install && npm start
```

**Done!** 🎉

- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

---

## Option 2: Local Setup

### Step 1: Backend

```bash
cd server
cp .env.example .env

# Edit .env with your MongoDB URI
npm install
npm run dev
```

### Step 2: Frontend (New Terminal)

```bash
cd client
npm install
npm start
```

---

## 🧪 Test the Platform

### 1. Register a Student
- Go to http://localhost:3000/register
- Email: `student1@example.com`
- Password: `password123`
- Role: `Student`
- Click Register → Login

### 2. Register a Business
- New incognito window
- Register with:
  - Email: `business1@example.com`
  - Password: `password123`
  - Role: `Business`
- Login

### 3. Business: Create Project
- Click "Dashboard"
- Click "New Project"
- Fill in:
  - Title: "Design a Logo"
  - Description: "I need a professional logo for my startup"
  - Category: "Graphic Design"
  - Budget: 200
- Submit

### 4. Admin: Assign Student
- Need to manually create admin or use MongoDB compass
- For now, skip (or modify `.env` to create demo data)

### 5. Student: View Project
- Student logs in, goes to dashboard
- See assigned projects
- Click "Submit Deliverable"
- Paste submission link
- Submit!

---

## 📁 File Structure

```
skillForge/
├── server/           # Express API
├── client/           # React frontend
├── docker-compose.yml
├── README.md         # Full docs
├── SETUP.md          # Detailed setup
├── FEATURES.md       # Platform features
└── CONTRIBUTING.md   # How to contribute
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | `npm install` in affected folder |
| MongoDB connection error | Run `docker-compose up` or ensure MongoDB is running |
| Port already in use | Check .env PORT value, or kill process: `lsof -ti:5000 \| xargs kill -9` |
| Token not working | Clear localStorage in browser dev tools |

---

## 📖 Next Steps

1. **Read** [README.md](README.md) for full documentation
2. **Explore** [FEATURES.md](FEATURES.md) to understand the platform
3. **Check** [SETUP.md](SETUP.md) for advanced configuration
4. **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 💡 Sample API Calls

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Projects (with token)
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com/)
- [React Hooks](https://react.dev/reference/react)
- [MongoDB Basics](https://docs.mongodb.com/manual/introduction/)
- [JWT.io](https://jwt.io)

---

## 🤝 Need Help?

- **Questions?** Open a GitHub Discussion
- **Found a bug?** Create an Issue
- **Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Happy coding! 🔥**
