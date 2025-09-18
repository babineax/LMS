import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <ScrollView 
        className="px-6" 
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 mt-4">
          <View>
            <TouchableOpacity
              className="my-2 py-1 border-b-hairline border-headingColor"
            >
              <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="my-2 py-1 border-b-hairline border-headingColor"
            >
              <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="my-2 py-2 border-b-hairline border-headingColor"
              onPress={() => router.push("/help")}
            >
              <Text>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
      
  );
}