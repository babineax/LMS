import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getAuthErrorMessage, validateSignUpForm } from "@/utils/validation";
import { router, useLocalSearchParams } from "expo-router";
import BottomSheetModal from "@/components/BottomSheetModal";
import { createClient } from "@supabase/supabase-js";

type Role = "admin" | "student" | "teacher";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  institutionId: string;
}

type Institution = {
  id: string;
  name: string;
};

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useLocalSearchParams<{ role?: string }>();
  const [showInstitutionModal, setShowInstitutionModal] = useState(false);
  const [institutions, setInstitutions] = useState<{ label: string; value: string }[]>([]);


  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: (role as Role) || "student",
    institutionId: "",
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Function to show a custom message modal
  const showMessage = (msg: string, success: boolean) => {
    setMessage(msg);
    setIsSuccess(success);
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      if (success) {
        router.push("/sign");
      }
    }, 2000);
  };

  // Getting signUp function from auth context
  const { signUp } = useAuth();

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clears error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const openInstitutionModal = async () => {
    const { data, error } = await supabase
    .from("institutions")
    .select("id, name");


    if (error) {
      console.error("Error fetching institutions:", error.message);
      return;
    }

    const formatted = (data ?? []).map(inst => ({
      label: inst.name,
      value: inst.id,
    }));

    setInstitutions(formatted);
    setShowInstitutionModal(true);
  };

  // Function to handle form submission
  const onSubmit = async () => {

    if (formData.role === "teacher" && !formData.institutionId) {
      setErrors({ institutionId: "Institution is required for teachers" });
      return;
    }
    // Validate form
    const validation = validateSignUpForm({
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      fullName: formData.name,
      role: formData.role,
      institution_id: formData.institutionId,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Registering user with Supabase
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.name,
        role: formData.role,
        ...(formData.role === "teacher" && { institution_id: formData.institutionId }),
      });

      if (error) {
        showMessage(
          `Registration failed: ${getAuthErrorMessage(error)}`,
          false
        );
        return;
      }

      // Show success message and redirect to sign in
      showMessage("Account created successfully! Please sign in.", true);
    } catch (error) {
      showMessage(
        `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
        false
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-bgLight font-sans">
        <View className="flex-1 p-10">
          <View className="flex-row justify-between mb-5 mt-3">
            <TouchableOpacity onPress={() => router.push("/")}>
              <Ionicons name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text className="text-4xl text-[#2C3E50] font-bold">
            {role === 'teacher' ? 'Signing up as an instructor':'Create Your Account'}
          </Text>
          <Text className="text-xs text-[#2C3E50] mt-1">
            Enter your details to create an account.
          </Text>

          {/* Form */}
          <View className="mt-11 space-y-5">
            {/* Full Name */}
            <View>
              <Text className="text-lg text-[#2C3E50] mb-2">Full Name</Text>
              <TextInput
                className="border border-[#1ABC9C] rounded-lg h-12 px-2.5 text-[#2C3E50]"
                placeholder="Enter your full name"
                placeholderTextColor="#7E7B7B"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
              />
              {errors.fullName && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.fullName}
                </Text>
              )}
            </View>
            
            {/* Institution ID */}
            {role === "teacher" && (
              <View>
                <Text className="text-lg text-headingColor mb-2">Institution ID</Text>
                <TouchableOpacity
                  className="flex-row items-center border border-[#1ABC9C] h-12 rounded-lg px-2.5 relative"
                  onPress={openInstitutionModal}
                >
                  <Text>
                    {formData.institutionId
                      ? institutions.find(item => item.value === formData.institutionId)?.label
                      : "Institution ID"}
                  </Text>
                </TouchableOpacity>
                <BottomSheetModal
                  visible={showInstitutionModal}
                  onClose={() => setShowInstitutionModal(false)}
                  items={institutions}
                  onSelect={(item) => {
                    setFormData((prev) => ({ ...prev, institutionId: item.value }));
                    setShowInstitutionModal(false);
                  }}
                />
                {errors.institutionId && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.institutionId}
                  </Text>
                )}
              </View>
            )}

            {/* Email */}
            <View>
              <Text className="text-lg text-[#2C3E50] mb-2">Email</Text>
              <TextInput
                keyboardType="email-address"
                className="border border-[#1ABC9C] rounded-lg h-12 px-2.5 w-full focus:border-[#2B876E] focus:ring-2 focus:ring-[#2B876E]"
                placeholder="Enter your email"
                placeholderTextColor="#7E7B7B"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                autoCapitalize="none"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password */}
            <View>
              <Text className="text-lg text-[#2C3E50] mb-2">Password</Text>
              <View className="flex-row items-center border border-[#1ABC9C] h-12 rounded-lg px-2.5 relative">
                <TextInput
                  secureTextEntry={!showPassword}
                  className="flex-1 text-[#2C3E50]"
                  placeholder="Enter your password"
                  placeholderTextColor="#7E7B7B"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                />
                <TouchableOpacity
                  className="absolute right-3 p-1"
                  onPress={() => setShowPassword(!showPassword)}
                >
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

            {/* Confirm Password */}
            <View>
              <Text className="text-lg text-[#2C3E50] mb-2">
                Confirm Password
              </Text>
              <View className="flex-row items-center border border-[#1ABC9C] h-12 rounded-lg px-2.5 relative">
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 text-[#2C3E50]"
                  placeholder="Confirm your password"
                  placeholderTextColor="#7E7B7B"
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                />
                <TouchableOpacity
                  className="absolute right-3 p-1"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesome
                    name={showConfirmPassword ? "eye" : "eye-slash"}
                    size={24}
                    color="#7E7B7B"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            className="bg-[#2B876E] px-5 py-3 rounded-lg mt-6 flex justify-center items-center w-full shadow-md"
            onPress={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text className="text-lg text-white font-semibold">
                Create Account
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Bottom Sign In link */}
        <View className="flex-row justify-center mb-8">
          <Text className="text-lg text-[#2C3E50]">Have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign")}>
            <Text className="text-lg text-[#2B876E] font-semibold ml-1">
              Sign In
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
          <View className="flex-1 items-center bg-black/50">
            <View
              className={`p-5 rounded-lg shadow-lg mt-20 ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
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
