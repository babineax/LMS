import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { Database } from "@/types/database";

// Storage adapter for our native
const asyncStorageAdapter = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};

// Safe localStorage adapter
const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.removeItem(key);
    }
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === "web" ? safeLocalStorage : asyncStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth service functions
export const authService = {
  // Sign up with email and password
  signUp: async (
    email: string,
    password: string,
    userData: {
      full_name: string;
      role: "admin" | "student" | "teacher";
      institution_id?: string;
    }
  ) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return { data: null, error: `Auth error: ${authError.message}` };
      };

      if (authData.user) {
        // Create user profile in users table
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: authData.user.email!,
          full_name: userData.full_name,
          role: userData.role,
          institution_id: userData.role === "teacher" ? userData.institution_id ?? null : null,
        });

        if (profileError) {
          return { data: null, error: `Profile error: ${profileError.message}` };
        };

        // Set session manually
        // if (authData.session) {
        //   await supabase.auth.setSession(authData.session);
        // }
      }

      return { data: authData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get current user profile
  getCurrentUserProfile: async (userId?: string): Promise<{ data: any; error: any }> => {
    try {
      let authUser: any = null;
      
      if (!userId) {
        const { data, error: userError } = await supabase.auth.getUser();
        if (!userError ) return { data: null, error: userError };
        authUser = data?.user ?? null;
        if (!authUser) return { data: null, error: "No auth user" };
        userId = authUser.id;
      };
      
      //  Get user profile by id
      const { data: profileById, error: idError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId!)
        .maybeSingle(); 

      if (idError) return { data: null, error: idError };

      if (profileById) {
        return { data: profileById, error: null };
      }
      
      // try to find user by email
      if (authUser?.email) {
        const { data: profileByEmail, error: emailError } = await supabase
          .from("users")
          .select("*")
          .eq("email", authUser.email)
          .maybeSingle();

        if (emailError) return { data: null, error: emailError };
        return { data: profileByEmail ?? null, error: null };
      }

      
      // nothing found
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update user profile
  updateProfile: async (
    updates: Database["public"]["Tables"]["users"]["Update"]
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Check if user exists in users table
  checkUserExists: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      return { exists: !!data, error };
    } catch (error) {
      return { exists: false, error };
    }
  },
};
