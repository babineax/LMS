import { api } from "./api";

export const createAssignment = async (
  token: string,
  assignment: {
    course_id: string;
    title: string;
    description: string;
    deadline: string;
    attachment_url?: string;
  }
) => {
  try {
    const res = await api.post("/assignments", assignment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to create assignment");
  }
};


export const getSubmissions = async (token: string, courseId: string | null) => {
  if (!courseId) throw new Error("Course ID is required");

  const response = await api.get(`/courses/${courseId}/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // should include assignment info + submissions
};

export const gradeSubmission = async (
  token: string | null,
  submission_id: string,
  grade: number,
  feedback: string
) => {
  try {
    const response = await api.post(
      "/submissions/grade",
      { submission_id, grade, feedback },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to grade submission");
  }
};
