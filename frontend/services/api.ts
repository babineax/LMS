import { Platform } from "react-native";
import axios, { AxiosInstance } from "axios";

/**
 * TODO:
 * Resolve API base URL depending on environment and platform
 * Priority:
 *   1. Environment variable (EXPO_PUBLIC_URL)
 *   2. Local dev defaults (Android emulator / iOS simulator)
 *   3. Production fallback
 */
const getBaseUrl = (): string => {
  // 1. Env var takes highest priority
  if (process.env.EXPO_PUBLIC_URL) {
    return process.env.EXPO_PUBLIC_URL;
  }

  // 2. Dev fallback for local testing
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:4000";
    }
    // iOS simulator or web dev
    return "http://localhost:4000";
  }

  // Production fallback
  return "https://lms-api-wine.vercel.app/api";
};

export const api: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Debug log to confirm endpoint
console.log("API baseURL:", getBaseUrl());
