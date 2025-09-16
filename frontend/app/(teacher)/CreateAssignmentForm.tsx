import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFileUpload } from "./hooks/useFileUpload";

interface Assignment {
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  totalPoints: string;
  instructions: string;
  attachments: string[];
}

interface CreateAssignmentFormProps {
  courseId?: string | null;
  onClose?: () => void;
}

const CreateAssignmentForm: React.FC<CreateAssignmentFormProps> = ({
  courseId,
  onClose,
}) => {
  const { uploading, progress, selectedFile, setSelectedFile, handlePickFile } =
    useFileUpload();
  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
    totalPoints: "",
    instructions: "",
    attachments: [],
  });

  const subjects = ["Mathematics", "Science", "English", "History", "Art"];

  const handleInputChange = (field: keyof Assignment, value: string) => {
    setAssignment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!assignment.title || !assignment.subject || !assignment.dueDate) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert("Success", "Assignment created successfully!");
    // Reset form
    setAssignment({
      title: "",
      description: "",
      subject: "",
      dueDate: "",
      totalPoints: "",
      instructions: "",
      attachments: [],
    });
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: "#F1FFF8" }}>
      <View className="px-6 py-8">
        {/* Header with Close Button */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-1">
            <Text
              className="text-3xl font-bold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Create Assignment
            </Text>
            <Text className="text-base opacity-70" style={{ color: "#2C3E50" }}>
              Fill in the details below to create a new assignment
            </Text>
          </View>
          {onClose && (
            <TouchableOpacity onPress={onClose} className="p-2">
              <Ionicons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>
          )}
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* Assignment Title */}
          <View>
            <Text
              className="text-lg font-semibold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Assignment Title *
            </Text>
            <TextInput
              className="p-4 rounded-xl border-2 text-base"
              style={{
                borderColor: "#D0E8E6",
                backgroundColor: "#FFFFFF",
                color: "#2C3E50",
              }}
              placeholder="Enter assignment title"
              placeholderTextColor="#A1EBE5"
              value={assignment.title}
              onChangeText={(value) => handleInputChange("title", value)}
            />
          </View>

          {/* Subject Selection */}
          <View>
            <Text
              className="text-lg font-semibold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Subject *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-3">
                {subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject}
                    className="px-6 py-3 rounded-xl"
                    style={{
                      backgroundColor:
                        assignment.subject === subject ? "#1ABC9C" : "#D0E8E6",
                    }}
                    onPress={() => handleInputChange("subject", subject)}
                  >
                    <Text
                      className="font-medium"
                      style={{
                        color:
                          assignment.subject === subject
                            ? "#FFFFFF"
                            : "#2C3E50",
                      }}
                    >
                      {subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Description */}
          <View>
            <Text
              className="text-lg font-semibold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Description
            </Text>
            <TextInput
              className="p-4 rounded-xl border-2 text-base"
              style={{
                borderColor: "#D0E8E6",
                backgroundColor: "#FFFFFF",
                color: "#2C3E50",
                height: 100,
              }}
              placeholder="Brief description of the assignment"
              placeholderTextColor="#A1EBE5"
              multiline
              textAlignVertical="top"
              value={assignment.description}
              onChangeText={(value) => handleInputChange("description", value)}
            />
          </View>

          {/* Due Date and Points Row */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Due Date *
              </Text>
              <TextInput
                className="p-4 rounded-xl border-2 text-base"
                style={{
                  borderColor: "#D0E8E6",
                  backgroundColor: "#FFFFFF",
                  color: "#2C3E50",
                }}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A1EBE5"
                value={assignment.dueDate}
                onChangeText={(value) => handleInputChange("dueDate", value)}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Total Points
              </Text>
              <TextInput
                className="p-4 rounded-xl border-2 text-base"
                style={{
                  borderColor: "#D0E8E6",
                  backgroundColor: "#FFFFFF",
                  color: "#2C3E50",
                }}
                placeholder="100"
                placeholderTextColor="#A1EBE5"
                keyboardType="numeric"
                value={assignment.totalPoints}
                onChangeText={(value) =>
                  handleInputChange("totalPoints", value)
                }
              />
            </View>
          </View>

          {/* Instructions */}
          <View>
            <Text
              className="text-lg font-semibold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Instructions
            </Text>
            <TextInput
              className="p-4 rounded-xl border-2 text-base"
              style={{
                borderColor: "#D0E8E6",
                backgroundColor: "#FFFFFF",
                color: "#2C3E50",
                height: 120,
              }}
              placeholder="Detailed instructions for students..."
              placeholderTextColor="#A1EBE5"
              multiline
              textAlignVertical="top"
              value={assignment.instructions}
              onChangeText={(value) => handleInputChange("instructions", value)}
            />
          </View>

          {/* Attachments */}
          <View>
            <Text
              className="text-lg font-semibold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Attachments
            </Text>

            {/* Upload Button */}
            <TouchableOpacity
              className="p-4 rounded-xl border-2 border-dashed items-center justify-center mb-3"
              style={{
                borderColor: "#1ABC9C",
                backgroundColor: "#FFFFFF",
                height: 80,
              }}
              onPress={handlePickFile}
              disabled={uploading}
            >
              <Ionicons name="cloud-upload" size={24} color="#1ABC9C" />
              <Text
                className="text-base font-medium"
                style={{ color: "#1ABC9C" }}
              >
                {uploading ? "Uploading..." : "+ Add Files"}
              </Text>
              <Text
                className="text-sm opacity-70 mt-1"
                style={{ color: "#1ABC9C" }}
              >
                Upload documents, images, or resources
              </Text>
            </TouchableOpacity>

            {/* Upload Progress */}
            {uploading && (
              <View className="w-full bg-gray-200 h-2 rounded-full mb-3">
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#1ABC9C",
                  }}
                />
              </View>
            )}

            {/* Selected File */}
            {selectedFile && !uploading && (
              <View
                className="flex-row items-center justify-between bg-white px-4 py-3 rounded-xl border"
                style={{ borderColor: "#D0E8E6" }}
              >
                <View className="flex-row items-center flex-1">
                  <Ionicons name="document" size={20} color="#1ABC9C" />
                  <Text
                    className="text-sm ml-2 flex-1"
                    style={{ color: "#2C3E50" }}
                  >
                    {selectedFile}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedFile(null)}
                  className="p-1"
                >
                  <Ionicons name="trash" size={16} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 space-y-4">
          <TouchableOpacity
            className="py-4 rounded-xl items-center justify-center"
            style={{ backgroundColor: "#1ABC9C" }}
            onPress={handleSubmit}
          >
            <Text className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
              Create Assignment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4 rounded-xl items-center justify-center border-2"
            style={{
              borderColor: "#D0E8E6",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Text
              className="text-lg font-semibold"
              style={{ color: "#2C3E50" }}
            >
              Save as Draft
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAssignmentForm;
