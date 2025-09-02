import { Stack } from "expo-router";
import "../styles/global.css";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="/" />
          <Stack.Screen name="/auth/signUp" />
          <Stack.Screen name="/sign" />
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
