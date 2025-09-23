import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import EnrollStudentForm from "@/components/form/enrollStudent";

const StudentsTab = () => {
  const [showEnrollStudent, setShowEnrollStudent] = useState(false);
  return (
    <ScrollView>
      <View className="py-3 items-end">
        <TouchableOpacity
          onPress={() => setShowEnrollStudent(true)}
          className="bg-[#1ABC9C] rounded-md px-4 py-2 justify-center items-center"
        >
          <Text className="text-white text-center text-base">Enroll Student</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-xl p-8 items-center shadow-sm my-6">
        <Ionicons name="people" size={64} color="#A1EBE5" />
        <Text className="text-lg font-medium text-[#2C3E50] mt-4 mb-2">
          Student Management Coming Soon
        </Text>
        <Text className="text-gray-600 text-center text-sm">
          View and manage all your students in one place
        </Text>
      </View>
      {showEnrollStudent && 
        <EnrollStudentForm 
          onClose={() => setShowEnrollStudent(false)}
        />
      }
    </ScrollView>
  );
};

export default StudentsTab;
