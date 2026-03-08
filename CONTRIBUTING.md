# Contributing to SkillForge

We welcome contributions from developers, designers, and product folks! Here's how to get started.

---

## 🎯 Before You Start

1. **Read** [README.md](README.md) for project overview
2. **Read** [FEATURES.md](FEATURES.md) for platform capabilities
3. **Read** [SETUP.md](SETUP.md) for local development
4. **Join** GitHub Discussions or comment on issues for context

---

## 🔧 Local Development Setup

```bash
# Clone fork
git clone https://github.com/YOUR_USERNAME/skillforge.git
cd skillforge

# Create feature branch
git checkout -b feature/your-feature-name

# Backend setup
cd server
cp .env.example .env
npm install

# Frontend setup (new terminal)
cd client
npm install

# Run both (Docker recommended)
docker-compose up  # or run npm run dev / npm start separately
```

---

## 📝 Code Style Guide

### General
- Use **async/await** for async operations
- Write clean, comments for non-obvious logic
- No hardcoded secrets or API keys in code
- Use environment variables instead

### Backend (Node.js/Express)
```javascript
// ✅ Good
const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ❌ Bad
function getProjects(req, res) {
  Project.find({}, (err, data) => {
    if (err) res.send('ERROR');
    else res.send(data);
  });
}
```

### Frontend (React)
```javascript
// ✅ Good
function ProjectCard({ project }) {
  return (
    <div className="border p-4">
      <h3 className="font-bold">{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}

// ❌ Bad - using outdated ref, not reusable
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
  }
  render() {
    return <div>{this.state.projects.map((p) => <div>{p.title}</div>)}</div>;
  }
}
```

---

## 🧪 Testing Requirements

### For Backend Changes
```bash
cd server
npm test
```

All new endpoints must have basic test coverage.

### For Frontend Changes
```bash
cd client
npm test
```

Components should have at least basic snapshot tests.

---

## 📋 Commit Message Format

```
[type](scope): subject

- type: feat, fix, docs, style, refactor, test, chore
- scope: auth, projects, admin, frontend, backend
- subject: present tense, lowercase, no period

Examples:
feat(auth): add password reset flow
fix(projects): correct status transition validation
docs(setup): add Docker troubleshooting section
```

---

## 🚀 PR Guidelines

1. **Branch naming**: `feature/short-description` or `fix/issue-name`
2. **One feature per PR** - keep PRs focused
3. **Update relevant docs** - README, FEATURES, SETUP if applicable
4. **Test locally** - both backend and frontend
5. **Link issue** - reference issue number if closing
6. **Describe changes** - explain what and why

### PR Template
```markdown
## What does this PR do?
Brief description of changes.

## How to test?
1. Step 1
2. Step 2

## Screenshots (if UI changes)
- Before/After

## Checklist
- [ ] Code follows style guide
- [ ] Tests added/pass
- [ ] Docs updated
- [ ] No breaking changes
```

---

## 🎨 Feature Development Workflow

### Adding a New Feature

1. **Create issue** describing feature + acceptance criteria
2. **Discuss** in issue comments before coding
3. **Development**:
   - Backend first (models → routes → controllers)
   - Frontend second (components → pages → integration)
4. **Test thoroughly**:
   - Unit tests for logic
   - Integration tests for workflows
   - Manual QA (all browsers/roles)
5. **Documentation** update (README, FEATURES, SETUP)
6. **Submit PR** with clear description

### Example: Adding a Review System

**Issue Description:**
```
Students and businesses should be able to rate/review each other after project completion.

Acceptance Criteria:
- [ ] Review model created (rating 1-5, comment)
- [ ] POST /api/projects/:id/review (authenticated)
- [ ] GET /api/projects/:id/reviews
- [ ] Frontend review form on completed projects
- [ ] Display reviews on user profile
```

**PR Checklist:**
- Backend: Review controller + routes + model
- Frontend: ReviewForm component + review display
- Tests: CRUD operations for reviews
- Docs: API docs updated

---

## 🐛 Reporting Issues

Use GitHub Issues with:
- **Detailed description** of problem
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment** (OS, browser, Node version)
- **Screenshots/logs** if applicable

Template:
```markdown
**Describe the bug**
[What goes wrong?]

**To Reproduce**
1. Go to...
2. Click...
3. See error...

**Expected Behavior**
[What should happen?]

**Screenshots**
[If UI-related]

**Environment**
- OS: [e.g., Windows 10, macOS]
- Browser: [e.g., Chrome, Firefox]
- Node.js: 16.x
- MongoDB: 4.4
```

---

## ✅ Review Process

### All PRs require:
1. **Code review** - at least 1 approval
2. **Tests pass** - CI/CD green
3. **No conflicts** - with main branch
4. **Documentation** - updated if needed

### Reviewer Checklist
- [ ] Code quality (clean, no duplication)
- [ ] Security (no env leaks, proper validation)
- [ ] Performance (no N+1 queries, reasonable complexity)
- [ ] Tests (adequate coverage)
- [ ] Docs (clear and accurate)

---

## 📚 Useful Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **JWT Explained**: https://jwt.io
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🤔 Common Questions

### Q: How do I bump a minor feature?
A: Create an issue first. We'll review scope and decide if it fits the roadmap.

### Q: Can I add external dependencies?
A: Discuss in issue first. Keep dependencies minimal and well-maintained.

### Q: How do I report security issues?
A: **Do NOT open public issue.** Email security@skillforge.me (or maintainer) with details.

### Q: What if I'm stuck?
A: Ask in GitHub Discussions or comment on the issue. Community is here to help!

---

## 🎓 Architecture Decisions

### Why MongoDB + Express?
- MongoDB: flexible schema, good for rapid iteration
- Express: lightweight, modular, perfect for this project

### Why React + Tailwind?
- React: component-based, reusable UI
- Tailwind: utility-first CSS, fast prototyping

### Why JWT over Sessions?
- Stateless auth scales better
- Easier for future mobile app/API access
- No server-side session storage needed

---

## 🌟 Recognition

Contributors are featured in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md) (you!)
- GitHub "Contributors" tab
- Kudos in release notes

---

## 🚫 Code of Conduct

- Be respectful and inclusive
- No harassment, discrimination, or hate speech
- Assume good intent, communicate clearly
- Report violations to maintainers

---

## 📞 Questions?

- **GitHub Issues**: For feature requests & bugs
- **GitHub Discussions**: For questions & ideas
- **Email**: maintainer email (if applicable)

---

**Thank you for contributing to SkillForge! 🙌**
