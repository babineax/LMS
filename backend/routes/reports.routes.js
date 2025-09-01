// backend/routes/reports.js
const express = require("express");
const r = express.Router();
const ctrl = require("../controllers/reports.controller");

// Assumes auth middleware sets req.userId and role
r.get("/student", ctrl.studentReport); // self
r.get("/student/:studentId", ctrl.studentReport); // admin view
r.get("/course/:courseId", ctrl.courseReport);
r.get("/attendance/:courseId", ctrl.attendanceReport);

// CSV exports
r.get("/export/student", ctrl.exportCSV);
r.get("/export/student/:studentId", ctrl.exportCSV);
r.get("/export/course/:courseId", ctrl.exportCSV);
r.get("/export/attendance/:courseId", ctrl.exportCSV);

module.exports = r;
