import { View } from "react-native";
import { TabButton } from "../../app/element/TabButton";

interface DashboardTabsProps {
  activeTab: "overview" | "courses" | "students" | "analytics";
  setActiveTab: (
    tab: "overview" | "courses" | "students" | "analytics"
  ) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <View className="bg-white mx-4 rounded mb-4 shadow-md">
      <View className="flex-row">
        <TabButton
          label="Overview"
          icon="analytics"
          isActive={activeTab === "overview"}
          onPress={() => setActiveTab("overview")}
        />
        <TabButton
          label="Courses"
          icon="book"
          isActive={activeTab === "courses"}
          onPress={() => setActiveTab("courses")}
        />
        <TabButton
          label="Students"
          icon="people"
          isActive={activeTab === "students"}
          onPress={() => setActiveTab("students")}
        />
        <TabButton
          label="Analytics"
          icon="bar-chart"
          isActive={activeTab === "analytics"}
          onPress={() => setActiveTab("analytics")}
        />
      </View>
    </View>
  );
};
