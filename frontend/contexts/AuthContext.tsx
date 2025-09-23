import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { authService, supabase } from "@/libs/supabase";
import { router } from "expo-router";

type UserProfile = Database["public"]["Tables"]["users"]["Row"];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  token: string | null;
  signUp: (
    email: string,
    password: string,
    userData: {
      full_name: string;
      role: "admin" | "student" | "teacher";
      institution_id?: string;
    }
  ) => Promise<{ data: any; error: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  refreshProfile: () => Promise<UserProfile | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Load user profile
  const loadUserProfile = async (
    userId: string
  ): Promise<UserProfile | null> => {
    try {
      const { data: profile, error } =
        await authService.getCurrentUserProfile(userId);
      if (error) {
        console.error("Error loading profile:", error);
        return null;
      }
      console.log('=== AUTH CONTEXT DEBUG ===');
      console.log('Context user:', userId);
      console.log('Context profile:', profile);
      console.log('Context session:', session);
      console.log('Context token:', token);
      console.log('Context loading:', loading); // if you have this
      console.log('==========================');

      if (!profile) {
        console.warn("No profile found for user", userId ?? "(used auth user)");
        setProfile(null);
        return null;
      }

      setProfile(profile);
      return profile;
    } catch (error) {
      console.error("Error loading profile:", error);
      return null;
    }
  };

  // Refresh and return profile
  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (user) {
      return await loadUserProfile(user.id);
    }
    return null;
  };

  useEffect(() => {
    // Initial session check
    setLoading(true);
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setToken(session?.access_token ?? null);
      console.log('Initial session check:');
      console.log('Session:', session);
      console.log('Error:', error);
      console.log('User ID:', session?.user?.id);

      console.log('=== SESSION DEBUG ===');
      console.log('Session exists:', !!session);
      console.log('User ID:', session?.user?.id);
      console.log('Access token exists:', !!session?.access_token);
      console.log('Session expires at:', session?.expires_at);
      console.log('Current time:', Math.floor(Date.now() / 1000));
      console.log('Session expired?', session?.expires_at ? session.expires_at < Math.floor(Date.now() / 1000) : 'N/A');
      console.log('Profile ID from context:', profile?.id);
      console.log('===================');

      if (session?.user) {
        // Restore profile from your users table
        await loadUserProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    // Listen for auth state changes
    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth event:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setToken(session?.access_token ?? null);

        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line  
  }, [session?.user?.id]);


  const signOut = async (): Promise<{ error: any }> => {
    try {
      const { error } = await authService.signOut();
      if (error) {
        console.error("Error signing out:", error);
        return { error };
      }

      // Clear state
      setSession(null);
      setUser(null);
      setProfile(null);
      setToken(null);
      router.push("/sign");
      console.log("Signed out successfully");
      return { error };
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
      return { error: err };
    }
  };

  const value: AuthContextType = {
    session,
    user,
    profile,
    loading,
    token,
    signUp: authService.signUp,
    signIn: authService.signIn,
    signOut,
    resetPassword: authService.resetPassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
