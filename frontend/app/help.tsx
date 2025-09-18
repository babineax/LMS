import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How do I create a new course?",
    answer: "Navigate to the Courses tab and tap the '+' button. Fill in the course details and save.",
  },
  {
    question: "Can I track student progress?",
    answer: "Yes! The Analytics tab provides detailed progress and completion rates per student.",
  },
  {
    question: "How do I add assignments?",
    answer: "Open a course, go to the Assignments section, and tap 'Add Assignment'.",
  },
  {
    question: "How do I communicate with students?",
    answer: "You can use the built-in messaging feature inside each course to send announcements.",
  },
];

export default function TeachersFAQAccordion()  {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <View className="px-6 py-8">
      <Text className="text-lg font-bold text-headingColor mb-4">Frequently Asked Questions</Text>

      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <View key={index} className="mb-4 border border-border rounded-lg bg-white shadow-sm">
            <TouchableOpacity
              className="flex-row justify-between items-center px-4 py-3"
              onPress={() => toggleFAQ(index)}
              activeOpacity={0.8}
            >
              <Text className="text-sm font-medium text-headingColor flex-1 mr-2">
                {faq.question}
              </Text>
              <Ionicons
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#2C3E50"
              />
            </TouchableOpacity>

            {isOpen && (
              <View className="px-4 pb-3">
                <Text className="text-xs text-[#34495E] mb-3">{faq.answer}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
    </SafeAreaView>
    
  );
};
