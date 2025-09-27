import { View, Text, useWindowDimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import OverviewTab from "./tabs/OverviewTab";
import CoursesTab from "./tabs/CoursesTab";
import StudentsTab from "./tabs/StudentsTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import { SceneMap, TabView } from 'react-native-tab-view';
import { Ionicons } from "@expo/vector-icons";


export default function TeachersTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "overview", label: "Overview", icon: "analytics" },
    { key: "courses", label: "Courses", icon: "book" },
    { key: "students", label: "Students", icon: "people" },
    { key: "analytics", label: "Analytics", icon: "bar-chart" },
  ]);

  const renderScene = SceneMap({
    overview: OverviewTab,
    courses: CoursesTab,
    students: StudentsTab,
    analytics: AnalyticsTab,
  });

  const renderTabBar = (props: any) => (
    <View className="flex-row items-center justify-center bg-white  px-2 py-2">
      {props.navigationState.routes.map((route: any, i: number) => {
        const isActive = i === props.navigationState.index;

        return (
          <TouchableOpacity
            key={i}
            onPress={() => props.jumpTo(route.key)}
            className={`flex-1 flex-row items-center justify-center rounded-lg py-2 ${
              isActive ? "bg-[#1ABC9C] my-1" : "bg-transparent"
            }`}
          >
            <Ionicons
              name={route.icon}
              size={16}
              color={isActive ? "white" : "#2C3E50"}
            />
            <Text
              className={`ml-2 text-sm ${
                isActive ? "text-white" : "text-[#2C3E50]"
              }`}
            >
              {route.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View className="flex-1 bg-bgLight">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ margin:8 }}
      />
    </View>
  );
}