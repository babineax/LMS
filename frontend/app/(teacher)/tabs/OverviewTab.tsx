import React from "react";
import { View, Text } from "react-native";
import { StatCard } from "../element/StatCard";
import { recentActivity, stats, upcomingEvents } from "../data/mockData";
import { ActivityItem } from "../element/ActivityItem";
import { EventItem } from "../element/EventItem";

const OverviewTab: React.FC = () => {
  return (
    <View className="pb-6">
      {/* Stats Grid */}
      <View className="flex-row mb-6">
        <View className="flex-1">
          <View className="flex-row mb-2">
            <StatCard {...stats[0]} />
            <StatCard {...stats[1]} />
          </View>
          <View className="flex-row">
            <StatCard {...stats[2]} />
            <StatCard {...stats[3]} />
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
