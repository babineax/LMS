import { View,Text } from "react-native";

export default function StudentProfile() {
    return (
        <View className="flex-1 bg-bgMain">
            <View className="flex-row justify-center items-center p-10">
                <Text className="text-3xl text-headingColor font-bold">
                   Profile
                </Text>
            </View>
        </View>
    )
}