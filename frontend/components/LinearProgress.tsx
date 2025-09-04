import { View, Text } from "react-native";



export default function CustomProgressBar({ progress = 0.75, height = 12 }) {
  const totalWidth = 300; // adjust or make dynamic with Dimensions
  const gap = 4; // visible gap size
  const filledWidth = totalWidth * progress - gap;
  const unfilledWidth = totalWidth - (filledWidth + gap);

  return (
    <View className="flex-row items-center">
      {/* Progress Bar */}
      <View className="flex-row items-center">
        {/* Filled Part */}
        <View
          style={{ width: Math.max(filledWidth, 0), height }}
          className="bg-[#16A085] rounded-full"
        />
        {/* Gap */}
        <View style={{ width: gap, height }} />
        {/* Unfilled Part */}
        <View
          style={{ width: Math.max(unfilledWidth, 0), height }}
          className="bg-[#3498DB] rounded-full"
        />
      </View>

      {/* Percentage */}
      <Text className="ml-2 text-[#2C3E50] font-semibold px-4">
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
}

