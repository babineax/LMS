import { View,Text } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentProfile() {
    const {user, profile} = useAuth();

    console.log("User:", profile);

    return (
        <View className="flex-1 bg-bgMain">
            <View className="px-4">
                <View className="my-2 border-b-hairline ">
                    <Text className="py-2 text-base text-headingColor font-semibold">
                        Full Name
                    </Text>
                    <Text className="text-base text-headingColor">
                        {profile?.full_name}
                    </Text>
                </View>
                <View className="my-2 border-b-hairline ">
                    <Text className="py-2 text-base text-headingColor font-semibold">
                        Email
                    </Text>
                    <Text className="text-base text-headingColor">
                        {profile?.email}
                    </Text>
                </View>
                <View className="my-2 border-b-hairline ">
                    <Text className="py-2 text-base text-headingColor font-semibold">
                        Phone Number
                    </Text>
                    <Text className="text-base text-headingColor">
                        {user?.phone?.trim() === "" ? "Not provided" : user?.phone}
                    </Text>
                </View>
            </View>
        </View>
    )
}