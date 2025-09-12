import { View, Text, TouchableOpacity } from "react-native";

interface QuestionProps {
  index: number;
  question: string;
  options: string[];
  correctAnswer: string;
  onSelect: (index: number, option: string) => void;
  submitted: boolean;
  selectedAnswer?: any;
}

export default function MultipleChoiceQuestion({
  index,
  question,
  options,
  correctAnswer,
  onSelect,
  submitted,
  selectedAnswer,
}: QuestionProps) {


  return (
    <View>
      <View className="bg-bgLight rounded-2xl p-4 shadow-md mb-4">
        {/* Question */}
        <Text className="text-headingColor font-semibold text-lg mb-3">
          {index + 1}. {question}
        </Text>

        {/* Options */}
        {options.map((option, i) => {
          let bg = "bg-bgLight border-border";

          if (submitted) {
            if (option === correctAnswer) {
              bg = "bg-green-200 border-green-600"; 
            } else if (option === selectedAnswer) {
              bg = "bg-red-200 border-red-600";
            }
          } else if (selectedAnswer === option) {
            bg = "bg-green-200 border-green-600";
          }

            return (
              <View key={i}>
                {submitted && selectedAnswer !== correctAnswer && option === correctAnswer && (
                  <Text className="text-sm font-medium text-primaryColor mb-1">
                    Correct Answer:
                  </Text>
                )}
                <TouchableOpacity
                  
                  className={`p-3 my-1 rounded-xl border ${bg}`}
                  onPress={() => !submitted && onSelect(index, option)}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              </View>
            );
        })}
        
      </View>

    </View>
      
      
  );
}
