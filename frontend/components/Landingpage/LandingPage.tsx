import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

export default function LandingPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to LMS</Text>
        <Text style={styles.subtitle}>Empowering Education Through Technology</Text>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <GraduationCap size={50} color="#1ABC9C" />
          <Text style={styles.featureTitle}>Comprehensive Courses</Text>
          <Text style={styles.featureText}>Access a wide range of courses tailored to your learning needs.</Text>
        </View>
        <View style={styles.feature}>
          <BookOpen size={50} color="#1ABC9C" />
          <Text style={styles.featureTitle}>Interactive Learning</Text>
          <Text style={styles.featureText}>Engage with interactive content and multimedia resources.</Text>
        </View>
        <View style={styles.feature}>
          <Users size={50} color="#1ABC9C" />
          <Text style={styles.featureTitle}>Collaborative Environment</Text>
          <Text style={styles.featureText}>Connect with peers and instructors in a supportive community.</Text>
        </View>
        <View style={styles.feature}>
          <Award size={50} color="#1ABC9C" />
          <Text style={styles.featureTitle}>Track Progress</Text>
          <Text style={styles.featureText}>Monitor your achievements and get personalized feedback.</Text>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>Ready to start your learning journey?</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#1ABC9C",
    padding: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    opacity: 0.9,
  },
  features: {
    padding: 20,
  },
  feature: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#2C3E50",
  },
  featureText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  ctaSection: {
    padding: 20,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#1ABC9C",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: "#34495E",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
