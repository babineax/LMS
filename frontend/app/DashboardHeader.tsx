import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "@/utils/fileUpload";
const DashboardHeader: React.FC = () => {

  const { profile } = useAuth();
  console.log(profile);


  return (
    <View className="px-6 pt-4 pb-2">
      {/* <Text className="text-2xl font-bold text-[#2C3E50] mb-1">
        Teachers Dashboard
      </Text> */}
      <Text className="text-gray-600 text-base">
        Welcome back {profile?.full_name}! 
      </Text>
      <Text className="text-gray-600 text-xs">
        Here&apos;s what&apos;s happening with your courses.
      </Text>
    </View>
  );
};

export default DashboardHeader;
