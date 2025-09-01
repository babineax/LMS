// backend/controllers/reports.controller.js
const supabase = require("../utils/supabaseClient");

// Student performance (uses RPC)
exports.studentReport = async (req, res) => {
  try {
    const studentId = req.params.studentId || req.userId; // allow admin pass param
    const { data, error } = await supabase.rpc("student_performance_report", {
      student_id: studentId,
    });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (e) {
    console.error("studentReport:", e);
    res.status(500).json({ error: e.message });
  }
};

// Course performance (uses RPC)
exports.courseReport = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { data, error } = await supabase.rpc("course_performance_report", {
      course_id: courseId,
    });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (e) {
    console.error("courseReport:", e);
    res.status(500).json({ error: e.message });
  }
};

// Attendance report (uses RPC)
exports.attendanceReport = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { data, error } = await supabase.rpc("attendance_report", {
      course_id: courseId,
    });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (e) {
    console.error("attendanceReport:", e);
    res.status(500).json({ error: e.message });
  }
};

// CSV export (student|course|attendance)
function toCSV(rows) {
  if (!rows || !rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v) => {
    if (v == null) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
}

exports.exportCSV = async (req, res) => {
  try {
    const { type } = req.query;
    let rows = [];

    if (type === "student") {
      const studentId = req.params.studentId || req.userId;
      const { data, error } = await supabase.rpc("student_performance_report", {
        student_id: studentId,
      });
      if (error) throw error;
      rows = data || [];
    } else if (type === "course") {
      const { courseId } = req.params;
      const { data, error } = await supabase.rpc("course_performance_report", {
        course_id: courseId,
      });
      if (error) throw error;
      rows = data || [];
    } else if (type === "attendance") {
      const { courseId } = req.params;
      const { data, error } = await supabase.rpc("attendance_report", {
        course_id: courseId,
      });
      if (error) throw error;
      rows = data || [];
    } else {
      return res.status(400).json({ error: "Unknown export type" });
    }

    const csv = toCSV(rows);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${type}-report.csv"`
    );
    res.send(csv);
  } catch (e) {
    console.error("exportCSV:", e);
    res.status(500).json({ error: e.message });
  }
};
