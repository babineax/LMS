import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Smart LMS</Text>
      <Text style={styles.subtitle}>Learn Anytime, Anywhere</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/sign")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push("/(auth)/signUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: "#6B7280",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#4F46E5",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: "#10B981",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
