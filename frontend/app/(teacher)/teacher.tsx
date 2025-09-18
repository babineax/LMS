import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardHeader from "../DashboardHeader";
import TeachersTabs from "@/components/TeachersTabs";

const TeachersDashboard: React.FC = () => {

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <StatusBar barStyle="dark-content" backgroundColor="#F1FFF8" />
      <DashboardHeader />
      <TeachersTabs />
    </SafeAreaView>
  );
};

export default TeachersDashboard;
