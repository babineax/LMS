import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import EnrollStudentForm from "@/components/form/enrollStudent";
import { supabase } from "@/libs/supabase";

type studentList = {
  id: string;
  student_name: string;
  course_title: string;
};

const StudentsTab = () => {
  const [showEnrollStudent, setShowEnrollStudent] = useState(false);
  const [studentList, setStudentList] = useState<studentList[]>([]);

  const fetchEnrolledStudents = async () => {
    const { data, error } = await supabase
      .from("enrollment")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching enrolled students:", error);
      return;
    }

    setStudentList(data);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

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
      {studentList.length === 0 && (
        <View className="bg-white rounded-xl p-8 items-center shadow-sm my-6">
          <Ionicons name="people" size={64} color="#A1EBE5" />
          <Text className="text-lg font-medium text-[#2C3E50] mt-4 mb-2">
            Student Management Coming Soon
          </Text>
          <Text className="text-gray-600 text-center text-sm">
            View and manage all your students in one place
          </Text>
        </View>
      )}
      <View className="py-3 px-2">
        <Text className="font-semibold py-2">Students in your courses</Text>
        {studentList.map((student) => (
          <View key={student.id} className="flex-row justify-between items-center border-b-hairline border-border py-2 px-4">
            <Text className="text-headingColor text-sm">{student.student_name}</Text>
            <Text className="text-headingColor text-sm">{student.course_title}</Text>
          </View>
        ))}
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
