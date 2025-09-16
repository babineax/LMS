// Types Definitions
type ActivityType = "enrollment" | "completion" | "question" | "review";
type EventType = "live" | "deadline" | "meeting";

interface Activity {
  type: ActivityType;
  message: string;
  time: string;
}

interface Event {
  title: string;
  date: string;
  type: EventType;
}

export const stats = [
  { title: "Total Students", value: "1,247", icon: "people", change: "+12%" },
  { title: "Active Courses", value: "8", icon: "book", change: "+2" },
  {
    title: "Course Completion",
    value: "87%",
    icon: "trending-up",
    change: "+5%",
  },
  { title: "Total Students", value: "1,247", icon: "people", change: "+12%" },
  {
    title: "This MOnth Revenue",
    value: "$3,420",
    icon: "trophy",
    change: "+18%",
  },
];

  export const courses = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      students: 245,
      completion: 78,
      revenue: "$1,230",
      status: "active",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Creative Writing Workshop",
      students: 189,
      completion: 92,
      revenue: "$945",
      status: "active",
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "Computer Science Basics",
      students: 312,
      completion: 65,
      revenue: "$1,560",
      status: "active",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      title: "Digital Literacy Fundamentals",
      students: 156,
      completion: 45,
      revenue: "$780",
      status: "draft",
      lastUpdated: "1 day ago",
    },
  ] as const;


export const recentActivity: Activity[] = [
  {
    type: "enrollment",
    message: "Sarah Johnson enrolled in Mathematics",
    time: "5 mins ago",
  },
  {
    type: "completion",
    message: "Micheal Chen completed Writing Workshop",
    time: "1 hour ago",
  },
];

export const upcomingEvents: Event[] = [
  {
    title: "Live Q&A Session - Mathematics",
    date: "Today, 3:00 PM",
    type: "live",
  },
  {
    title: "Assignment Due - Creative Writing",
    date: "Tomorrow, 11:59 PM",
    type: "deadline",
  },
];
