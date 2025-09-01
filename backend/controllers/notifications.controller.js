// backend/controllers/notifications.controller.js
const supabase = require("../utils/supabaseClient");
const { sendEmail } = require("../utils/emailClient");

// helper: fetch course students' emails
async function getCourseStudentEmails(courseId) {
  // Adjust according to your enrollment model. Here we use fees for enrollment.
  const { data, error } = await supabase
    .from("fees")
    .select("student_id, students:student_id(email, full_name)")
    .eq("course_id", courseId);
  if (error) throw error;

  const emails = (data || []).map((r) => r.students?.email).filter(Boolean);
  return Array.from(new Set(emails));
}

// 1) New assignment posted -> notify students
exports.notifyAssignmentPosted = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { data: assignment, error: aErr } = await supabase
      .from("assignments")
      .select(
        "id, title, description, due_date, course_id, courses:course_id(title)"
      )
      .eq("id", assignmentId)
      .single();
    if (aErr || !assignment)
      return res.status(404).json({ error: "Assignment not found" });

    const emails = await getCourseStudentEmails(assignment.course_id);
    const subject = `New assignment in ${
      assignment.courses?.title || "your course"
    }: ${assignment.title}`;
    const html = `<h3>${assignment.title}</h3>
      <p>${assignment.description || ""}</p>
      <p><b>Due:</b> ${assignment.due_date || "TBA"}</p>`;

    await Promise.allSettled(
      emails.map((to) => sendEmail({ to, subject, html }))
    );

    res.json({ sent: emails.length });
  } catch (e) {
    console.error("notifyAssignmentPosted:", e);
    res.status(500).json({ error: e.message });
  }
};

// 2) Student submitted -> confirmation to student
exports.notifySubmissionConfirmation = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { data: sub, error: sErr } = await supabase
      .from("submissions")
      .select(
        "id, student_id, assignment_id, students:student_id(email, full_name), assignments:assignment_id(title)"
      )
      .eq("id", submissionId)
      .single();
    if (sErr || !sub)
      return res.status(404).json({ error: "Submission not found" });

    const to = sub.students?.email;
    if (!to) return res.status(400).json({ error: "Student email missing" });

    const subject = `Submission received: ${
      sub.assignments?.title || "Assignment"
    }`;
    const html = `<p>Hi ${sub.students?.full_name || "student"},</p>
      <p>Your submission has been received.</p>`;

    await sendEmail({ to, subject, html });
    res.json({ ok: true });
  } catch (e) {
    console.error("notifySubmissionConfirmation:", e);
    res.status(500).json({ error: e.message });
  }
};

// 3) Teacher graded -> notify student
exports.notifyGraded = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { data: sub, error: sErr } = await supabase
      .from("submissions")
      .select(
        "id, grade, feedback, student_id, assignment_id, students:student_id(email, full_name), assignments:assignment_id(title)"
      )
      .eq("id", submissionId)
      .single();
    if (sErr || !sub)
      return res.status(404).json({ error: "Submission not found" });

    const to = sub.students?.email;
    if (!to) return res.status(400).json({ error: "Student email missing" });

    const subject = `Graded: ${sub.assignments?.title || "Assignment"}`;
    const html = `<p>Hi ${sub.students?.full_name || "student"},</p>
      <p>Your assignment has been graded.</p>
      <p><b>Grade:</b> ${sub.grade ?? "N/A"}</p>
      <p><b>Feedback:</b> ${sub.feedback ?? "—"}</p>`;

    await sendEmail({ to, subject, html });
    res.json({ ok: true });
  } catch (e) {
    console.error("notifyGraded:", e);
    res.status(500).json({ error: e.message });
  }
};
