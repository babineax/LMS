import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  Clock,
  RefreshCw,
  Shield,
} from 'lucide-react-native';
import { router } from "expo-router";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function ForgotPasswordUI() {
  const [email, setEmail] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetCode, setResetCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Enter Email Address',
      subtitle: 'We\'ll send you a reset link',
      icon: <Mail size={60} color="#1ABC9C" />
    },
    {
      id: 2,
      title: 'Check Your Email',
      subtitle: 'Enter the verification code',
      icon: <Clock size={60} color="#1ABC9C" />
    },
    {
      id: 3,
      title: 'Reset Password',
      subtitle: 'Create a new secure password',
      icon: <Shield size={60} color="#1ABC9C" />
    },
    {
      id: 4,
      title: 'Success!',
      subtitle: 'Your password has been reset',
      icon: <CheckCircle size={60} color="#1ABC9C" />
    }
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      startCountdown();
      console.log('Reset link sent to:', email);
    }, 2000);
  };

  const handleVerifyCode = () => {
    if (!resetCode.trim() || resetCode.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit verification code');
      return;
    }

    // Simulate verification
    console.log('Verifying code:', resetCode);
    setCurrentStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    // Simulate password reset
    console.log('Password reset successful');
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
    
    console.log('Resending verification code to:', email);
    Alert.alert('Code Sent', 'A new verification code has been sent to your email');
    startCountdown();
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
    
  };

  const InputField = ({ 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry = false,
    keyboardType ='default',
    maxLength
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    maxLength?: number;
  }) => (
    <View className="bg-white rounded-xl border border-[#D0E8E6] px-4 py-3 mb-4">
      <TextInput
        className="text-base text-[#2C3E50]"
        placeholder={placeholder}
        placeholderTextColor="#A1EBE5"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize="none"
      
      />
    
    </View>
  );

  const renderStep1 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[0].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4 text-center">
          {steps[0].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2 text-center">
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
        className={`rounded-xl py-4 items-center ${isLoading ? 'bg-[#D0E8E6]' : 'bg-[#1ABC9C]'}`}
        onPress={handleSendResetLink}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <View className="flex-row items-center">
            <RefreshCw size={20} color="#128C7E" />
            <Text className="text-[#128C7E] font-semibold text-base ml-2">Sending...</Text>
          </View>
        ) : (
          <Text className="text-white font-semibold text-base">Send Reset Link</Text>
        )}
      </TouchableOpacity>

         <View className="flex-row justify-center mt-6">
               <Text className="text-lg text-[#2C3E50]">Remembered Your Password?</Text>
               <TouchableOpacity onPress={() =>   router.push("/sign")}>
                 <Text className="text-lg text-[#2B876E] font-semibold ml-1">
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
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4 text-center">
          {steps[1].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2 text-center">
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
        <Text className="text-[#128C7E]">Didn't receive code? </Text>
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={countdown > 0}
          activeOpacity={0.7}
        >
          <Text className={`font-semibold ${countdown > 0 ? 'text-[#A1EBE5]' : 'text-[#1ABC9C]'}`}>
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[2].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4 text-center">
          {steps[2].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2 text-center">
          {steps[2].subtitle}
        </Text>
      </View>

      <InputField
        placeholder="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />

      <InputField
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <View className="bg-[#F1FFF8] rounded-xl p-3 mb-4 border border-[#A1EBE5]">
        <Text className="text-sm text-[#128C7E]">
          Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-[#1ABC9C] rounded-xl py-4 items-center"
        onPress={handleResetPassword}
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-base">Reset Password</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <View className="flex-1 justify-center px-6">
      <View className="items-center mb-8">
        {steps[3].icon}
        <Text className="text-2xl font-bold text-[#2C3E50] mt-4 text-center">
          {steps[3].title}
        </Text>
        <Text className="text-base text-[#128C7E] mt-2 text-center">
          Your password has been successfully reset. You can now access your LMS account with your new password.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-[#1ABC9C] rounded-xl py-4 items-center mb-4"
        onPress={handleBackToLogin}
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-base">Continue to Sign In</Text>
      </TouchableOpacity>

      <View className="bg-[#F1FFF8] rounded-xl p-4 border border-[#A1EBE5]">
        <Text className="text-sm text-[#128C7E] text-center">
          🔐 For security, please sign in again with your new password
        </Text>
      </View>
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
            <Text className="text-2xl font-bold text-white">Forgot Password</Text>
            <Text className="text-[#D0E8E6] mt-1">Restore Your Account</Text>
          </View>
        </View>
      </View>

      {/* Progress Indicator */}
      {currentStep < 4 && (
        <View className="flex-row px-6 py-4">
          {steps.slice(0, 3).map((step, index) => (
            <View key={step.id} className="flex-1 flex-row items-center">
              <View 
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  currentStep > index + 1 
                    ? 'bg-[#1ABC9C]' 
                    : currentStep === index + 1 
                      ? 'bg-[#1ABC9C]' 
                      : 'bg-[#D0E8E6]'
                }`}
              >
                <Text className={`text-sm font-bold ${
                  currentStep >= index + 1 ? 'text-white' : 'text-[#A1EBE5]'
                }`}>
                  {index + 1}
                </Text>
              </View>
              {index < 2 && (
                <View 
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep > index + 1 ? 'bg-[#1ABC9C]' : 'bg-[#D0E8E6]'
                  }`} 
                />
              )}
            </View>
          ))}
        </View>
      )}

      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {renderCurrentStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}