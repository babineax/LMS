import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  User,
  Mail,
  Phone,
  Lock,
  UserCheck,
  ChevronDown,
  Building,
  Calendar,
  ArrowLeft,
} from "lucide-react-native";
import { DropdownFieldProps, InputFieldProps } from "@/types/types";
import { router } from "expo-router";

export default function AddUserUI() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    department: "",
    position: "",
    startDate: "",
    notes: "",
  });

  const [selectedRole, setSelectedRole] = useState<string>("Teacher");

  const roles = ["Admin", "Teacher", "Student"];
  const departments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "English",
  ];

  const updateFormData = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    icon,
    secureTextEntry = false,
    keyboardType = "default",
    multiline = false,
  }) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-[#2C3E50] mb-2">{label}</Text>
      <View className="flex-row items-center  rounded-xl border border-[#1ABC9C] px-4 py-3">
        <View className="w-6 h-6 items-center justify-center mr-3">{icon}</View>
        <TextInput
          className="flex-1 text-base text-[#2C3E50]"
          placeholder={placeholder}
          placeholderTextColor="#7E7B7B"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          textAlignVertical={multiline ? "top" : "center"}
        />
      </View>
    </View>
  );

  const DropdownField: React.FC<DropdownFieldProps> = ({
    label,
    value,
    options,
    onSelect,
    icon,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <View className="mb-4">
        <Text className="text-sm font-medium text-[#2C3E50] mb-2">{label}</Text>
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-xl border border-[#D0E8E6] px-4 py-3"
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.7}
        >
          <View className="w-6 h-6 items-center justify-center mr-3">
            {icon}
          </View>
          <Text
            className={`flex-1 text-base ${value ? "text-[#2C3E50]" : "text-[#2C3E50]"}`}
          >
            {value || `Select ${label}`}
          </Text>
          <ChevronDown size={16} color="#128C7E" />
        </TouchableOpacity>

        {isOpen && (
          <View className="bg-white rounded-xl border border-[#D0E8E6] mt-1 shadow-sm">
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-3 ${index !== options.length - 1 ? "border-b border-[#D0E8E6]" : ""}`}
                onPress={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                activeOpacity={0.7}
              >
                <Text className="text-base text-[#2C3E50]">{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const handleSubmit = () => {
    // Basic validation note:to be changed
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !selectedRole
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Handle form submission note:to be changed
    console.log("Form Data:", { ...formData, role: selectedRole });
    Alert.alert("Success", "User added successfully!");
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel? All changes will be lost.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => console.log("Cancelled") },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1FFF8]">
      {/* Header */}
      <View className="bg-[#1ABC9C] pt-4 pb-6 px-4">
        <view className="flex-row items-center">
          <TouchableOpacity
            className="mr-3"
            onPress={() => router.push("/")}
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
            <InputField
              label="First Name *"
              placeholder="Enter first name"
              value={formData.firstName}
              onChangeText={updateFormData("firstName")}
              icon={<User size={20} color="#128C7E" />}
            />

            <InputField
              label="Last Name *"
              placeholder="Enter last name"
              value={formData.lastName}
              onChangeText={updateFormData("lastName")}
              icon={<User size={20} color="#128C7E" />}
            />

            <InputField
              label="Email Address *"
              placeholder="Enter email address"
              value={formData.email}
              onChangeText={updateFormData("email")}
              keyboardType="email-address"
              icon={<Mail size={20} color="#128C7E" />}
            />

            <InputField
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone}
              onChangeText={updateFormData("phone")}
              keyboardType="phone-pad"
              icon={<Phone size={20} color="#128C7E" />}
            />
          </View>

          {/* Account Security Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-[#2C3E50] mb-4">
              Account Security
            </Text>

            <InputField
              label="Password *"
              placeholder="....."
              value={formData.password}
              onChangeText={updateFormData("password")}
              secureTextEntry={true}
              icon={<Lock size={20} color="#128C7E" />}
            />

            <InputField
              label="Confirm Password *"
              placeholder="......"
              value={formData.confirmPassword}
              onChangeText={updateFormData("confirmPassword")}
              secureTextEntry={true}
              icon={<Lock size={20} color="#128C7E" />}
            />
          </View>

          {/* Role & Permissions Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-[#2C3E50] mb-4">
              Role & Permissions
            </Text>

            <DropdownField
              label="User Role *"
              value={selectedRole}
              options={roles}
              onSelect={setSelectedRole}
              icon={<UserCheck size={20} color="#128C7E" />}
            />

            <DropdownField
              label="Department"
              value={formData.department}
              options={departments}
              onSelect={updateFormData("department")}
              icon={<Building size={20} color="#128C7E" />}
            />

            <InputField
              label="Position/Title"
              placeholder="Enter position or title"
              value={formData.position}
              onChangeText={updateFormData("position")}
              icon={<UserCheck size={20} color="#128C7E" />}
            />

            <InputField
              label="Start Date"
              placeholder="YYYY-MM-DD"
              value={formData.startDate}
              onChangeText={updateFormData("startDate")}
              icon={<Calendar size={20} color="#128C7E" />}
            />
          </View>

          {/* Additional Information Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-[#2C3E50] mb-4">
              Additional Information
            </Text>

            <InputField
              label="Notes"
              placeholder="Enter any additional notes..."
              value={formData.notes}
              onChangeText={updateFormData("notes")}
              multiline={true}
              icon={<User size={20} color="#128C7E" />}
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3 mb-8">
            <TouchableOpacity
              className="flex-1 bg-[#D0E8E6] rounded-xl py-4 items-center"
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text className="text-[#128C7E] font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-[#1ABC9C] rounded-xl py-4 items-center ml-3"
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                Add User
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
