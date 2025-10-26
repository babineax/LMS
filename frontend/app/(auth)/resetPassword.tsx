import { Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function ResetPassword() {
    const [sending, setSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleResetPassword = async () => {
        setSending(true);
        if (!formData.email) {
            console.log("Email is required");
            setErrorMessage("Email is required");
            return;
        }   
        
        setTimeout(() => {
            setSending(false);
            Alert.alert(
                "Redirecting", 
                "Your password has been reset successfully."
            );
        }, 2000);

        router.replace("/(auth)/sign");
        console.log("Reset password:", formData.email);
    };

    return (
        <View className="flex-1 bg-bgLight">
            <View className="flex-1 justify-center items-center p-6">
                <Text className="text-3xl text-headingColor font-bold">
                    Reset Password
                </Text>
                {/* Email */}
                <View className="w-full py-2">
                    <Text className="text-base text-headingColor mb-2">Enter the email you used during registration</Text>
                    <TextInput
                        keyboardType="email-address"
                        className="border border-border rounded-lg h-12 px-2.5 w-full focus:border-[#2B876E] focus:ring-2 focus:ring-[#2B876E]"
                        placeholder="Enter your email"
                        placeholderTextColor="#7E7B7B"
                        value={formData.email}
                        onChangeText={(value)=>setFormData({...formData, email:value})}
                        autoCapitalize="none"
                    /> 
                    {errorMessage && (
                        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
                    )}
                </View>
                <View className="w-full py-2">
                    <TouchableOpacity 
                        className="bg-[#2B876E] py-3 rounded-lg mt-6 flex justify-center items-center shadow-md"
                        onPress={handleResetPassword}
                        disabled={sending}
                    >
                        <Text className="text-white font-semibold text-lg">
                            Reset Password
                        </Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}