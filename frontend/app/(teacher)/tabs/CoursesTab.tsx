import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { courses } from "../data/mockData";
import { CourseCard } from "../element/CourseCard";
import CreateAssignmentForm from "../CreateAssignmentForm";
import GradingUI from "../GradingUI";
import { useAuth } from "@/contexts/AuthContext";

const CoursesTab: React.FC = () => {
  const { token } = useAuth();

  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleCreateAssignment = (courseId?: string) => {
    setSelectedCourseId(courseId || null);
    setShowCreateAssignment(true);
  };

  const handleOpenGrading = (courseId?: string) => {
    setSelectedCourseId(courseId || null);
    setShowGrading(true);
  };

  return (
    <View className="pb-6">
      {/* Header with Action Buttons */}
      <View className="flex-row justify-between p-2 items-center mb-6">
        <Text className="text-[20px] font-bold text-[#2C3E50]">My Courses</Text>
        <View className="flex-row gap-2">
          {/* Create Assignment button */}
          <TouchableOpacity
            className="bg-[#1ABC9C] px-4 py-2 rounded-lg flex-row items-center mr-2"
            onPress={() => handleCreateAssignment()}
          >
            <Ionicons name="document-text" size={16} color="white" />
            <Text className="text-white font-medium ml-2 text-sm">
              Assignment
            </Text>
          </TouchableOpacity>

          {/* New Course button */}
          <TouchableOpacity
            className="bg-[#16A085] px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push("(admin)/CreateCourse")}
          >
            <Ionicons name="add" size={16} color="white" />
            <Text className="text-white font-medium ml-1 text-sm">
              New Course
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions Row */}
      <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
          className="flex-1 bg-[#D0E8E6] p-4 rounded-xl flex-row items-center justify-center"
          onPress={() => handleOpenGrading()}
        >
          <Ionicons name="checkmark-circle" size={20} color="#2C3E50" />
          <Text className="text-[#2C3E50] font-semibold ml-2">Grade Work</Text>
        </TouchableOpacity>
      </View>

      {/* Courses list */}
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onCreateAssignment={() =>
            handleCreateAssignment(course.id.toString())
          }
          onGradeWork={() => handleOpenGrading(course.id.toString())}
          onViewCourse={() => router.push(`(admin)/course/${course.id}`)}
          onEditCourse={() => router.push(`(admin)/edit-course/${course.id}`)}
        />
      ))}

      {/* Create Assignment Modal */}
      <Modal
        visible={showCreateAssignment}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1">
          <CreateAssignmentForm
            courseId={selectedCourseId}
            onClose={() => setShowCreateAssignment(false)}
          />
        </View>
      </Modal>

      {/* Grading Modal */}
      <Modal
        visible={showGrading}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1">
          <GradingUI
            token={token!} 
            courseId={selectedCourseId}
            onClose={() => setShowGrading(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CoursesTab;
