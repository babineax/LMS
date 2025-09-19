import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TeachersSettings() {
    return (
        <View className="flex-1 bg-bgLight">
            <View className="px-4 py-4 mt-8">
                <View className="border-b-hairline py-2 my-4">
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/resetPassword")}
                    >
                        <Text className=" text-base text-headingColor ">
                            Reset Password
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className=" border-b-hairline ">
                    <TouchableOpacity>
                        <Text className="mt-4 text-base text-headingColor ">
                            Notifications Preferences
                        </Text> 
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}