import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")} // logo path
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to LMS</Text>
      <Text style={styles.quote}>
        &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo; - Nelson Mandela
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1ABC9C", // Updated to a professional green color
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  quote: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 24,
  },
});
