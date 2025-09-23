import { Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Card from "@/components/Card";
import { CheckCircle } from "lucide-react-native";
import CustomProgressBar from "@/components/LinearProgress";

export default function Grades() {
    const { courses } = useAuth();
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);    

    return (
        <ScrollView className="flex-1 bg-bgMain"
            // contentContainerClassName="flex-1 justify-center items-center"
        >
            {courses.length === 0 && (
                <View className="flex-1 justify-center items-center mt-12 pt-12">
                    <Text className="text-center text-4xl">📚</Text>
                    <Text className="text-headingColor text-center text-xl">
                        Please enroll in a course to view your grades
                    </Text>
                </View>
            )}
            {courses.length > 0 && (
                <View className="p-4">
                    {courses.map((course) => {
                        const isExpanded = selectedCourseId === course.id;
                        
                        return (
                            <View key={course.id}>
                                <Card 
                                    
                                    onPress={() => {
                                        setSelectedCourseId(isExpanded ? null : course.id)
                                    }}
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
                                            {course.lessons.map((lesson) => { 
                                                const isCompleted = lesson.isCompleted;
                                                return (
                                                <View key={lesson.id} className="relative w-[47%]">
                                                    <Card className={`mt-4 ${isCompleted ? "bg-completed" : "bg-bgLight"}`}>
                                                        <Text className="text-headingColor text-left text-lg font-bold">
                                                            {lesson.title}
                                                        </Text>
                                                        <Text>{lesson.type}</Text>
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
                                            )})}
                                        </View>
                                    </View>
                                )}
                                
                                
                            </View>
                        )
                    })}
                    {courses.length > 0 && (
                        <>
                            <View className="py-4">
                                <Text className="text-headingColor font-semibold text-lg">
                                    Lesson Progress
                                </Text>
                                {courses.map((course) => {

                                    const totalLessons = course.lessons.length;
                                    const completedLessons = course.lessons.filter(lesson => lesson.isCompleted).length;

                                    const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;
                                    return (
                                        <View key={course.id} className="py-2">
                                            <Text className="text-headingColor text-left text-base mt-2 py-2">
                                                {course.title}
                                            </Text>
                                            <CustomProgressBar progress={progress}  />
                                        </View>                           
                                    )
                                })}
                            </View>
                            <View className="py-4">
                                <Text className="text-headingColor font-semibold text-lg">
                                    Grades
                                </Text>
                                
                                {courses.map((course) => (
                                    <View key={course.id} className="">
                                        {course.lessons.map((lesson) => (
                                            <View key={lesson.id} className="flex-row justify-between gap-3">
                                                {lesson.type === "quiz" && lesson.isCompleted && (
                                                    <Text className="text-headingColor text-left text-base">
                                                        {lesson.title}
                                                    </Text>
                                                )}
                                                {lesson.type === "quiz" && !lesson.isCompleted && (
                                                    <>
                                                        <Text className="text-headingColor text-left text-lg">
                                                            {lesson.title}
                                                        </Text>
                                                        <View style={{}}>
                                                            <Text className="text-headingColor text-left text-md">Pending</Text>
                                                        </View>
                                                    </>
                                                    
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                    )
                                )}
                                
                            </View>
                        </>
                    )}
                    
                </View>
            )}
            
        </ScrollView>
    )
}