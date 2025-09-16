import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFileUpload } from "../hooks/useFileUpload";
import { courses } from "../data/mockData";
import { CourseCard } from "../element/CourseCard";

const CoursesTab: React.FC = () => {
  const { uploading, progress, selectedFile, setSelectedFile, handlePickFile } =
    useFileUpload();

  return (
    <View className="pb-6">
      {/* Header with Upload */}
      <View className="flex-row justify-between p-2 items-center mb-6">
        <Text className="text-[20px] font-bold text-[#2C3E50]">My Courses</Text>
        <View className="flex-row gap-2">
          {/* Upload button */}
          <TouchableOpacity
            className="bg-[#3498DB] px-4 py-2 rounded-lg flex-row items-center mr-2"
            onPress={handlePickFile}
          >
            <Ionicons name="cloud-upload" size={16} color="white" />
            <Text className="text-white font-medium ml-2 text-sm">Upload</Text>
          </TouchableOpacity>

          {/* New Course button */}
          <TouchableOpacity
            className="bg-[#1ABC9C] px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push("(admin)/CreateCourse")}
          >
            <Ionicons name="add" size={16} color="white" />
            <Text className="text-white font-medium ml-1 text-sm">
              New Course
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload progress */}
      {uploading && (
        <View className="w-full bg-gray-200 h-4 rounded-full mb-4">
          <View
            className="bg-[#3498DB] h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
      )}

      {/* File name + Delete */}
      {selectedFile && !uploading && (
        <View className="flex-row items-center mb-4 justify-between bg-white px-3 py-2 rounded-lg shadow-sm">
          <Text className="text-sm text-gray-600 flex-1">{selectedFile}</Text>
          <TouchableOpacity
            className="bg-red-500 px-3 py-1 rounded-lg flex-row items-center ml-2"
            onPress={() => {
              setSelectedFile(null);
            }}
          >
            <Ionicons name="trash" size={16} color="white" />
            <Text className="text-white font-medium ml-1 text-sm">Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Courses list */}
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </View>
  );
};

export default CoursesTab;
