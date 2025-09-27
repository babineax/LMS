const express = require("express");
const router = express.Router();
const { createAssignment, submitAssignment, gradeSubmission } = require("../controllers/assignment.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Teacher: Create assignment
router.post("/create", authMiddleware, createAssignment);

// Student: Submit assignment
router.post("/submit", authMiddleware, submitAssignment);

// Teacher: Grade submission
router.post("/grade", authMiddleware, gradeSubmission);

module.exports = router;
