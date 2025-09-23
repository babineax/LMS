import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Database } from "@/types/database";

type Course = Database['public']['Tables']['courses']['Row'];

interface CourseCardProps {
  course: Course;
  onCreateAssignment?: () => void;
  onGradeWork?: () => void;
  onViewCourse?: () => void;
  onEditCourse?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onCreateAssignment,
  onGradeWork,
  onViewCourse,
  onEditCourse,
}) => (
  <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
    <View className="flex-row justify-between items-start mb-3">
      <View className="flex-1">
        <Text className="text-lg font-bold text-[#2C3E50] mb-2">
          {course.title}
        </Text>
        <View
          className={`self-start px-3 py-1 rounded-lg ${course.active ? "bg-[#A1EBE5]" : "bg-gray-100"}`}
        >
          <Text
            className={`text-xs font-medium ${course.active ? "text-[#2C3E50]" : "text-gray-600"}`}
          >
            {course.active? "Active" : "Inactive"}
          </Text>
        </View>
      </View>
      <View className="flex-row">
        <TouchableOpacity className="p-2 mr-1" onPress={onViewCourse}>
          <Ionicons name="eye" size={16} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2" onPress={onEditCourse}>
          <Ionicons name="create" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>

    <View className="space-y-3">
      <View className="flex-row justify-between">
        <Text className="text-sm text-gray-600">
          Students Enrolled: {course.enrolled_count}
        </Text>
        <Text className="text-sm text-gray-600">Revenue: {course.fee_amount}</Text>
      </View>

      {/* <View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Completion Rate</Text>
          <Text className="text-sm font-medium text-[#2C3E50]">
            {course.completion}%
          </Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-2">
          <View
            className="bg-[#18B9A7] h-2 rounded-full"
            style={{ width: `${course.completion}%` }}
          />
        </View>
      </View> */}

      <Text className="text-xs text-gray-500">
        Last updated: {course.updated_at?.slice(0, 10)}
      </Text>
    </View>

    {/* Assignment Actions - Only show if handlers are provided */}
    {(onCreateAssignment || onGradeWork) && (
      <View className="flex-row gap-2 pt-3 mt-3 border-t border-[#D0E8E6]">
        {onCreateAssignment && (
          <TouchableOpacity
            className="flex-1 bg-[#18B9A7] py-2 rounded-lg flex-row items-center justify-center"
            onPress={onCreateAssignment}
          >
            <Ionicons name="add-circle" size={16} color="white" />
            <Text className="text-white font-medium ml-1 text-xs">
              Assignment
            </Text>
          </TouchableOpacity>
        )}

        {onGradeWork && (
          <TouchableOpacity
            className="flex-1 bg-[#18B9A7] py-2 rounded-md flex-row items-center justify-center"
            onPress={onGradeWork}
          >
            <Ionicons name="checkmark-circle" size={16} color="white" />
            <Text className="text-white font-medium ml-1 text-xs">Grade</Text>
          </TouchableOpacity>
        )}
      </View>
    )}
  </View>
);
