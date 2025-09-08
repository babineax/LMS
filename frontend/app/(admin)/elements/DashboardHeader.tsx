import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

type SectionType = "overview" | "payments" | "payouts" | "fees";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  activeSection?: SectionType;
  onSectionChange?: (section: SectionType) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeSection = "overview",
  onSectionChange,
}) => {
  const sections = [
    { id: "overview", label: "Dashboard", icon: "📊" },
    { id: "payments", label: "Payments", icon: "💰" },
    { id: "payouts", label: "Payouts", icon: "💳" },
    { id: "fees", label: "Fee Structure", icon: "⚙️" },
  ] as const;

  // Only show header on overview page
  if (activeSection !== "overview") {
    return (
      <View className="mb-4">
        {/* Navigation Tabs Only */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row space-x-2 px-1">
            {sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                onPress={() => onSectionChange?.(section.id as SectionType)}
                className={`px-4 py-3 rounded-lg shadow-sm min-w-[120px] items-center ${
                  activeSection === section.id ? "shadow-md" : ""
                }`}
                style={{
                  backgroundColor:
                    activeSection === section.id ? "#1ABC9C" : "#FFFFFF",
                  borderWidth: 1,
                  borderColor:
                    activeSection === section.id ? "#16A085" : "#D0E8E6",
                }}
              >
                <Text className="text-lg mb-1">{section.icon}</Text>
                <Text
                  className="text-sm font-medium text-center"
                  style={{
                    color: activeSection === section.id ? "#FFFFFF" : "#2C3E50",
                  }}
                >
                  {section.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Full header only on overview page
  return (
    <View className="mb-6">
      {/* Header Section - Only on Overview */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </Text>
      </View>

      {/* Navigation Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <View className="flex-row space-x-2 px-1">
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => onSectionChange?.(section.id as SectionType)}
              className={`px-4 py-3 rounded-lg shadow-sm min-w-[120px] items-center ${
                activeSection === section.id ? "shadow-md" : ""
              }`}
              style={{
                backgroundColor:
                  activeSection === section.id ? "#1ABC9C" : "#FFFFFF",
                borderWidth: 1,
                borderColor:
                  activeSection === section.id ? "#16A085" : "#D0E8E6",
              }}
            >
              <Text className="text-lg mb-1">{section.icon}</Text>
              <Text
                className="text-sm font-medium text-center"
                style={{
                  color: activeSection === section.id ? "#FFFFFF" : "#2C3E50",
                }}
              >
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
