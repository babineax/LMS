// backend/routes/notifications.js
const express = require("express");
const r = express.Router();
const ctrl = require("../controllers/notifications.controller");

r.post("/assignment/:assignmentId/notify", ctrl.notifyAssignmentPosted);
r.post("/submission/:submissionId/confirm", ctrl.notifySubmissionConfirmation);
r.post("/submission/:submissionId/graded", ctrl.notifyGraded);

module.exports = r;
