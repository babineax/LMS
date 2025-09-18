import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const StudentsTab = () => {
  return (
    <View className="bg-white rounded-xl p-8 shadow-sm items-center mb-6">
      <Ionicons name="people" size={64} color="#A1EBE5" />
      <Text className="text-lg font-medium text-[#2C3E50] mt-4 mb-2">
        Student Management Coming Soon
      </Text>
      <Text className="text-gray-600 text-center text-sm">
        View and manage all your students in one place
      </Text>
    </View>
  );
};

export default StudentsTab;
