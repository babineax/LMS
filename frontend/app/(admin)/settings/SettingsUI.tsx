import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";

import {
  ChevronRight,
  Bell,
  Shield,
  Users,
  Settings,
  Mail,
  LogOut,
  ChevronDown,
  Phone,
} from "lucide-react-native";
import {
  ChevronItemProps,
  SettingsItemProps,
  SettingsSectionProps,
  SwitchItemProps,
} from "@/types/types";
import { Alert } from "react-native";
import { supabase } from "@/libs/supabase";
import { router } from "expo-router";

// --- LogOut Account ---
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    Alert.alert("Logout Failed", error.message);
  } else {
    router.replace("/(auth)/sign");
  }
};

export default function SettingsUI() {
  const [notifications, setNotification] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [expanded, setExpanded] = useState(false);
  const [openVersion, setOpenVersion] = useState(false);

  const SettingsSection: React.FC<SettingsSectionProps> = ({
    title,
    children,
  }) => (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-[#2C3E50] mb-3 px-4">
        {title}
      </Text>
      <View className="bg-white rounded-xl mx-4 shadow-sm border border-[#D0E8E6]">
        {children}
      </View>
    </View>
  );

  const SettingsItem: React.FC<SettingsItemProps> = ({
    icon,
    title,
    subtitle,
    rightComponent,
    onPress,
    isLast = false,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-4 ${!isLast ? "border-b border-[#D0E8E6]" : ""}`}
      activeOpacity={0.7}
    >
      <View className="w-10 h-10 bg-[#A1EBE5] rounded-full items-center justify-center mr-3">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-[#2C3E50]">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-[#128C7E] mt-1">{subtitle}</Text>
        )}
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  const SwitchItem: React.FC<SwitchItemProps> = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    isLast = false,
  }) => (
    <SettingsItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightComponent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#D0E8E6", true: "#16A085" }}
          thumbColor={value ? "#1ABC9C" : "#FFFFFF"}
          ios_backgroundColor="#D0E8E6"
        />
      }
      isLast={isLast}
    />
  );

  const ChevronItem: React.FC<ChevronItemProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    isLast = false,
  }) => (
    <SettingsItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightComponent={<ChevronRight size={20} color="#128C7E" />}
      onPress={onPress}
      isLast={isLast}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F1FFF8]">
      {/* Header */}
      <View className="bg-[#1ABC9C] pt-4 pb-6 px-4">
        <Text className="text-2xl font-bold text-white">Settings</Text>
        <Text className="text-[#D0E8E6] mt-1">
          Manage your LMS dashboard preferences
        </Text>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
      >
        {/* Account Setting */}
        <SettingsSection title="Account">
          <ChevronItem
            icon={<Users size={20} color="#128C7E" />}
            title="Profile Management"
            subtitle="Update your admin profile"
            onPress={() => router.push("settings/configuration/ProfileManagement")}
          />
        </SettingsSection>

        {/* Notification */}
        <SettingsSection title="Notifications">
          <SwitchItem
            icon={<Bell size={20} color="#128C7E" />}
            title="Push Notifications"
            subtitle="Recieve alerts for important updates"
            value={notifications}
            onValueChange={setNotification}
          />
          <SwitchItem
            icon={<Mail size={20} color="#128C7E" />}
            title="Email Notifications"
            subtitle="Get Notified via email"
            value={emailNotifications}
            onValueChange={setEmailNotifications}
          />
        </SettingsSection>

        {/* LMS Configuration */}
        <SettingsSection title="LMS Configuration">
          <ChevronItem
            icon={<Settings size={20} color="#128C7E" />}
            title="Course Settings"
            subtitle="Default course configurations"
            onPress={() => console.log("Course settings pressed")}
          />
          <ChevronItem
            icon={<Users size={20} color="#128C7E" />}
            title="User Management"
            subtitle="Student and instructor settings"
            onPress={() => router.push("/configuration/UserManagement")}
          />
          <ChevronItem
            icon={<Shield size={20} color="#128C7E" />}
            title="Platform Security"
            subtitle="Access controls and permissions"
            onPress={() => router.push("/configuration/SecuritySettings")}
            isLast
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title="Support">
          {/* Main row */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpanded(!expanded)}
            className="flex-row items-center p-4 border-b border-gray-200"
          >
            <View className="w-10 h-10 bg-[#A1EBE5] rounded-full items-center justify-center mr-3">
              <Mail size={20} color="#128C7E" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-[#2C3E50]">
                Contact Support
              </Text>
              <Text className="text-sm text-[#128C7E] mt-1">
                Get help with your LMS
              </Text>
            </View>
            {expanded ? (
              <ChevronDown size={20} color="#128C7E" />
            ) : (
              <ChevronRight size={20} color="#128C7E" />
            )}
          </TouchableOpacity>

          {/* Expanded section */}
          {expanded && (
            <View className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <TouchableOpacity
                className="flex-row items-center mb-3"
                onPress={() => Linking.openURL("mailto:support@yourapp.com")}
              >
                <Mail size={18} color="#128C7E" className="mr-2" />
                <Text className="text-sm text-[#2C3E50]">
                  Email: owinogabrieel@gmail.com
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => Linking.openURL("tel:+254740851719")}
              >
                <Phone size={18} color="#128C7E" className="mr-2" />
                <Text className="text-sm text-[#2C3E50]">
                  Call: (+254) 740 851 719
                </Text>
              </TouchableOpacity>

              {/* Close button */}
              <TouchableOpacity
                className="mt-4 self-start px-3 py-1 bg-[#128C7E] rounded-lg"
                onPress={() => setExpanded(false)}
              >
                <Text className="text-white text-sm">Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Version */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setOpenVersion(!openVersion)}
            className="flex-row items-center p-4 border-b border-gray-200"
          >
            <View className="w-10 h-10 bg-[#A1EBE5] rounded-full items-center justify-center mr-3">
              <Settings size={20} color="#128C7E" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-[#2C3E50]">
                System Information
              </Text>
              <Text className="text-sm text-[#128C7E] mt-1">Version 2.1.0</Text>
            </View>
            {openVersion ? (
              <ChevronDown size={20} color="#128C7E" />
            ) : (
              <ChevronRight size={20} color="#128C7E" />
            )}
          </TouchableOpacity>

          {/* Expanded section */}
          {openVersion && (
            <View className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <Text className="text-sm text-gray-600">App Version: 2.1.0</Text>
              <Text className="text-sm text-gray-600">Build: 20250907</Text>
              <Text className="text-sm text-gray-600">
                Last Update: Sep 7, 2025
              </Text>

              {/* Close button */}
              <TouchableOpacity
                className="mt-3 self-start px-3 py-1 bg-[#128C7E] rounded-lg"
                onPress={() => setOpenVersion(false)}
              >
                <Text className="text-white text-sm">Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </SettingsSection>

        {/* Account Actions Section */}
        <SettingsSection title="Account Actions">
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-[#D0E8E6]"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 bg-[#A1EBE5] rounded-full items-center justify-center mr-3">
              <LogOut size={20} color="#128C7E" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-[#2C3E50]">
                Logout
              </Text>
              <Text className="text-sm text-[#128C7E] mt-1">
                Sign out of your admin account
              </Text>
            </View>
            <ChevronRight size={20} color="#128C7E" />
          </TouchableOpacity>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
