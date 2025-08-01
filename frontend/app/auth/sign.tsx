import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { validateEmail, getAuthErrorMessage } from "@/utils/validation";

type RootStackParamList = {
  index: undefined;
  "auth/signUp": undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

interface FormData {
  email: string;
  password: string;
  role: "Admin" | "Teacher" | "Student" | undefined;
}

export default function Index() {
  const navigation = useNavigation<NavigationProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const roles = ["Admin", "Teacher", "Student"];
  const { signIn, refreshProfile } = useAuth();

  const showMessage = (msg: string, success: boolean) => {
    setMessage(msg);
    setIsSuccess(success);
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (errorMessage) setErrorMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setErrorMessage(getAuthErrorMessage(error));
        return;
      }

      const freshProfile = await refreshProfile();
      const name = freshProfile?.full_name || "User";

      showMessage(`Welcome back, ${name}`, true);

      setTimeout(() => {
        navigation.navigate("index");
      }, 2000);
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 p-5 bg-[#F1FFF8] relative">
        <View className="flex-row p-5 justify-between mb-5 mt-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View className="p-5">
          <Text className="text-4xl text-[#2C3E50] font-bold">
            Welcome Back to
          </Text>
          <Text className="text-4xl text-[#2C3E50] font-bold">
            Your Account
          </Text>
          <Text className="text-xs text-[#2C3E50]">
            Enter your email and password to sign back.
          </Text>
        </View>

        <View className="mt-11 p-5">
          <View>
            <Text className="text-lg text-[#2C3E50] mb-2">Email</Text>
            <TextInput
              keyboardType="email-address"
              className="border border-[#1ABC9C] rounded-lg h-12 px-2.5"
              placeholder="Enter your Email"
              placeholderTextColor="#7E7B7B"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              autoCapitalize="none"
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
            )}
          </View>

          <View className="mt-5">
            <Text className="text-lg text-[#2C3E50] mb-2">Password</Text>
            <View className="flex-row border border-[#1ABC9C] items-center h-12 rounded-lg px-2.5">
              <TextInput
                className="flex-1"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#7E7B7B"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={24}
                  color="#7E7B7B"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity>
            <Text className="text-lg mt-2 text-right text-[#34967C]">
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View className="mt-5">
            <Text className="text-lg text-[#2C3E50] mb-2">Sign in as:</Text>
            <View className="flex-row justify-around">
              {roles.map((role) => (
                <TouchableOpacity
                  key={role}
                  className={`py-2 px-4 rounded-full ${
                    formData.role === role
                      ? "bg-[#1ABC9C]"
                      : "border border-[#1ABC9C]"
                  }`}
                  onPress={() =>
                    handleInputChange(
                      "role",
                      role as "Admin" | "Teacher" | "Student"
                    )
                  }
                >
                  <Text
                    className={`${
                      formData.role === role ? "text-white" : "text-[#1ABC9C]"
                    } font-semibold`}
                  >
                    {role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.role && (
              <Text className="text-red-500 text-sm mt-1 text-center">
                {errors.role}
              </Text>
            )}
          </View>
        </View>

        <View className="px-5">
          {errorMessage && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
              <Text className="text-red-600 text-sm text-center">
                {errorMessage}
              </Text>
            </View>
          )}

          <TouchableOpacity
            className="bg-[#2B876E] h-[53px] rounded-lg mt-6 flex justify-center items-center shadow-md"
            onPress={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-lg text-white font-semibold">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2.5 mt-7 px-5">
          <View className="border-t border-[#2C3E50] flex-1"></View>
          <Text className="text-lg font-medium text-[#2C3E50]">OR</Text>
          <View className="border-t border-[#2C3E50] flex-1"></View>
        </View>

        <View className="flex-row absolute bottom-8 left-0 right-0 justify-center">
          <Text className="text-base text-[#2C3E50]">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("auth/signUp")}>
            <Text className="text-base text-[#34967C] font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Custom Message Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="flex-1 items-center bg-black bg-opacity-50">
            <View
              className={`p-5 rounded-lg shadow-lg mt-20 ${
                isSuccess ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <Text className="text-white text-lg font-semibold text-center">
                {message}
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
