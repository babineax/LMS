import { Text, View} from "react-native";

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

export default function Grades() {
    return (
        <View className="flex-1 bg-bgMain">
            <View className="flex-col px-4 py-14">
                <View className="py-2">
                    <Text className="text-2xl font-semibold text-headingColor">Graded Units</Text>
                </View>
                
                <View className="flex-col bg-bgLight px-3.5 py-10 rounded-lg">
                    <Text>Introduction to Data Structures and Algorithms</Text>
                    <Text>By: John Doe</Text>
                </View>
            </View>
        </View>
    )
}