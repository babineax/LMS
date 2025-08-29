const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');
const { verifyToken, isTeacherOrAdmin } = require('../middleware/authRole');

// Upload metadata (teachers/admins only)
router.post('/', verifyToken, isTeacherOrAdmin, contentController.createContent);

// Get content for a course
router.get('/:course_id', verifyToken, contentController.getCourseContent);

module.exports = router;
