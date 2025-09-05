import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import MultipleChoiceQuestion from "@/components/Quiz";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { parseDuration } from "@/utils/parseFunction";

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
    const initialDuration = parseDuration(lesson?.duration);
    const [timeLeft, setTimeLeft] = useState(initialDuration);

    const perPage = 3;
    const start = page * perPage;
    const end = start + perPage;
    const currentQuestions = questions.slice(start, end);

    const handleSelect = (index: number, option: string) => {
      setAnswers((prev) => ({ ...prev, [index]: option }));
    };

    useEffect(() => {
      if (timeLeft <= 0) {
        handleSubmitQuiz();
        return;
      }

      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);

      //eslint-disable-next-line
    }, [timeLeft]);

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

    const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!lesson) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-headingColor font-semibold text-lg mb-3">
          Lesson Not Found
        </Text>
      </View>
    );
  }


  return (
    <View className="flex-1 bg-bgMain">
      <ScrollView className="flex-grow px-6 pt-12 pb-6">
        <Text className="text-headingColor font-semibold text-lg mb-3">
          {lesson?.title}
        </Text>
        <View className="items-center mb-4">
          <Text className={`font-semibold text-lg ${timeLeft <= 60 ? "text-red-600" : "text-primaryColor "}`}>
            Time left: {formatTime(timeLeft)}
          </Text>
        </View>
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
              className="px-10 py-3 bg-gray-300 rounded-lg"
            >
              <Text>Previous</Text>
            </TouchableOpacity>
          )}

          {end < questions.length ? (
            <TouchableOpacity
              onPress={() => setPage(page + 1)}
              className="px-10 py-3 bg-primaryColor rounded-lg"
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmitQuiz}
              disabled={submitted}
              className={`px-10 py-3 rounded-lg ${
                submitted ? "bg-gray-300" : "bg-primaryColor"
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
            <View className="mt-4">
              <TouchableOpacity
                onPress={() => router.push("/(student)/grades")}
                className="px-10 py-3 bg-primaryColor rounded-xl"
              >
                <Text className="text-white text-center text-lg">
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