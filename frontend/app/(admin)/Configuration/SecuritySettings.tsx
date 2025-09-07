import React, { useState } from "react";
import { View, Text, Switch, ScrollView, TouchableOpacity } from "react-native";
import { Shield, EyeOff, UserCheck, Lock, Activity } from "lucide-react-native";

const SecuritySettings = () => {
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [ipRestriction, setIpRestriction] = useState(false);
  const [auditLogs, setAuditLogs] = useState(true);
  const [secureExam, setSecureExam] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold text-[#2C3E50] mb-4">
        🔐 Security Settings
      </Text>

      {/* Enrollment Approval */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <UserCheck size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">
            Require Enrollment Approval
          </Text>
        </View>
        <Switch value={approvalRequired} onValueChange={setApprovalRequired} />
      </View>

      {/* Two Factor Auth */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Lock size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">
            Enforce 2FA for Instructors
          </Text>
        </View>
        <Switch value={twoFactor} onValueChange={setTwoFactor} />
      </View>

      {/* IP Restrictions */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Shield size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">
            Enable IP Restrictions
          </Text>
        </View>
        <Switch value={ipRestriction} onValueChange={setIpRestriction} />
      </View>

      {/* Audit Logs */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Activity size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">Enable Audit Logs</Text>
        </View>
        <Switch value={auditLogs} onValueChange={setAuditLogs} />
      </View>

      {/* Secure Exam Mode */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <EyeOff size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">Secure Exam Mode</Text>
        </View>
        <Switch value={secureExam} onValueChange={setSecureExam} />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        className="bg-[#128C7E] rounded-xl p-4 mt-6 items-center"
        onPress={() => {
          console.log({
            approvalRequired,
            twoFactor,
            ipRestriction,
            auditLogs,
            secureExam,
          });
        }}
      >
        <Text className="text-white font-medium text-lg">Save Security Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SecuritySettings;
