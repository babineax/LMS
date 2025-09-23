export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      assignment_submissions: {
        Row: {
          assignment_id: string
          created_at: string
          feedback: string | null
          file_url: string
          grade: number | null
          status: string
          student_id: string
          submission_id: string
          updated_at: string
        }
        Insert: {
          assignment_id: string
          created_at?: string
          feedback?: string | null
          file_url: string
          grade?: number | null
          status?: string
          student_id: string
          submission_id?: string
          updated_at?: string
        }
        Update: {
          assignment_id?: string
          created_at?: string
          feedback?: string | null
          file_url?: string
          grade?: number | null
          status?: string
          student_id?: string
          submission_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          course_id: string | null
          created_at: string | null
          date: string | null
          id: string
          login_date: string
          marked_by: string | null
          session_end: string | null
          session_start: string | null
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          login_date: string
          marked_by?: string | null
          session_end?: string | null
          session_start?: string | null
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          login_date?: string
          marked_by?: string | null
          session_end?: string | null
          session_start?: string | null
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_marked_by_fkey"
            columns: ["marked_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string | null
          available_quantity: number
          borrower_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          institution_id: string | null
          isbn: string | null
          status: string | null
          title: string
          total_quantity: number
        }
        Insert: {
          author?: string | null
          available_quantity?: number
          borrower_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          institution_id?: string | null
          isbn?: string | null
          status?: string | null
          title: string
          total_quantity?: number
        }
        Update: {
          author?: string | null
          available_quantity?: number
          borrower_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          institution_id?: string | null
          isbn?: string | null
          status?: string | null
          title?: string
          total_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "books_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      borrowed_books: {
        Row: {
          book_id: string
          borrowed_at: string | null
          created_at: string | null
          due_date: string | null
          id: string
          institution_id: string | null
          returned_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          book_id: string
          borrowed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          institution_id?: string | null
          returned_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          book_id?: string
          borrowed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          institution_id?: string | null
          returned_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "borrowed_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "borrowed_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "overdue_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "borrowed_books_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "borrowed_books_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      config: {
        Row: {
          active: boolean
          created_at: string
          default_borrow_limit: number
          effective_from: string
          id: string
          min_fee_percent_for_borrow: number
          min_fee_percent_for_enroll: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          default_borrow_limit?: number
          effective_from?: string
          id?: string
          min_fee_percent_for_borrow?: number
          min_fee_percent_for_enroll?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          default_borrow_limit?: number
          effective_from?: string
          id?: string
          min_fee_percent_for_borrow?: number
          min_fee_percent_for_enroll?: number
          updated_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          course_id: string | null
          created_at: string | null
          file_type: string | null
          file_url: string
          id: string
          uploader_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          uploader_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          uploader_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          duration: number
          enrolled_count: number
          fee_amount: number | null
          id: string
          image_url: string | null
          institution_id: string | null
          max_capacity: number
          quorum: number | null
          teacher_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration: number
          enrolled_count?: number
          fee_amount?: number | null
          id?: string
          image_url?: string | null
          institution_id?: string | null
          max_capacity: number
          quorum?: number | null
          teacher_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number
          enrolled_count?: number
          fee_amount?: number | null
          id?: string
          image_url?: string | null
          institution_id?: string | null
          max_capacity?: number
          quorum?: number | null
          teacher_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment: {
        Row: {
          course_id: string | null
          course_title: string | null
          created_at: string
          id: string
          student_email: string | null
          student_id: string | null
          student_name: string | null
        }
        Insert: {
          course_id?: string | null
          course_title?: string | null
          created_at?: string
          id?: string
          student_email?: string | null
          student_id?: string | null
          student_name?: string | null
        }
        Update: {
          course_id?: string | null
          course_title?: string | null
          created_at?: string
          id?: string
          student_email?: string | null
          student_id?: string | null
          student_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      fees: {
        Row: {
          amount_paid: number
          course_id: string | null
          created_at: string
          currency: string
          id: string
          percent_paid: number | null
          student_id: string
          total_fee: number
          updated_at: string
        }
        Insert: {
          amount_paid?: number
          course_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          percent_paid?: number | null
          student_id: string
          total_fee: number
          updated_at?: string
        }
        Update: {
          amount_paid?: number
          course_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          percent_paid?: number | null
          student_id?: string
          total_fee?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fees_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          course_id: string | null
          created_at: string | null
          feedback: string | null
          graded_by: string | null
          id: string
          student_id: string | null
          total_grade: number | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          feedback?: string | null
          graded_by?: string | null
          id?: string
          student_id?: string | null
          total_grade?: number | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          feedback?: string | null
          graded_by?: string | null
          id?: string
          student_id?: string | null
          total_grade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_graded_by_fkey"
            columns: ["graded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string | null
          id: string
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          courses_created: number | null
          created_at: string
          department: string | null
          id: string
          institution_name: string
          joined: string | null
        }
        Insert: {
          courses_created?: number | null
          created_at?: string
          department?: string | null
          id?: string
          institution_name: string
          joined?: string | null
        }
        Update: {
          courses_created?: number | null
          created_at?: string
          department?: string | null
          id?: string
          institution_name?: string
          joined?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instructors_institution_name_fkey"
            columns: ["institution_name"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          course_id: string | null
          created_at: string | null
          duration: number | null
          id: string
          is_active: boolean | null
          scheduled_at: string | null
          title: string
          type: string | null
        }
        Insert: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          is_active?: boolean | null
          scheduled_at?: string | null
          title: string
          type?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          duration?: number | null
          id?: string
          is_active?: boolean | null
          scheduled_at?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      library_borrow_requests: {
        Row: {
          approved_by: string | null
          book_id: string
          borrower_id: string
          due_date: string | null
          request_id: string
          requested_at: string | null
          returned_at: string | null
          status: string
        }
        Insert: {
          approved_by?: string | null
          book_id: string
          borrower_id: string
          due_date?: string | null
          request_id?: string
          requested_at?: string | null
          returned_at?: string | null
          status?: string
        }
        Update: {
          approved_by?: string | null
          book_id?: string
          borrower_id?: string
          due_date?: string | null
          request_id?: string
          requested_at?: string | null
          returned_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "library_borrow_requests_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_borrow_requests_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "overdue_books"
            referencedColumns: ["id"]
          },
        ]
      }
      login_logs: {
        Row: {
          id: string
          logged_in_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          logged_in_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          logged_in_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          graded_at: string | null
          graded_by: string | null
          id: string
          quiz_id: string
          score: number | null
          status: Database["public"]["Enums"]["quiz_submission_status"] | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          quiz_id: string
          score?: number | null
          status?: Database["public"]["Enums"]["quiz_submission_status"] | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          quiz_id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["quiz_submission_status"] | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_submissions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string
          questions: Json
          status: Database["public"]["Enums"]["quiz_status"] | null
          title: string
          total_points: number
          type: Database["public"]["Enums"]["quiz_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          lesson_id: string
          questions: Json
          status?: Database["public"]["Enums"]["quiz_status"] | null
          title: string
          total_points: number
          type: Database["public"]["Enums"]["quiz_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string
          questions?: Json
          status?: Database["public"]["Enums"]["quiz_status"] | null
          title?: string
          total_points?: number
          type?: Database["public"]["Enums"]["quiz_type"]
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          assignment_id: string | null
          feedback: string | null
          file_url: string | null
          grade: number | null
          graded: boolean | null
          id: string
          student_id: string | null
          submitted_at: string | null
        }
        Insert: {
          assignment_id?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          graded?: boolean | null
          id?: string
          student_id?: string | null
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string | null
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          graded?: boolean | null
          id?: string
          student_id?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_payment: {
        Row: {
          amount_paid: number
          course_id: string | null
          created_at: string
          id: string
          lesson_count: number
          notes: string | null
          paid_at: string
          rate_per_lesson: number
          teacher_id: string
          updated_at: string
        }
        Insert: {
          amount_paid?: number
          course_id?: string | null
          created_at?: string
          id?: string
          lesson_count?: number
          notes?: string | null
          paid_at?: string
          rate_per_lesson?: number
          teacher_id: string
          updated_at?: string
        }
        Update: {
          amount_paid?: number
          course_id?: string | null
          created_at?: string
          id?: string
          lesson_count?: number
          notes?: string | null
          paid_at?: string
          rate_per_lesson?: number
          teacher_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_payment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          institution_id: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          institution_id?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          institution_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      attendance_summary: {
        Row: {
          course_id: string | null
          total_absent: number | null
          total_late: number | null
          total_present: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      overdue_books: {
        Row: {
          author: string | null
          borrower_id: string | null
          due_date: string | null
          id: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          borrower_id?: string | null
          due_date?: string | null
          id?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          borrower_id?: string | null
          due_date?: string | null
          id?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      approve_borrow: {
        Args: { due: string; request: string }
        Returns: undefined
      }
      attendance_report: {
        Args: { course_id: string }
        Returns: {
          absent_days: number
          attendance_percentage: number
          present_days: number
          student_id: string
          student_name: string
        }[]
      }
      course_performance_report: {
        Args: { course_id: string }
        Returns: {
          graded_avg: number
          pending_count: number
          student_id: string
          student_name: string
          submitted_count: number
        }[]
      }
      decline_borrow: {
        Args: { request: string }
        Returns: undefined
      }
      grade_submission: {
        Args: { p_feedback: string; p_grade: number; p_submission_id: string }
        Returns: undefined
      }
      is_librarian: {
        Args: { uid: string }
        Returns: boolean
      }
      log_user_login: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      mark_returned: {
        Args: { request: string }
        Returns: undefined
      }
      request_borrow: {
        Args: { book: string; due: string }
        Returns: string
      }
      student_performance_report: {
        Args: { student_id: string }
        Returns: {
          course_id: string
          course_title: string
          graded_avg: number
          last_submission_at: string
          pending_count: number
          submitted_count: number
          total_assignments: number
        }[]
      }
    }
    Enums: {
      book_status: "available" | "borrowed"
      grade_status: "pending" | "graded"
      quiz_status: "pending" | "submitted" | "graded"
      quiz_submission_status: "in-progress" | "submitted" | "graded"
      quiz_type: "multiple-choice" | "input-upload"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      book_status: ["available", "borrowed"],
      grade_status: ["pending", "graded"],
      quiz_status: ["pending", "submitted", "graded"],
      quiz_submission_status: ["in-progress", "submitted", "graded"],
      quiz_type: ["multiple-choice", "input-upload"],
    },
  },
} as const
