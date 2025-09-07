import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Mail, Phone, Lock, Camera } from "lucide-react-native";
import { supabase } from "@/libs/supabase";

const ProfileManagement = () => {
  const [name, setName] = useState("Gabriel Leon");
  const [email, setEmail] = useState("owinogabrieel@gmail.com");
  const [phone, setPhone] = useState("+254740851719");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };

    fetchUser();
  }, []);

  //upload image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
      await uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();

      const filePath = `avatars/${userId}-${Date.now()}.jpg`;

      const { error } = await supabase.storage
        .from("profile-images")
        .upload(filePath, blob, { upsert: true });

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from("profile-images")
        .getPublicUrl(filePath);

      setAvatar(publicUrl.publicUrl);

      await supabase
        .from("users")
        .update({ avatar_url: publicUrl.publicUrl })
        .eq("id", userId);

      alert("Profile picture updated!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full overflow-hidden mb-3 relative bg-gray-200">
          {avatar ? (
            <Image source={{ uri: avatar }} className="w-full h-full" />
          ) : (
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              className="w-full h-full"
            />
          )}

          <TouchableOpacity
            onPress={pickImage}
            className="absolute bottom-1 right-1 bg-[#128C7E] p-2 rounded-full"
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Camera size={16} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-semibold text-[#2C3E50]">{name}</Text>
        <Text className="text-sm text-gray-500">Admin</Text>
      </View>

      {/* Edit Fields */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-600 mb-1">
          Full Name
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-lg px-3 py-2 text-base"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-600 mb-1">Email</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
          <Mail size={18} color="#128C7E" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="ml-2 flex-1 text-base"
            keyboardType="email-address"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-600 mb-1">Phone</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
          <Phone size={18} color="#128C7E" />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            className="ml-2 flex-1 text-base"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Change Password */}
      <TouchableOpacity className="flex-row items-center p-4 border border-gray-200 rounded-lg mb-4">
        <Lock size={20} color="#128C7E" />
        <Text className="ml-2 text-base text-[#2C3E50]">Change Password</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity
        className="bg-[#128C7E] p-4 rounded-xl items-center"
        onPress={() => console.log("Profile saved:", { name, email, phone })}
      >
        <Text className="text-white font-medium text-lg">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileManagement;
