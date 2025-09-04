import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import MultipleChoiceQuestion from "@/components/Quiz";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5"],
      correctAnswer: "4",
    },
    {
      question: "What is 10 / 2?",
      options: ["2", "5", "10"],
      correctAnswer: "5",
    },
    {
      question: "What is the square root of 16?",
      options: ["3", "4", "5"],
      correctAnswer: "4",
    },
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "London", "Paris"],
      correctAnswer: "Berlin",
    },
  ];

export default function Quiz() {
    const {courses} = useAuth();
    const [page, setPage] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();

    const course = courses.find((c) => c.id === courseId);
    const lesson = course?.lessons.find((l) => l.id === lessonId);

    const perPage = 3;
    const start = page * perPage;
    const end = start + perPage;
    const currentQuestions = questions.slice(start, end);

    const handleSelect = (index: number, option: string) => {
      setAnswers((prev) => ({ ...prev, [index]: option }));
    };

    const handleSubmitQuiz = () => {
      let newScore = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) {
          newScore++;
        }
      });
      setScore(newScore);
      setSubmitted(true);
    };


  return (
    <View className="flex-1 bg-bgMain">
      <ScrollView className="flex-grow px-6 pt-12 pb-6">
        <Text className="text-headingColor font-semibold text-lg mb-3">
          {lesson?.title}
        </Text>
        {currentQuestions.map((question, idx) => (
          <MultipleChoiceQuestion
            key={start + idx}
            index={start + idx}
            question={question.question}
            options={question.options}
            correctAnswer={question.correctAnswer}
            selectedAnswer={answers[start + idx]}
            onSelect={handleSelect}
            submitted={submitted}
          />
        ))}
        <View className="flex-row justify-between mt-4">
          {page > 0 && (
            <TouchableOpacity
              onPress={() => setPage(page - 1)}
              className="p-3 bg-gray-300 rounded-xl"
            >
              <Text>Previous</Text>
            </TouchableOpacity>
          )}

          {end < questions.length ? (
            <TouchableOpacity
              onPress={() => setPage(page + 1)}
              className="p-3 bg-primaryColor rounded-xl"
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmitQuiz}
              disabled={submitted}
              className={`p-3 rounded-xl ${
                submitted ? "bg-gray-300" : "bg-green-600"
              }`}
            >
              <Text className="text-white font-bold">Submit Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
        {submitted && (
          <View>
              <Text className="mt-4 text-center font-bold text-lg">
              Final Score: {score}/{questions.length}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => router.push("/(student)/grades")}
                className="p-4 bg-primaryColor rounded-xl"
              >
                <Text className="text-center text-lg">
                  View Scores
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
        )}
      </ScrollView>
    </View>
  );
}