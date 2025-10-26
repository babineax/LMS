import { View, ScrollView, Text } from "react-native";
export default function Settings() {
  return (
    <View className="flex-1 bg-bgLight">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-headingColor font-semibold text-lg mb-3">
            Settings
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}