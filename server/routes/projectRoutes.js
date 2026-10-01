const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

/**
 * Project Routes
 */
router.get('/', projectController.getAllProjects);
router.get('/user/:userId', projectController.getProjectsByUser);
router.get('/:id', projectController.getProject);

// Protected routes
router.post('/add', protect, projectController.addProject);
router.get('/my', protect, projectController.getMyProjects);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
