import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

// Enable layout animation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How do I enroll in a course?",
    answer: "Go to the Courses tab, select your desired course, and tap Enroll. The course will then appear in your dashboard.",
  },
  {
    question: "Where can I view my grades?",
    answer: "Navigate to the Grades tab in the bottom menu. You’ll see grades for all your enrolled courses.",
  },
  {
    question: "Can I reset my password?",
    answer: "Yes, go to Settings > Profile > Change Password to reset your password securely.",
  },
  {
    question: "How do I contact my instructor?",
    answer: "Open the course details and use the 'Message Instructor' option available in the course menu.",
  },
];

export default function StudentHelp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View className="flex-1 bg-bgMain px-6 py-8">
      <Text className="text-2xl font-bold text-headingColor mb-6">Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} className="mb-4 border border-border rounded-lg bg-white shadow-sm">
          <TouchableOpacity
            onPress={() => toggleAccordion(index)}
            className="flex-row justify-between items-center px-4 py-3"
          >
            <Text className="text-base font-semibold text-[#2C3E50]">{faq.question}</Text>
            {openIndex === index ? <ChevronUp size={20} color="#2C3E50" /> : <ChevronDown size={20} color="#2C3E50" />}
          </TouchableOpacity>
          {openIndex === index && (
            <View className="px-4 pb-3">
              <Text className="text-sm text-[#34495E]">{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
