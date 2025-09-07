import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import {
  ChevronRight,
  Bell,
  Shield,
  Users,
  Settings,
  Moon,
  Globe,
  Database,
  Mail,
} from "lucide-react-native";
interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
}

interface SwitchItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}

interface ChevronItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isLast?: boolean;
}

export default function SettingsUI() {
  const [notifications, setNotification] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

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
            onPress={() => console.log("Profile pressed")}
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
      </ScrollView>
    </SafeAreaView>
  );
}
