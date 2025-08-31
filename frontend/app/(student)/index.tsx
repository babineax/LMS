import { Text, View,  TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularProgress from "../../components/CircularProgress";

const courses = [
  {
    title: "Data Structures and Algorithms",
    description: "Learn to code",
  },
  {
    title: "Introducton to Web Development",
    description: "Learn to code",
  },
//   {
//     title: "Course 3",
//     description: "Learn to code",
//   },
//   {
//     title: "Course 4",
//     description: "Learn to code",
//   },
];

export default function StudentSignUpScreen() {

    return (
        <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView className="flex-1">
            <ScrollView className="flex-grow bg-bgMain px-2.5 py-6">
                <View className="py-4">
                    <Text className="text-2xl text-headingColor font-bold">
                        Computer Science
                    </Text>
                </View>
                {/* first row */}
                <View className="flex-row justify-center items-center py-3 gap-3">
                    <View className="flex-1">  
                        <View className="flex-col justify-center bg-bgLight px-3.5 py-10 rounded-lg">
                        <Text className="text-headingColor text-left text-xl font-bold">
                            Hello Jane!
                        </Text>
                        <Text className="text-base text-wrap">
                            Continue with your learning journey
                        </Text>
                    </View>
                    </View>
                    <View className="flex-1">  
                        <View className="flex items-center bg-bgLight px-4 py-5 rounded-lg">
                        <TouchableOpacity className="bg-actionColor py-4 px-6 rounded-lg">
                            <Text className="text-white font-semibold">New Course</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                    
                </View>
                {/* second row */}
                <View className="flex-row justify-center items-center gap-3 py-3">
                    {/* courses */}
                    <View className="flex-1">
                        <View className="py-2">
                            <Text className="text-xl text-headingColor font-bold">
                                Your Courses
                            </Text>
                        </View>
                        
                        <View className="flex-row flex-grow flex-wrap gap-3 pb-3">
                            {courses.map((course, index) => (
                                <View key={index} className="bg-bgLight px-3 py-10 rounded-lg">
                                    <Text className="text-headingColor text-left text-lg font-bold">{course.title}</Text>
                                    <Text className="text-xl">{course.description}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    {/* course progress */}
                    <View className="flex-1">
                        <View className="items-center bg-bgLight px-4 py-10 rounded-lg">
                            <View className="py-4">
                                <Text className="text-center font-bold text-headingColor text-xl">Course Progress</Text>
                            </View>
                            <View>
                                <CircularProgress
                                    size={100}
                                    progress={75}    
                                />
                            </View>
                        
                        </View>
                    </View>
                    
                </View>
                {/* third row */}
                <View className="flex-row justify-center gap-3 py-3 flex-wrap">
                    <View className="flex-1">
                        <View className="py-2">
                            <Text className="text-xl font-bold text-headingColor">Upcoming Events</Text>
                        </View>
                        <View className="flex-col bg-bgLight px-3.5 py-10 rounded-lg">
                            <Text className="text-left text-xl text-wrap">
                                Upcoming Rendercon event in the school hall
                            </Text>
                        </View>
                    </View>
                     <View className="flex-1 h-full">
                        <View className="py-2">
                            <Text className="text-xl font-bold text-headingColor">Announcements</Text>
                        </View>
                        <View className="flex-col bg-bgLight px-3.5 py-10 rounded-lg">
                            <Text className="text-left text-xl text-wrap">
                                Upcoming math test on 10th July
                            </Text>
                            
                        </View>
                     </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )};