import {  ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DashboardHeader from "../DashboardHeader";
import { DashboardTabs } from "../../components/tabs/DashboardTab";
import OverviewTab from "../../components/tabs/OverviewTab";
import CoursesTab from "../../components/tabs/CoursesTab";
import StudentsTab from "../../components/tabs/StudentsTab";
import AnalyticsTab from "../../components/tabs/AnalyticsTab";
import TeachersTabs from "@/components/TeachersTabs";

const TeachersDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "students" | "analytics"
  >("overview");

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <StatusBar barStyle="dark-content" backgroundColor="#F1FFF8" />

      <DashboardHeader />
      {/* <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "students" && <StudentsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </ScrollView> */}
      <TeachersTabs />
    </SafeAreaView>
  );
};

export default TeachersDashboard;
