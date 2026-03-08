const express = require('express');
const router = express.Router();
const { createProject, getProjects, assignProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/projects
// @desc    Create a new project (Client only)
router.post('/', protect, createProject);

// @route   GET /api/projects
// @desc    Get all active projects
router.get('/', protect, getProjects);

// @route   POST /api/projects/:id/assign
// @desc    Accept a project (Worker only)
router.post('/:id/assign', protect, assignProject);

module.exports = router;
