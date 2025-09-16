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
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

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
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [dueDate, setDueDate] = useState("");
  const token = useAuth();
  const handleSubmit = async () => {
    if (!title || !question || !dueDate) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        course_id: courseId,
        title,
        question,
        deadline: dueDate,
        attachment_url: selectedFile || null,
      };

      const res = await api.post("/assignments", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Success", `Assignment "${res.data.title}" created!`);

      // Reset form
      setTitle("");
      setQuestion("");
      setDueDate("");
      setSelectedFile(null);
    } catch (err: any) {
      Alert.alert(
        " Error",
        err.response?.data?.error || "Failed to create assignment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: "#F1FFF8" }}>
      <View className="px-6 py-8">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
            Create Assignment
          </Text>
          {onClose && (
            <TouchableOpacity onPress={onClose} className="p-2">
              <Ionicons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <View className="mb-6">
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: "#2C3E50" }}
          >
            Title *
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
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Question */}
        <View className="mb-6">
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: "#2C3E50" }}
          >
            Question *
          </Text>
          <TextInput
            className="p-4 rounded-xl border-2 text-base"
            style={{
              borderColor: "#D0E8E6",
              backgroundColor: "#FFFFFF",
              color: "#2C3E50",
              height: 120,
            }}
            placeholder="Enter assignment question"
            placeholderTextColor="#A1EBE5"
            multiline
            textAlignVertical="top"
            value={question}
            onChangeText={setQuestion}
          />
        </View>

        {/* Due Date */}
        <View className="mb-6">
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
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A1EBE5"
            value={dueDate}
            onChangeText={setDueDate}
          />
        </View>

        {/* Upload */}
        <View className="mb-6">
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: "#2C3E50" }}
          >
            Attachment (optional)
          </Text>
          <TouchableOpacity
            className="p-4 rounded-xl border-2 border-dashed items-center justify-center"
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
              {uploading ? "Uploading..." : "+ Add File"}
            </Text>
          </TouchableOpacity>

          {uploading && (
            <View className="w-full bg-gray-200 h-2 rounded-full mt-3">
              <View
                className="h-2 rounded-full"
                style={{ width: `${progress}%`, backgroundColor: "#1ABC9C" }}
              />
            </View>
          )}

          {selectedFile && !uploading && (
            <View
              className="flex-row items-center justify-between bg-white px-4 py-3 rounded-xl border mt-3"
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

        {/* Action */}
        <TouchableOpacity
          className="py-4 rounded-xl items-center justify-center"
          style={{ backgroundColor: "#1ABC9C" }}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
            {loading ? "Creating..." : "Create Assignment"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateAssignmentForm;
