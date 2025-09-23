import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { StatCard } from "../../app/element/StatCard";
import { recentActivity, stats, upcomingEvents } from "../../app/data/mockData";
import { ActivityItem } from "../../app/element/ActivityItem";
import { EventItem } from "../../app/element/EventItem";
import { supabase } from "@/libs/supabase";
import { Database } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from '@expo/vector-icons';

type Course = Database['public']['Tables']['courses']['Row'];

const OverviewTab: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setCourses([]);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('courses')
        .select('*')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching courses:', fetchError);
        return;
      }

      setCourses(data || []);
    } catch (err) {
        console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line 
  }, [user]);

    const totalStudents = courses.reduce(
      (sum, course) => sum + (course.enrolled_count || 0),
      0
    );

    const activeCourses = courses.filter(c => c.active).length;
  return (
    <View className="pb-6">
      {/* Stats Grid */}
      <View className="flex-row my-6">
        <View className="flex-1">
          <View className="flex-row mb-2">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1">
              <View className="flex-row items-center justify-between mb-3">
                <View className="p-3 bg-[#A1EBE5] rounded-lg">
                  <Ionicons name='people' size={20} color="#2C3E50" />
                </View>
                {/* <Text className="text-sm font-medium text-[#1ABC9C]">{change}</Text> */}
              </View>
              <Text className="text-xl font-bold text-[#2C3E50] mb-1">{totalStudents}</Text>
              <Text className="text-gray-600 text-xs">Total Students</Text>
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1">
              <View className="flex-row items-center justify-between mb-3">
                <View className="p-3 bg-[#A1EBE5] rounded-lg">
                  <Ionicons name='book' size={20} color="#2C3E50" />
                </View>
                {/* <Text className="text-sm font-medium text-[#1ABC9C]">{change}</Text> */}
              </View>
              <Text className="text-xl font-bold text-[#2C3E50] mb-1">{activeCourses}</Text>
              <Text className="text-gray-600 text-xs">Active Courses</Text>
            </View>
          </View>
          <View className="flex-row">
            <StatCard {...stats[2]} />
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1 mx-1">
              <View className="flex-row items-center justify-between mb-3">
                <View className="p-3 bg-[#A1EBE5] rounded-lg">
                  <Ionicons name='people' size={20} color="#2C3E50" />
                </View>
                {/* <Text className="text-sm font-medium text-[#1ABC9C]">{change}</Text> */}
              </View>
              <Text className="text-xl font-bold text-[#2C3E50] mb-1">{totalStudents}</Text>
              <Text className="text-gray-600 text-xs">Total Students</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="bg-white rounded-xl shadow-sm mb-6">
        <View className="p-4 border-b border-gray-100">
          <Text className="text-lg font-bold text-[#2C3E50]">
            Recent Activity
          </Text>
        </View>
        {recentActivity.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </View>

      {/* Upcoming Events */}
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-lg font-bold text-[#2C3E50] mb-4">
          Upcoming Events
        </Text>
        {upcomingEvents.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
      </View>
    </View>
  );
};

export default OverviewTab;
