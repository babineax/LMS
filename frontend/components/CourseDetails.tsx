import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Course, Lesson } from "@/types/types";

interface CourseDetailsProps {
  course: Course;
  onEnroll: () => void;
  onBack: () => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  onEnroll,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "lessons" | "reviews"
  >("overview");

  const LessonItem: React.FC<{ lesson: Lesson; index: number }> = ({
    lesson,
    index,
  }) => (
    <View className="flex-row items-center p-4 border-b border-gray-100">
      <View
        className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
          lesson.isCompleted
            ? "bg-[#1ABC9C]"
            : lesson.isLocked
              ? "bg-gray-200"
              : "bg-[#A1EBE5]"
        }`}
      >
        {lesson.isCompleted ? (
          <Ionicons name="checkmark" size={16} color="white" />
        ) : lesson.isLocked ? (
          <Ionicons name="lock-closed" size={14} color="#6B7280" />
        ) : (
          <Text className="text-xs font-bold text-[#2C3E50]">{index + 1}</Text>
        )}
      </View>

      <View className="flex-1">
        <Text
          className={`font-medium ${lesson.isLocked ? "text-gray-400" : "text-[#2C3E50]"}`}
        >
          {lesson.title}
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons
            name={
              lesson.type === "video"
                ? "play-circle"
                : lesson.type === "quiz"
                  ? "help-circle"
                  : "document-text"
            }
            size={14}
            color="#6B7280"
          />
          <Text className="text-sm text-gray-500 ml-1 capitalize">
            {lesson.type} • {lesson.duration}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#F1FFF8]">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <TouchableOpacity onPress={onBack} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Course Hero */}
        <View className="bg-white">
          <Image
            source={{ uri: course.image }}
            className="w-full h-48"
            resizeMode="cover"
          />

          <View className="p-6">
            <View className="flex-row items-center mb-2">
              <View className="px-3 py-1 rounded-full mr-3 bg-[#A1EBE5]">
                <Text className="text-sm font-medium text-[#2C3E50]">
                  {course.level}
                </Text>
              </View>
              <Text className="text-sm text-gray-500">{course.category}</Text>
            </View>

            <Text className="text-2xl font-bold mb-2 text-[#2C3E50]">
              {course.title}
            </Text>
            <Text className="text-gray-600 mb-4">{course.description}</Text>

            {/* Stats Row */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#F39C12" />
                <Text className="font-medium ml-1 text-[#2C3E50]">
                  {course.rating}
                </Text>
                <Text className="text-gray-500 ml-1">
                  ({course.reviewsCount})
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-1">
                  {course.studentsCount}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-1">{course.duration}</Text>
              </View>
            </View>

            {/* Price & Enroll */}
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-3xl font-bold text-[#1ABC9C]">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </Text>
                {course.originalPrice &&
                  course.originalPrice > course.price && (
                    <Text className="text-gray-400 line-through">
                      ${course.originalPrice}
                    </Text>
                  )}
              </View>

              <TouchableOpacity
                onPress={onEnroll}
                className="px-8 py-3 rounded-lg bg-[#1ABC9C]"
              >
                <Text className="text-white font-bold text-lg">
                  {course.isEnrolled ? "Continue Learning" : "Enroll Now"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="bg-white mt-2">
          <View className="flex-row border-b border-gray-100">
            {[
              { key: "overview", label: "Overview" },
              { key: "lessons", label: "Lessons" },
              { key: "reviews", label: "Reviews" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-4 items-center border-b-2 ${
                  activeTab === tab.key
                    ? "border-[#1ABC9C]"
                    : "border-transparent"
                }`}
              >
                <Text
                  className={`font-medium ${
                    activeTab === tab.key ? "text-[#1ABC9C]" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View className="p-6">
            {activeTab === "overview" && (
              <View>
                <Text className="text-lg font-bold mb-4 text-[#2C3E50]">
                  What You&apos;ll Learn
                </Text>
                {course.tags.map((tag, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#1ABC9C"
                    />
                    <Text className="ml-2 text-gray-700">{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === "lessons" && (
              <View>
                <Text className="text-lg font-bold mb-4 text-[#2C3E50]">
                  Course Content
                </Text>
                <View className="bg-gray-50 rounded-xl overflow-hidden">
                  {course.lessons.map((lesson, index) => (
                    <LessonItem key={lesson.id} lesson={lesson} index={index} />
                  ))}
                </View>
              </View>
            )}

            {activeTab === "reviews" && (
              <View>
                <Text className="text-lg font-bold mb-4 text-[#2C3E50]">
                  Student Reviews
                </Text>
                <View className="items-center py-8">
                  <Ionicons name="chatbubbles" size={48} color="#A1EBE5" />
                  <Text className="text-gray-500 mt-4">No reviews yet</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
