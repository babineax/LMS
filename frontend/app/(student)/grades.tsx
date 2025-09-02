import { Text, View} from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Card from "@/components/Card";
import { CheckCircle } from "lucide-react-native";


export default function Grades() {
    const { courses } = useAuth();
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);    const [showCourseContent, setShowCourseContent] = useState(false);
    return (
        <View className="flex-1 bg-bgMain">
            <View className="p-3">
                {courses.length === 0 && (
                    <View className="items-center py-12">
                        <Text>
                            Please enroll in a course to view your grades
                        </Text>
                    </View>
                )}
                {courses.map((course) => {
                    const isExpanded = selectedCourseId === course.id;
                    return (
                    <View key={course.id}>
                        <Card 
                             
                            onPress={() => setShowCourseContent(!showCourseContent)}
                            className="mt-8"
                        >
                            <Text className="text-headingColor text-left text-xl">
                                {course.title}
                            </Text>
                            <Text className="text-headingColor text-left text-lg font-bold">
                                {course.instructor.name}
                            </Text>
                        </Card>
                        {isExpanded && ( 
                            <View>
                                <Text className="text-headingColor text-left text-2xl font-semibold mt-2 py-2">
                                    Course Content
                                </Text>
                                <View className="flex-row justify-between gap-3 flex-wrap">
                                    {course.lessons.map((lesson) => (
                                        <View key={lesson.id} className="relative w-[47%]">
                                            <Card className={`mt-4 ${lesson.isCompleted ? "bg-[#79A0A3]" : "bg-bgLight"}`}>
                                                <Text className="text-headingColor text-left text-lg font-bold">
                                                    {lesson.title}
                                                </Text>
                                                <Text className="text-headingColor text-left text-md">
                                                    {lesson.duration}
                                                </Text>
                                            </Card>
                                            {lesson.isCompleted &&(
                                                <View className="absolute inset-0 items-center justify-center">
                                                    <CheckCircle size={30} color="#2C3E50" />
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                        
                        
                    </View>
                    )
                })}
                
            </View>
            
        </View>
    )
}