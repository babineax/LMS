import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { DashboardTabs } from "./tabs/DashboardTab";
import OverviewTab from "./tabs/OverviewTab";
import CoursesTab from "./tabs/CoursesTab";
import StudentsTab from "./tabs/StudentsTab";
import AnalyticsTab from "./tabs/AnalyticsTab";

const TeachersDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "students" | "analytics"
  >("overview");

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <StatusBar barStyle="dark-content" backgroundColor="#F1FFF8" />

      <DashboardHeader />
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "students" && <StudentsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeachersDashboard;
