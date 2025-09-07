import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  Clock,
  RefreshCw,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { router } from "expo-router";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function ForgotPasswordUI() {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Enter Email Address",
      subtitle: "We'll send you a reset link",
      icon: <Mail size={60} color="#1ABC9C" />,
    },
    {
      id: 2,
      title: "Check Your Email",
      subtitle: "Enter the verification code",
      icon: <Clock size={60} color="#1ABC9C" />,
    },
    {
      id: 3,
      title: "Reset Password",
      subtitle: "Create a new secure password",
      icon: <Shield size={60} color="#1ABC9C" />,
    },
    {
      id: 4,
      title: "Success!",
      subtitle: "Your password has been reset",
      icon: <CheckCircle size={60} color="#1ABC9C" />,
    },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim())
      return Alert.alert("Error", "Please enter your email address");
    if (!validateEmail(email))
      return Alert.alert("Error", "Please enter a valid email address");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      startCountdown();
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (!resetCode.trim() || resetCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit verification code");
      return;
    }
    setCurrentStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      return Alert.alert("Error", "Please fill in both password fields");
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }
    if (newPassword.length < 8) {
      return Alert.alert(
        "Error",
        "Password must be at least 8 characters long"
      );
    }
    setCurrentStep(4);
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    Alert.alert(
      "Code Sent",
      "A new verification code has been sent to your email"
    );
    startCountdown();
  };

  const InputField = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
    maxLength,
    showPasswordToggle = false,
    isPasswordVisible,
    onTogglePassword,
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric";
    maxLength?: number;
    showPasswordToggle?: boolean;
    isPasswordVisible?: boolean;
    onTogglePassword?: () => void;
  }) => (
    <View className="flex-row items-center border border-[#1ABC9C] h-12 rounded-lg px-2.5 relative mb-6">
      <TextInput
        style={{ fontSize: 16, color: "#2C3E50", paddingVertical: 4, flex: 1 }}
        placeholder={placeholder}
        placeholderTextColor="#7E7B7B"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
      />
      {showPasswordToggle && (
        <TouchableOpacity
          onPress={onTogglePassword}
          className="ml-2"
          activeOpacity={0.7}
        >
          {isPasswordVisible ? (
            <EyeOff size={20} color="#7E7B7B" />
          ) : (
            <Eye size={20} color="#7E7B7B" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  const renderStep1 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[0].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4">
          {steps[0].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2">
          {steps[0].subtitle}
        </Text>
      </View>

      <InputField
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity
        className={`rounded-xl py-4 items-center ${isLoading ? "bg-[#D0E8E6]" : "bg-[#1ABC9C]"}`}
        onPress={handleSendResetLink}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <View className="flex-row items-center">
            <RefreshCw size={20} color="#128C7E" />
            <Text className="text-[#128C7E] font-semibold text-base ml-2">
              Sending...
            </Text>
          </View>
        ) : (
          <Text className="text-white font-semibold text-base">
            Send Reset Link
          </Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-base text-[#2C3E50]">
          Remembered Your Password?
        </Text>
        <TouchableOpacity onPress={() => router.push("/sign")}>
          <Text className="text-base text-[#34967C] font-semibold ml-1">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[1].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4">
          {steps[1].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2">
          We've sent a 6-digit code to
        </Text>
        <Text className="text-base font-semibold text-[#2C3E50] mt-1">
          {email}
        </Text>
      </View>

      <InputField
        placeholder="Enter 6-digit code"
        value={resetCode}
        onChangeText={setResetCode}
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity
        className="bg-[#1ABC9C] rounded-xl py-4 items-center"
        onPress={handleVerifyCode}
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-base">Verify Code</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center items-center mt-6">
        <Text className="text-lg text-[#2C3E50]">Didn't receive code? </Text>
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={countdown > 0}
          activeOpacity={0.7}
        >
          <Text
            className={`font-semibold ${countdown > 0 ? " text-[#2B876E]" : "text-[#1ABC9C]"}`}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[2].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4">
          {steps[2].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2">
          {steps[2].subtitle}
        </Text>
      </View>

      <InputField
        placeholder="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        showPasswordToggle
        isPasswordVisible={showNewPassword}
        onTogglePassword={() => setShowNewPassword(!showNewPassword)}
      />
      <InputField
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        showPasswordToggle
        isPasswordVisible={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <TouchableOpacity
        className="bg-[#1ABC9C] rounded-xl py-4 items-center"
        onPress={handleResetPassword}
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-base">
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[3].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4">
          {steps[3].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2">
          Your password has been successfully reset.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-[#1ABC9C] rounded-xl py-4 items-center mb-4"
        onPress={() => router.push("/sign")}
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-base">
          Continue to Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      {/* Header */}
      <View className="bg-[#1ABC9C] pt-4 pb-6 px-4">
        <View className="flex-row items-center">
          {currentStep > 1 && currentStep < 4 && (
            <TouchableOpacity
              onPress={() => setCurrentStep(currentStep - 1)}
              className="mr-3"
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white">
              Forgot Password
            </Text>
            <Text className="text-[#D0E8E6] mt-1">Restore Your Account</Text>
          </View>
        </View>
      </View>

      {/* Progress */}
      {currentStep < 4 && (
        <View className="bg-white shadow-sm">
          <View className="flex-row px-6 py-6">
            {steps.slice(0, 3).map((step, index) => (
              <View key={step.id} className="flex-1 flex-row items-center">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    currentStep >= index + 1 ? "bg-[#1ABC9C]" : "bg-[#D0E8E6]"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${currentStep >= index + 1 ? "text-white" : "text-[#A1EBE5]"}`}
                  >
                    {index + 1}
                  </Text>
                </View>
                {/* Connecting line between steps */}
                {index < 2 && (
                  <View
                    className={`flex-1 h-0.5 mx-2 ${currentStep > index + 1 ? "bg-[#1ABC9C]" : "bg-[#D0E8E6]"}`}
                  />
                )}
              </View>
            ))}
          </View>
          <View className="px-6 pb-4">
            <Text className="text-sm font-medium text-[#2C3E50] text-center">
              Step {currentStep} of 3
            </Text>
            <Text className="text-xs text-[#7E7B7B] text-center mt-1">
              {steps[currentStep - 1]?.title}
            </Text>
          </View>
        </View>
      )}

      {/* Main content area with keyboard handling */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {renderCurrentStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
