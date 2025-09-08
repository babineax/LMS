import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { UserPlus, Users, UserCheck, UserX } from "lucide-react-native";

const UserManagement = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold text-[#2C3E50] mb-4">
        👥 User Management
      </Text>

      {/* Students Section */}
      <View className="mb-6">
        <Text className="text-lg font-medium text-[#128C7E] mb-2">Students</Text>

        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <UserPlus size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">Add / Import Students</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <UserCheck size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">Manage Enrollments</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4">
          <UserX size={22} color="#dc2626" className="mr-2" />
          <Text className="text-base text-red-600">Suspend / Remove Student</Text>
        </TouchableOpacity>
      </View>

      {/* Teachers Section */}
      <View>
        <Text className="text-lg font-medium text-[#128C7E] mb-2">Teachers</Text>

        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Users size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">Add / Invite Teachers</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <UserCheck size={22} color="#128C7E" className="mr-2" />
          <Text className="text-base text-[#2C3E50]">Assign Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4">
          <UserX size={22} color="#dc2626" className="mr-2" />
          <Text className="text-base text-red-600">Deactivate Teacher</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserManagement;
