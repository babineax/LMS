import { Text, View,  TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularProgress from "../../components/CircularProgress";
import Card from "@/components/Card";

const courses = [
  {
    title: "Data Structures and Algorithms",
    description: "Learn to code",
  },
  {
    title: "Introducton to Web Development",
    description: "Learn to code",
  },

];

export default function StudentSignUpScreen() {



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
                            Hello Jane!
                        </Text>
                        <Text className="text-xl text-wrap">
                            Continue with your learning journey
                        </Text>
                    </Card>
                    <Card className="flex items-center px-4 py-5">
                        <TouchableOpacity className="bg-actionColor py-4 px-6 rounded-lg">
                            <Text>New Course</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
                {/* second row */}
                <View className="flex-row justify-center p-3 ">
                    {/* courses */}
                    <View className="flex-1 ">
                        <View className="py-2">
                            <Text className="text-xl text-headingColor font-bold">
                                Your Courses
                            </Text>
                        </View>
                        
                        <View className="flex-row flex-grow flex-wrap gap-3 pb-3">
                            {courses.map((course, index) => (
                                <Card key={index} className="px-3" onPress={() => router.push("/(student)/courses")}>
                                    <Text className="text-headingColor text-left text-lg font-bold">{course.title}</Text>
                                    <Text className="text-xl">{course.description}</Text>
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
                        progress={75}
                        
                        
                      />
                    </Card>
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