import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const AnalyticsTab = () => {
  return (
    <View className="bg-white rounded-xl p-8 shadow-sm items-center mb-6">
      <Ionicons name="trending-up" size={26} color="#A1EBE5" />
      <Text className="text-lg font-medium text-[#2C3E50] mt-4 mb-2">
        Detailed Analytics Coming Soon
      </Text>
      <Text className="text-gray-600 text-center text-sm">
        Track student progress, engagement, and course perfomance
      </Text>
    </View>
  );
};

export default AnalyticsTab;
