const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// all admin routes need auth and admin role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/users', adminController.listUsers);
router.delete('/users/:id', adminController.deleteUser);
router.get('/projects', adminController.listProjects);

module.exports = router;