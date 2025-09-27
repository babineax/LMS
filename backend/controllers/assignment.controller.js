const supabase = require("../utils/supabaseClient");

// === Teacher creates assignment ===
exports.createAssignment = async (req, res) => {
  try {
    const { course_id, title, description, deadline, attachment_url } = req.body;
    const teacher_id = req.user.id; // comes from auth middleware

    const { data, error } = await supabase
      .from("assignments")
      .insert([{ course_id, teacher_id, title, description, deadline, attachment_url }])
      .select("*")
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// === Student submits assignment ===
exports.submitAssignment = async (req, res) => {
  try {
    const { assignment_id, file_url } = req.body;
    const student_id = req.user.id;

    const { data, error } = await supabase
      .from("assignment_submissions")
      .insert([{ student_id, assignment_id, file_url }])
      .select("*")
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// === Teacher grades submission ===
exports.gradeSubmission = async (req, res) => {
  try {
    const { submission_id, grade, feedback } = req.body;

    const { error } = await supabase.rpc("grade_submission", {
      p_submission_id: submission_id,
      p_grade: grade,
      p_feedback: feedback
    });

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
