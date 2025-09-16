import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";

interface Student {
  id: string;
  name: string;
  submittedAt: string;
  score: number | null;
  maxScore: number;
  status: "graded" | "pending" | "late";
  feedback: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  totalPoints: number;
}

interface GradingUIProps {
  courseId: string | null;
  onClose: () => void;
}

const GradingUI: React.FC<GradingUIProps> = ({ courseId, onClose }) => {
  const [selectedAssignment] = useState<Assignment>({
    id: "1",
    title: "Chapter 5 Quiz - Algebra",
    subject: "Mathematics",
    dueDate: "2024-03-15",
    totalPoints: 100,
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      submittedAt: "2024-03-14 14:30",
      score: 85,
      maxScore: 100,
      status: "graded",
      feedback: "Great work! Minor calculation error in question 3.",
    },
    {
      id: "2",
      name: "Michael Chen",
      submittedAt: "2024-03-15 09:15",
      score: null,
      maxScore: 100,
      status: "pending",
      feedback: "",
    },
    {
      id: "3",
      name: "Emily Davis",
      submittedAt: "2024-03-16 10:20",
      score: null,
      maxScore: 100,
      status: "late",
      feedback: "",
    },
    {
      id: "4",
      name: "James Wilson",
      submittedAt: "2024-03-14 16:45",
      score: 92,
      maxScore: 100,
      status: "graded",
      feedback: "Excellent understanding of concepts!",
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentScore, setCurrentScore] = useState<string>("");
  const [currentFeedback, setCurrentFeedback] = useState<string>("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "graded":
        return "#16A085";
      case "pending":
        return "#1ABC9C";
      case "late":
        return "#E74C3C";
      default:
        return "#2C3E50";
    }
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setCurrentScore(student.score ? student.score.toString() : "");
    setCurrentFeedback(student.feedback);
  };

  const handleSaveGrade = () => {
    if (!selectedStudent || !currentScore) {
      Alert.alert("Error", "Please enter a score");
      return;
    }

    const score = parseInt(currentScore);
    if (score < 0 || score > selectedStudent.maxScore) {
      Alert.alert(
        "Error",
        `Score must be between 0 and ${selectedStudent.maxScore}`
      );
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              score,
              feedback: currentFeedback,
              status: "graded" as const,
            }
          : student
      )
    );

    Alert.alert("Success", "Grade saved successfully!");
    setSelectedStudent(null);
    setCurrentScore("");
    setCurrentFeedback("");
  };

  const getGradedCount = () =>
    students.filter((s) => s.status === "graded").length;
  const getAverageScore = () => {
    const gradedStudents = students.filter((s) => s.score !== null);
    if (gradedStudents.length === 0) return 0;
    const total = gradedStudents.reduce((sum, s) => sum + (s.score || 0), 0);
    return Math.round(total / gradedStudents.length);
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity
      className="mb-3 p-4 rounded-xl flex-row items-center justify-between"
      style={{
        backgroundColor: "#FFFFFF",
        borderLeftWidth: 4,
        borderLeftColor: getStatusColor(item.status),
      }}
      onPress={() => handleStudentSelect(item)}
    >
      <View className="flex-1">
        <Text className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
          {item.name}
        </Text>
        <Text className="text-sm opacity-70 mt-1" style={{ color: "#2C3E50" }}>
          Submitted: {item.submittedAt}
        </Text>
      </View>

      <View className="items-end">
        {item.score !== null ? (
          <Text className="text-xl font-bold" style={{ color: "#16A085" }}>
            {item.score}/{item.maxScore}
          </Text>
        ) : (
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getStatusColor(item.status) }}
          >
            <Text
              className="text-sm font-medium capitalize"
              style={{ color: "#FFFFFF" }}
            >
              {item.status}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: "#F1FFF8" }}>
      {/* Header */}
      <View className="px-6 py-6" style={{ backgroundColor: "#1ABC9C" }}>
        <Text className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
          {selectedAssignment.title}
        </Text>
        <Text className="text-base opacity-90" style={{ color: "#FFFFFF" }}>
          {selectedAssignment.subject} • Due: {selectedAssignment.dueDate}
        </Text>

        {/* Stats Row */}
        <View className="flex-row justify-between mt-4">
          <View className="items-center">
            <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
              {getGradedCount()}
            </Text>
            <Text className="text-sm" style={{ color: "#FFFFFF" }}>
              Graded
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
              {students.length - getGradedCount()}
            </Text>
            <Text className="text-sm" style={{ color: "#FFFFFF" }}>
              Pending
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
              {getAverageScore()}%
            </Text>
            <Text className="text-sm" style={{ color: "#FFFFFF" }}>
              Average
            </Text>
          </View>
        </View>
      </View>

      {/* Student List */}
      {!selectedStudent ? (
        <View className="flex-1 px-6 py-4">
          <Text className="text-xl font-bold mb-4" style={{ color: "#2C3E50" }}>
            Student Submissions (Course: {courseId ?? "N/A"})
          </Text>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentItem}
            showsVerticalScrollIndicator={false}
          />

          {/* Close button */}
          <TouchableOpacity
            className="mt-6 py-4 rounded-xl items-center justify-center border-2"
            style={{ borderColor: "#D0E8E6", backgroundColor: "#FFFFFF" }}
            onPress={onClose}
          >
            <Text
              className="text-lg font-semibold"
              style={{ color: "#2C3E50" }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Grading Panel */
        <ScrollView className="flex-1 px-6 py-4">
          <View className="mb-6">
            <TouchableOpacity
              className="flex-row items-center mb-4"
              onPress={() => setSelectedStudent(null)}
            >
              <Text
                className="text-lg font-semibold"
                style={{ color: "#1ABC9C" }}
              >
                ← Back to List
              </Text>
            </TouchableOpacity>

            <Text
              className="text-2xl font-bold mb-2"
              style={{ color: "#2C3E50" }}
            >
              {selectedStudent.name}
            </Text>
            <Text className="text-base opacity-70" style={{ color: "#2C3E50" }}>
              Submitted: {selectedStudent.submittedAt}
            </Text>
          </View>

          {/* Assignment Preview */}
          <View
            className="p-4 rounded-xl mb-6"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#D0E8E6",
              borderWidth: 1,
            }}
          >
            <Text
              className="text-lg font-semibold mb-2"
              style={{ color: "#2C3E50" }}
            >
              Student's Submission
            </Text>
            <Text className="text-base leading-6" style={{ color: "#2C3E50" }}>
              [Assignment content would be displayed here - could be text
              responses, uploaded files, etc.]
            </Text>
          </View>

          {/* Scoring Section */}
          <View className="space-y-4">
            <View>
              <Text
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Score (out of {selectedStudent.maxScore})
              </Text>
              <TextInput
                className="p-4 rounded-xl border-2 text-xl text-center font-bold"
                style={{
                  borderColor: "#D0E8E6",
                  backgroundColor: "#FFFFFF",
                  color: "#2C3E50",
                }}
                placeholder="0"
                placeholderTextColor="#A1EBE5"
                keyboardType="numeric"
                value={currentScore}
                onChangeText={setCurrentScore}
              />
            </View>

            {/* Quick Score Buttons */}
            <View>
              <Text
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Quick Score
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {[100, 90, 80, 70, 60, 50].map((score) => (
                  <TouchableOpacity
                    key={score}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: "#D0E8E6" }}
                    onPress={() => setCurrentScore(score.toString())}
                  >
                    <Text className="font-medium" style={{ color: "#2C3E50" }}>
                      {score}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Feedback */}
            <View>
              <Text
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Feedback
              </Text>
              <TextInput
                className="p-4 rounded-xl border-2 text-base"
                style={{
                  borderColor: "#D0E8E6",
                  backgroundColor: "#FFFFFF",
                  color: "#2C3E50",
                  height: 120,
                }}
                placeholder="Provide feedback to the student..."
                placeholderTextColor="#A1EBE5"
                multiline
                textAlignVertical="top"
                value={currentFeedback}
                onChangeText={setCurrentFeedback}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="mt-6 space-y-3">
            <TouchableOpacity
              className="py-4 rounded-xl items-center justify-center"
              style={{ backgroundColor: "#1ABC9C" }}
              onPress={handleSaveGrade}
            >
              <Text className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
                Save Grade & Feedback
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-4 rounded-xl items-center justify-center border-2"
              style={{
                borderColor: "#D0E8E6",
                backgroundColor: "#FFFFFF",
              }}
              onPress={() => setSelectedStudent(null)}
            >
              <Text
                className="text-lg font-semibold"
                style={{ color: "#2C3E50" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default GradingUI;
