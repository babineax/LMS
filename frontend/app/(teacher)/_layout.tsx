import { Tabs } from "expo-router";
import { Building2, Settings } from "lucide-react-native";
import { TabBarIconProps } from "../(student)/_layout";

export default function TeacherLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F1FFF8",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          paddingTop: 8,
          paddingBottom: 8,
          height: 64,
        },
        tabBarActiveTintColor: "#1ABC9C",
        tabBarInactiveTintColor: "#2C3E50",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="teacher"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }: TabBarIconProps) => (
            <Building2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }: TabBarIconProps) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
      </Tabs>
  );
}