import { ArrowLeft } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AddUserUI() {
  return (
    <SafeAreaView className="flex-1 bg-[#F1FFF8]">
      {/* Header */}
      <View className="bg-[#1ABC9C] pt-4 pb-6 px-4">
        <view className="flex-row items-center">
          <TouchableOpacity
            className="mr-3"
            onPress={() => console.log("Back pressed")}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white">Add New User</Text>
            <Text className="text-[#D0E8E6] mt-1">
              Create a new account for your LMS
            </Text>
          </View>
        </view>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        >
          {/* Personal Information Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-[#2C3E50] mb-4">
              Personal Information
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
