import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/libs/supabase";
import { Database } from "@/types/database";
import { X } from "lucide-react-native";
import BottomSheetSearchableList from "../SearchableModal";

type Student = Database['public']['Tables']['users']['Row'];
type Course = Database['public']['Tables']['courses']['Row'];

interface EnrollStudentFormProps {
    onClose:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EnrollStudentForm({ onClose }: EnrollStudentFormProps) {
    const { user, profile, token } = useAuth();
    const [studentdata, setStudentData] = useState<Student | null>(null);
    const [coursedata, setCourseData] = useState<Course []>([]);
    const [showCoursePicker, setShowCoursePicker] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        studentID:'',
        courseId: '',
        courseTitle: '',
    });

    console.log(user)
    console.log(profile)
    console.log(token)

    const fetchData = async () => {
        if (!user?.id) {
            console.warn("No user found, skipping fetch");
            return;
        }
        const {data:coursedata, error: courseError} = await supabase
            .from('courses')
            .select('id, title')
            .eq('teacher_id', user.id)

        if (courseError) {
            console.error('Error fetching courses:', courseError);
            return;
        }

        setCourseData(coursedata);
    };

    const handleEnroll = async () => {
        try {

            const courseId = formData.courseId;
            const courseTitle = formData.courseTitle;

            const studentId = studentdata?.id;
            const studentName = studentdata?.full_name;
            const studentEmail = formData.studentEmail;

            console.log('Student data:', studentdata);
            const { data, error } = await supabase
                .from('enrollment')
                .insert({
                    course_id: courseId,
                    course_title: courseTitle,
                    student_id: studentId,
                    student_email: studentEmail,
                    student_name: studentName,
                })
                .select();


            if (error) {
                console.error('Error enrolling student:', error);
                return;
            } else if (data && data.length > 0) {
                console.log("Student enrolled:", data);
                Alert.alert("Success", "Student enrolled successfully!");
                setFormData({
                    studentEmail: "",
                    studentID: "",
                    studentName: "",
                    courseTitle: "",
                    courseId:""
                });
             }

            console.log('Student enrolled:', data);
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    useEffect(() => {
    if (!formData.studentEmail) return;

    const fetchStudent = async () => {
      const { data: student, error } = await supabase
        .from("users")
        .select("id, full_name")
        .eq("email", formData.studentEmail)
        .maybeSingle();

      if (error) {
        console.error("Error fetching student:", error);
        return;
      }

      if (student) {
        setFormData((prev) => ({
          ...prev,
          studentID: student.id,
          studentName: student.full_name,
        }));
        setStudentData(student);
      } else {
        // clear if not found
        setFormData((prev) => ({
          ...prev,
          studentID: "",
          studentName: "",
        }));
        setStudentData(null);
      }
    };

    fetchStudent();
  }, [formData.studentEmail]);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View className="flex-1 ">
            <Modal visible={true} animationType="slide">
                
                <View className="flex-1 bg-bgLight">
                    <View className="p-4 items-end">
                        <X size={24} color="#2C3E50" onPress={() => onClose(false)} />
                    </View>
                    <View className="px-4 py-2 gap-2">
                        <Text className="text-headingColor text-left text-base mt-4">
                            Student Email
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            className="rounded-lg p-3 border-hairline border-[#1ABC9C]"
                            placeholder="Enter Student Email"
                            placeholderTextColor="#2C3E50"
                            placeholderClassName="text-headingColor text-sm"
                            value={formData.studentEmail}
                            onChangeText={(value) => setFormData({ ...formData, studentEmail: value })}
                        />
                    </View>
                    <View className="px-4 gap-2">
                        <Text className="text-headingColor text-left text-base">
                            Student Name
                        </Text>
                        <TextInput
                            className="rounded-lg p-3 border-hairline border-[#1ABC9C]"
                            placeholder="Enter Student Name"
                            placeholderTextColor="#2C3E50"
                            placeholderClassName="text-headingColor text-sm"
                            value={formData.studentName}
                            onChangeText={(value) => setFormData({ ...formData, studentName: value })}
                        />
                    </View>
                    <View className="px-4 gap-2">
                        <Text className="text-headingColor text-left text-base">
                            Student ID
                        </Text>
                        <TextInput
                            className="rounded-lg p-3 border-hairline border-[#1ABC9C]"
                            placeholder="Enter Student Name"
                            placeholderTextColor="#2C3E50"
                            placeholderClassName="text-headingColor text-sm"
                            value={formData.studentID}
                            onChangeText={(value) => setFormData({ ...formData, studentID: value })}
                        />
                    </View>
                    <React.Fragment>
                        <View className="px-4 gap-2">
                            <Text className="text-headingColor text-left text-base mt-4">
                                Course Title
                            </Text>
                            <TouchableOpacity
                                className="rounded-lg p-3 border-hairline border-[#1ABC9C]"
                                onPress={() => setShowCoursePicker(true)}
                            >
                                <Text>{formData.courseTitle || "Select a Course"}</Text>
                            </TouchableOpacity>
                        </View>
                        {showCoursePicker && 
                            <BottomSheetSearchableList
                                visible={showCoursePicker}
                                data={coursedata}
                                displayKey="title"
                                onSelect={(course) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        courseId: course.id,
                                        courseTitle: course.title,
                                    }));
                                    setShowCoursePicker(false);
                                }}
                                onClose={() => setShowCoursePicker(false)}
                            />
                        }
                    </React.Fragment>
                     
                    <View className="px-4 gap-2">
                        <Text className="text-headingColor text-left text-base mt-4">
                            Course ID
                        </Text>
                        <TextInput
                            className="rounded-lg p-3 border-hairline border-[#1ABC9C]"
                            placeholder="Enter Course ID"
                            placeholderTextColor="#2C3E50"
                            placeholderClassName="text-headingColor text-sm"
                            value={formData.courseId}
                            onChangeText={(value) => setFormData({ ...formData, courseId: value })}
                        />
                    </View>
                    <View className="px-4 py-4 gap-2">
                        <TouchableOpacity
                            className="bg-[#1ABC9C] rounded-lg px-8 py-4 items-center justify-center"
                            onPress={() => handleEnroll()}
                        >
                            <Text className="text-white text-base">
                                Enroll
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}