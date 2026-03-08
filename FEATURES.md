# SkillForge Platform Features & Workflows

## 🎓 Student Workflow

### 1. Registration
- Register with email/password
- Account automatically set to `role: student`
- Password hashed with bcrypt (10 rounds)

### 2. Dashboard
- View all assigned projects
- See project details: title, description, category, budget, status
- Filter by status: Pending, Assigned, Submitted, Completed

### 3. Project Submission
- Navigate to assigned project
- Click "Submit Deliverable"
- Provide submission link (GitHub, Google Drive, etc.)
- Status transitions: `Assigned` → `Submitted`

### 4. Performance Tracking (Future)
- View your rating based on completed projects
- Track earnings per project
- Build portfolio from completed work

---

## 💼 Business Workflow

### 1. Registration
- Register with email/password
- Account type: `role: business`
- Can optionally add company name

### 2. Create Project
- Navigate to "New Project" button
- Fill in:
  - **Title** (required)
  - **Description** (required)
  - **Category** (Graphic Design, Web Dev, Video Editing, CAD, Content Writing, AI Data Cleaning, Social Media)
  - **Budget** (optional numeric value)
- Submit → Status: `Pending` (waiting for admin approval)

### 3. Dashboard
- View all your submitted projects
- See real-time status updates:
  - `Pending` - awaiting admin review
  - `Assigned` - admin assigned a student
  - `Submitted` - student provided deliverable
  - `Completed` - admin marked completion

### 4. Approve Completion
- Receive notification when student submits
- Review submission link
- Approve or request revision (manual process)

---

## 🛡️ Admin Workflow

### 1. Registration
- Only manual admin registration (security best practice)
- Account: `role: admin`
- Email: typically `admin@skillforge.app`

### 2. User Management Dashboard
- **View All Users**
  - List of students, businesses, and admins
  - Filter by role
  - View email, join date, status
  
- **Delete User**
  - Remove user and cascade-delete their projects
  - Useful for removing spam/inactive accounts

### 3. Project Management
- **View All Projects**
  - List every project on platform
  - Filter by status
  - See business owner, assigned student, budget

- **Assign Student to Project**
  - Select pending project
  - Choose student from verified list
  - Status transitions: `Pending` → `Assigned`
  - Student receives notification

### 4. Project Status Updates
- **Approve Completion**
  - Review student submission
  - Move status: `Submitted` → `Completed`
  - Send completion notification to business

- **Reject/Revision**
  - Request student resubmit (manual coord.)
  - Keep status as `Submitted` until approved

### 5. Platform Monitoring
- Track total projects, users, completion rate
- Monitor for disputes
- Approve/remove flagged users

---

## 🔐 Authentication & Security

### JWT Token Flow
1. **Register/Login** → User receives JWT token
2. Token stored in `localStorage`
3. Token automatically attached to all API requests via axios interceptor
4. Token includes: `userId`, `role`, `expiresIn: 7d`
5. Expired token → auto-redirect to login

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Password never stored plain text
- On login, password compared against hash

### Role-Based Access Control (RBAC)
- Protected routes check token + role
- Students can only see/edit their own projects
- Businesses can only see/edit their own projects
- Only admins can access `/api/admin/*`

---

## 📡 API Reference

### Authentication Endpoints

**POST `/api/auth/register`**
```json
Request: {
  "email": "student@example.com",
  "password": "securepass123",
  "role": "student" | "business"
}
Response: {
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "student@example.com",
    "role": "student"
  }
}
```

**POST `/api/auth/login`**
```json
Request: {
  "email": "student@example.com",
  "password": "securepass123"
}
Response: {
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "student@example.com",
    "role": "student"
  }
}
```

### Project Endpoints

**GET `/api/projects`** (Authenticated)
- Students see only assigned projects
- Businesses see only their submitted projects
- Returns array of projects

```json
Response: [
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Website Design",
    "description": "Design a landing page",
    "category": "Small Website Development",
    "budget": 500,
    "status": "Assigned",
    "businessId": "507f1f77bcf86cd799439009",
    "assignedStudentId": "507f1f77bcf86cd799439010",
    "submissionLink": null,
    "createdAt": "2026-03-02T10:00:00Z",
    "updatedAt": "2026-03-02T10:30:00Z"
  }
]
```

**POST `/api/projects`** (Business only)
```json
Request: {
  "title": "Website Design",
  "description": "Create a landing page",
  "category": "Small Website Development",
  "budget": 500
}
Response: {
  "_id": "507f1f77bcf86cd799439012",
  "title": "Website Design",
  ...
  "status": "Pending",
  "businessId": "507f1f77bcf86cd799439009"
}
```

**POST `/api/projects/:id/assign`** (Admin only)
```json
Request: {
  "studentId": "507f1f77bcf86cd799439010"
}
Response: {
  ...project,
  "status": "Assigned",
  "assignedStudentId": "507f1f77bcf86cd799439010"
}
```

**POST `/api/projects/:id/submit`** (Student, must be assigned)
```json
Request: {
  "submissionLink": "https://github.com/user/project"
}
Response: {
  ...project,
  "status": "Submitted",
  "submissionLink": "https://github.com/user/project"
}
```

**PATCH `/api/projects/:id`** (Admin only)
```json
Request: {
  "status": "Completed"
}
Response: {
  ...project,
  "status": "Completed"
}
```

### Admin Endpoints

**GET `/api/admin/users`** (Admin only)
- Returns all users without passwords

**DELETE `/api/admin/users/:id`** (Admin only)
- Removes user and related projects

**GET `/api/admin/projects`** (Admin only)
- Returns all platform projects

---

## 🚀 Deployment Checklist

- [ ] Set strong `JWT_SECRET` (not `dev-secret`)
- [ ] Set `NODE_ENV=production`
- [ ] Use managed MongoDB (MongoDB Atlas, etc.)
- [ ] Enable HTTPS
- [ ] Set CORS to production domain
- [ ] Set up logging/monitoring (Sentry, etc.)
- [ ] Create backup strategy
- [ ] Set up automated tests in CI/CD
- [ ] Rate limit auth endpoints

---

## 🔮 Future Enhancements

### Phase 2 Features
- **Escrow Payments**: Stripe Connect for secure payment transfers
- **Rating System**: Students & businesses rate each other
- **Portfolio Auto-Generation**: Auto-create student portfolio from completed projects
- **Notifications**: Email/in-app alerts for events
- **Skills Verification**: Admin can verify student skills via test/portfolio
- **Review System**: Leave detailed reviews after project completion
- **Dispute Resolution**: Mediation process for conflicts

### Phase 3 Expansion
- **Multi-City Support**: Projects organized by geographic region
- **AI Skill Matching**: Auto-recommend students for projects based on skills
- **Leaderboards**: Top students by earnings/ratings
- **Integrations**: Slack, Discord bots for notifications
- **Analytics**: Platform dashboards for insights

---

## 📞 Support & Troubleshooting

### Common Issues

**1. Token Expired**
- Clear localStorage and login again
- Token auto-refreshes on login

**2. Can't See Projects**
- Ensure logged in (check localStorage for token)
- Verify role-based filtering working

**3. Students Can't Submit**
- Project must be in `Assigned` status
- Must be assigned student

**4. Admin Can't Assign**
- Project must be in `Pending` status
- Student must exist and have proper role

---

## 📝 Code Examples

### Frontend: Submitting a Project (Student)

```javascript
import api from '../api';
import { useState } from 'react';

export function SubmitProject({ projectId }) {
  const [link, setLink] = useState('');

  async function submit() {
    try {
      const res = await api.post(`/projects/${projectId}/submit`, {
        submissionLink: link,
      });
      alert('Project submitted!');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message);
    }
  }

  return (
    <div>
      <input
        placeholder="Submission link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
```

### Backend: Assigning a Student (Admin)

```javascript
const Project = require('../models/Project');

exports.assignStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.status !== 'Pending') {
      return res.status(400).json({ message: 'Cannot assign non-pending' });
    }

    project.assignedStudentId = studentId;
    project.status = 'Assigned';
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
```
