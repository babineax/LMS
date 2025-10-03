import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "../components/Landingpage/SplashScreen";
import LandingPage from "../components/Landingpage/LandingPage";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" className="bg-bgLight" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-bgLight">
          {/* Company Logo */}
          <View className="flex-row items-center justify-center my-8 py-8">
            <View className="bg-primaryColor p-12 rounded-xl">
              <School size={100} color="white" />
            </View>
          </View>
          {/* Hero Section */}
          <View className="items-center">
            <Text className="text-[#2C3E50] font-extrabold text-4xl text-center mb-3">
              Welcome to Our Learning Hub
            </Text>
            <Text className="text-[#2C3E50] text-lg font-extralight text-center">
              {/* Unlock your full potential with our comprehensive courses. */}
              Get started
            </Text>
          </View>
          <View className="flex-row items-center justify-center flex-wrap my-8 py-6 gap-16">
            <TouchableOpacity onPress={() => router.push("/(auth)/sign")}>
              <View className="items-center p-4 ">
                <UserStar size={100} color="#1ABC9C" />
                <Text>Admin</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(auth)/signUp?role=teacher")}>
              <View className="items-center p-4 ">
                <UserCheck size={100} color="#1ABC9C" />
                <Text>Teacher</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign?role=student")}>
              <View className="items-center p-4 ">
                <GraduationCap size={100} color="#1ABC9C" />
                <Text>Student</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
