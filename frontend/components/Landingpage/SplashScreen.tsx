import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")} // logo path
        style={styles.logo}
      />
      <Text style={styles.tagline}>Smart Learning Anywhere Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3fe929ff", // you can pick any brand color
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  tagline: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
