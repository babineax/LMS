const supabase = require('../utils/supabaseClient');

// Upload metadata after file is uploaded to storage
exports.createContent = async (req, res) => {
  try {
    const { course_id, storage_path, file_type } = req.body;

    if (!course_id || !storage_path || !file_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('content')
      .insert([{ course_id, storage_path, file_type }])
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, content: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List course content (students & teachers)
exports.getCourseContent = async (req, res) => {
  try {
    const { course_id } = req.params;

    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('course_id', course_id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ content: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
