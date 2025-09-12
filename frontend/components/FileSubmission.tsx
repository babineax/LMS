import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

interface QuestionProps {
  index: number;
  // type: "multiple-choice" | "input" | "both" | "input-upload";
  question: string;
  options?: string[];
  correctAnswer?: string | null;
  onSelect?: (index: number, option: string) => void;
  onInput?: (index: number, value: string) => void;
  onUpload?: (index: number, file: { uri: string; type: string; name: string }) => void;
  submitted: boolean;
  inputAnswer?: string | null;
  uploadedFile?: { uri: string; type: string; name: string } | null;
}

// type DocumentPickerResult =
//   | { canceled: true }
//   | { canceled: false; assets: DocumentPickerAsset[] };

// type DocumentPickerAsset = {
//   mimeType?: string; 
//   name: string;      
//   size?: number;     
//   uri: string;       
//   type?: string;     
// };

// type DocFile = DocumentPicker.DocumentPickerAsset;

export default function InputQuestion({
  index,
  question,
  correctAnswer,
  onInput,
  onUpload,
  submitted,
  inputAnswer,
  uploadedFile,
}: QuestionProps) {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
        onUpload?.(index, {
            uri: asset.uri,
            type: asset.mimeType ?? "application/octet-stream",
            name: asset.name,
        });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      onUpload?.(index, {
        uri: asset.uri,
        type: asset.type ?? "image/jpeg",
        name: asset.fileName ?? "image.jpg",
      });
    }
  };

  return (
    <View className="bg-bgLight rounded-2xl p-4 shadow-md mb-4">
      {/* Question */}
      <Text className="text-headingColor font-semibold text-lg mb-3">
        {index + 1}. {question}
      </Text>

      {/* Input + Upload */}
     
        <View className="space-y-3">
          {/* Text Input */}
          <TextInput
            style={{
                height: 100,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                textAlignVertical: "top"
            }}
            className="border border-border rounded-xl p-3"
            placeholder="Type your answer..."
            value={inputAnswer!}
            editable={!submitted}
            onChangeText={(text) => onInput?.(index, text)}
          />

          <Text className="text-center text-gray-500">OR</Text>

          {/* Upload buttons */}
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-1 bg-primaryColor p-3 rounded-xl mx-1"
              onPress={pickDocument}
              disabled={submitted}
            >
              <Text className="text-white text-center">Upload Document</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-secondaryColor p-3 rounded-xl mx-1"
              onPress={pickImage}
              disabled={submitted}
            >
              <Text className="text-white text-center">Upload Image</Text>
            </TouchableOpacity>
          </View>

          {/* Show uploaded file */}
          {uploadedFile && (
            <View className="mt-3 p-3 border rounded-xl bg-gray-50">
              <Text className="text-sm font-medium">
                Uploaded: {uploadedFile.name}
              </Text>
            </View>
          )}
        </View>
      
    </View>
  );
}
