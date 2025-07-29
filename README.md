<details> <summary>Click to expand full content</summary>

# 📚 Learning Management System (LMS)

A cross-platform Learning Management System built using **React Native** for the frontend and **Supabase** for the backend. This app supports role-based access (Admin, Student, Teacher), course management, assignments, attendance tracking, grading, notifications, and more.

---

## 📁 Project Structure

LMS-App/
├── apps/
│ ├── mobile/ # React Native frontend app
│ │ ├── src/
│ │ │ ├── components/ # Reusable UI components
│ │ │ ├── screens/ # Page views for each role (Admin, Student, Teacher)
│ │ │ ├── navigation/ # React Navigation logic
│ │ │ ├── services/ # API handlers to Supabase
│ │ │ ├── context/ # Global app context (Auth, User, Theme)
│ │ │ ├── hooks/ # Custom hooks (e.g., useAuth, useAttendance)
│ │ │ ├── assets/ # Images, icons, fonts
│ │ │ └── utils/ # Formatters, validators, helpers
│ │ └── App.tsx # Main entry point
│ └── functions/ # Firebase or Supabase triggers (notifications)
│ └── sendNotification.ts
├── backend/
│ ├── supabase/
│ │ ├── migrations/ # SQL migrations (auth, courses, users, etc.)
│ │ ├── seed/ # Seed scripts
│ │ ├── schemas/
│ │ │ ├── users.sql
│ │ │ ├── courses.sql
│ │ │ ├── lessons.sql
│ │ │ ├── assignments.sql
│ │ │ ├── submissions.sql
│ │ │ ├── grades.sql
│ │ │ ├── attendance.sql
│ │ │ └── institutions.sql
│ │ └── roles_policy.sql # Role-based access control policies
│ └── storage_rules.sql # Supabase storage (files, validations)
├── docs/
│ ├── roadmap.md # Weekly breakdown
│ ├── architecture.md # System design & flow
│ ├── api_reference.md # API endpoints + Supabase function calls
│ ├── roles.md # Role-based features & access
│ ├── onboarding.md # Setup instructions for devs
│ └── demo_plan.md # Final presentation/demo checklist
├── tests/
│ ├── unit/ # Unit tests for utilities/services
│ ├── integration/ # E2E flow (login, enroll, submit)
│ └── qa/ # Scripts and scenarios for QA testers
├── .env.example # Template for environment variables
├── .gitignore
├── README.md # Overview, setup, and contribution guide
├── package.json
└── LICENSE


