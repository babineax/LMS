import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { authService, supabase } from '@/libs/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Course } from '@/types/types'

type UserProfile = Database['public']['Tables']['users']['Row']

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, userData: {
    full_name: string
    role: 'admin' | 'student' | 'teacher'
    institution_id?: string
  }) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  refreshProfile: () => Promise<UserProfile | null>
  courses: Course[]
  addCourse: (course: Course) => void
  removeCourse: (course: Course) => void
  setCourses: (courses: Course[]) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])

  // Load user profile from Supabase user table
  const loadUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data: profile, error } = await authService.getCurrentUserProfile()
      if (error) {
        console.error('Error loading profile:', error)
        return null
      }
      setProfile(profile)
      return profile
    } catch (error) {
      console.error('Error loading profile:', error)
      return null
    }
  }

  // Refresh and return profile
  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (user) {
      return await loadUserProfile(user.id)
    }
    return null
  }

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load enrolled courses
  useEffect(() => {
    const loadEnrolledCourses = async () => {
      try {
        const enrolled= await AsyncStorage.getItem('courses')
        if (enrolled) {
          setCourses(JSON.parse(enrolled))
        }
      } catch (error) {
        console.error('Error loading enrolled courses:', error)
      }
    }

    loadEnrolledCourses()
  },[])

  // Save enrolled courses to AsyncStorage
  useEffect(() => {
    if (courses.length === 0) return
    const saveEnrolledCourses = async () => {
      try {
        await AsyncStorage.setItem('courses', JSON.stringify(courses))
      } catch (error) {
        console.error('Error saving enrolled courses:', error)
      }
    }

    saveEnrolledCourses()
  },[courses])

  //add course to enrolled courses
  const addCourse = (course: Course) => {
    const newCourses = [...courses, course]
    setCourses(newCourses)
  }

  const removeCourse = (course: Course) => {
    const courseId = course.id
    const newCourses = courses.filter(course => course.id !== courseId)
    setCourses(newCourses)
  }

  const value: AuthContextType = {
    session,
    user,
    profile,
    loading,
    signUp: authService.signUp,
    signIn: authService.signIn,
    signOut: authService.signOut,
    resetPassword: authService.resetPassword,
    refreshProfile,
    courses,
    setCourses,
    addCourse,
    removeCourse,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
