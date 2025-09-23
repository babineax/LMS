import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Database } from "@/types/database";

import { supabase } from "@/libs/supabase";

type Course = Database['public']['Tables']['courses']['Row'];

interface CourseCardProps {
  course: Course;
  onPress: () => void;
  variant?: "default" | "compact" | "featured";
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onPress,
  variant = "default",
}) => {
 
  const [instructorName, setInstructorName] = useState("Unknown");

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!course.teacher_id) return;

      const { data, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", course.teacher_id)
        .single();

      if (error) {
        console.error("Error fetching instructor:", error);
      } else {
        setInstructorName(data?.full_name ?? "Unknown");
      }
    };

    fetchInstructor();
  }, [course.teacher_id]);


  // const getLevelColor = (level: string) => {
  //   switch (level) {
  //     case "beginner":
  //       return "#1ABC9C";
  //     case "intermediate":
  //       return "#F39C12";
  //     case "advanced":
  //       return "#E74C3C";
  //     default:
  //       return "#1ABC9C";
  //   }
  // };

const formatPrice = (fee_amount: number | null | undefined) => {
  if (fee_amount == null) return "Free"; // treat null/undefined as Free
  return fee_amount === 0 ? "Free" : `$${fee_amount}`;
};
 

  if (variant === "compact") {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3"
      >
        <View className="flex-row">
          <Image
            source={
              course.image_url
                ? { uri: course.image_url }
                : require("../assets/images/oral_literature.jpg") // local fallback
            }
            className="w-16 h-16 rounded-lg"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text
              className="font-semibold text-sm"
              style={{ color: "#2C3E50" }}
              numberOfLines={2}
            >
              {course.title}
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              {instructorName}
            </Text>
            <View className="flex-row items-center mt-2">
              {/* <View className="flex-row items-center mr-3">
                <Ionicons name="star" size={12} color="#F39C12" />
                <Text className="text-xs text-gray-600 ml-1">
                  {course.rating}
                </Text>
              </View> */}
              <Text
                className="text-xs font-semibold"
                style={{ color: "#1ABC9C" }}
              >
                {formatPrice(course.fee_amount)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === "featured") {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden"
      >
        <View className="relative">
          <Image
            source={
              course.image_url
                ? { uri: course.image_url }
                : require("../assets/images/oral_literature.jpg") // local fallback
            }
            className="w-full h-48"
            resizeMode="cover"
          />
          {/* <View className="absolute top-3 left-3">
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: getLevelColor(course.level) }}
            >
              <Text className="text-white text-xs font-medium capitalize">
                {course.level}
              </Text>
            </View>
          </View> */}
          {/* {course.originalPrice && course.originalPrice > course.price && (
            <View
              className="absolute top-3 right-3 px-2 py-1 rounded-full"
              style={{ backgroundColor: "#E74C3C" }}
            >
              <Text className="text-white text-xs font-bold">
                {Math.round(
                  ((course.originalPrice - course.price) /
                    course.originalPrice) *
                    100
                )}
                % OFF
              </Text>
            </View>
          )} */}
        </View>

        <View className="p-4">
          <Text
            className="font-bold text-lg mb-2"
            style={{ color: "#2C3E50" }}
            numberOfLines={2}
          >
            {course.title}
          </Text>

          <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
            {course.description}
          </Text>

          {/* <View className="flex-row items-center mb-3">
            <Ionicons name="person-circle" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">
              {course.instructor.name}
            </Text>
          </View> */}

          <View className="flex-row items-center justify-between mb-4">
            {/* <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#F39C12" />
              <Text
                className="text-sm font-medium ml-1"
                style={{ color: "#2C3E50" }}
              >
                {course.rating}
              </Text>
              <Text className="text-sm text-gray-500 ml-1">
                ({course.reviewsCount})
              </Text>
            </View> */}

            <View className="flex-row items-center">
              <Ionicons name="people" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-1">
                {course.enrolled_count}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View>
              {/* {course.originalPrice && course.originalPrice > course.price && (
                <Text className="text-sm text-gray-400 line-through">
                  ${course.originalPrice}
                </Text>
              )} */}
              <Text
                className="text-xl font-bold"
                style={{ color: course.fee_amount === 0 ? "#1ABC9C" : "#2C3E50" }}
              >
                {formatPrice(course.fee_amount)}
              </Text>
            </View>

            {/* <TouchableOpacity
              className="px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#1ABC9C" }}
            >
              <Text className="text-white font-semibold">
                {course.isEnrolled ? "Continue" : "Enroll"}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
    >
      <Image
        source={
          course.image_url
            ? { uri: course.image_url }
            : require("../assets/images/oral_literature.jpg") // local fallback
        }
        className="w-full h-40"
        resizeMode="cover"
      />

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: "#A1EBE5" }}
          >
            {/* <Text
              className="text-xs font-medium capitalize"
              style={{ color: "#2C3E50" }}
            >
              {course.level}
            </Text> */}
          </View>
          <Text className="text-xs text-gray-500">{course.category}</Text>
        </View>

        <Text
          className="font-bold text-base mb-2"
          style={{ color: "#2C3E50" }}
          numberOfLines={2}
        >
          {course.title}
        </Text>

        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
          {course.description}
        </Text>

        <View className="flex-row items-center justify-between mb-3">
          {/* <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#F39C12" />
            <Text className="text-sm ml-1" style={{ color: "#2C3E50" }}>
              {course.rating}
            </Text>
            <Text className="text-sm text-gray-500 ml-1">
              ({course.reviewsCount})
            </Text>
          </View> */}

          <View className="flex-row items-center">
            <Ionicons name="time" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">
              {course.duration}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text
            className="text-lg font-bold"
            style={{ color: course.fee_amount === 0 ? "#1ABC9C" : "#2C3E50" }}
          >
            {formatPrice(course.fee_amount)}
          </Text>

          <Text className="text-sm text-gray-500">
            {course.enrolled_count} students
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
