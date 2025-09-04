import { Text, View,  TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularProgress from "../../components/CircularProgress";
import Card from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";


export default function StudentSignUpScreen() {
    const { courses, profile } = useAuth();

    const slicedCourses = courses.slice(0, 2);

    const calculateProgress = () => {
        if (!courses || courses.length === 0) return 0;

        // Single course
        if (courses.length === 1) {
        const course = courses[0];
        const completedLessons = course.lessons.filter((l) => l.isCompleted).length;
        return (completedLessons / course.lessons.length) * 100;
        }

        // Multiple courses → weighted percentage
        const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
        const totalCompleted = courses.reduce(
        (sum, c) => sum + c.lessons.filter((l) => l.isCompleted).length,
        0
        );

        return (totalCompleted / totalLessons) * 100;
    };

    const progress = calculateProgress();

    return (
        <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView className="flex-1">
            <ScrollView className="flex-grow bg-bgMain py-6">
                <View className="p-4">
                    <Text className="text-xl text-headingColor font-bold">
                        LMS
                    </Text>
                </View>
                {/* first row */}
                <View className="flex-row justify-center items-center py-3 gap-3">
                    
                    <Card className="flex-col justify-start">
                        <Text className="text-headingColor text-left text-2xl font-bold">
                            Hello {profile?.full_name}!
                        </Text>
                        <Text className="text-xl text-wrap">
                            Continue with your learning journey
                        </Text>
                    </Card>
                    <Card className="flex items-center px-4 py-5">
                        <TouchableOpacity 
                            onPress={() => router.push("/(student)/courses")}
                            className="bg-actionColor py-4 px-6 rounded-lg"
                        >
                            <Text>New Course</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
                {/* second row */}
                <View className="flex-row justify-center p-3 gap-3">
                    {courses.length === 0 && (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-center text-4xl">📚</Text>
                            <Text className="text-headingColor text-center text-xl">
                                Please enroll into a course
                            </Text>
                        </View>
                    )}
                    <>
                        {/* courses */}
                        <View className="flex-1 ">
                            <View className="py-2">
                                <Text className="text-xl text-headingColor font-bold">
                                    Your Courses
                                </Text>
                            </View>
                            
                            <View className="flex-row flex-grow flex-wrap gap-3 pb-3">
                                {slicedCourses.map((course, index) => (
                                    <Card 
                                        key={index} 
                                        className="px-3" 
                                        onPress={() => router.push("/(student)/grades")}
                                    >
                                        <Text className="text-headingColor text-left text-lg font-bold">{course.title}</Text>
                                        <Text className="text-base">{course.description.slice(0, 90)}</Text>
                                    </Card>
                                ))}    
                            </View>
                        </View>
                        {/* course progress */}
                        <Card className="items-center px-4">
                            <View className="py-4">
                                <Text className="font-bold text-headingColor text-xl">Course Progress</Text>
                            </View>
                            <CircularProgress
                                size={100}
                                progress={progress}
                            />
                        </Card>
                    </>
                    
                </View>
                {/* third row */}
                <View className="flex-row justify-between gap-3 p-3">
                    <View className="w-[47%]">
                        <View className="py-2">
                            <Text className="text-xl font-bold text-headingColor">Upcoming Events</Text>
                        </View>
                        <Card className="flex-col ">
                            <Text className="text-left text-xl text-wrap">
                                Upcoming math test on 10th July
                            </Text>
                        </Card>
                    </View>
                     <View className="w-[47%]">
                        <View className="py-2">
                            <Text className="text-xl font-bold text-headingColor">Announcements</Text>
                        </View>
                        <Card className="flex-col ">
                            <Text className="text-left text-xl text-wrap">
                                Upcoming math test on 10th July
                            </Text>
                            
                        </Card>
                     </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )};