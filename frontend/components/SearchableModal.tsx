import React, { useState } from "react";
import { Modal, View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";

interface BottomSheetSearchableListProps<T> {
  visible: boolean;
  data: T[];
  displayKey: keyof T;
  onSelect: (item: T) => void;
  onClose: () => void;
}

export default function BottomSheetSearchableList<T extends { id: string }>({
  visible,
  data,
  displayKey,
  onSelect,
  onClose,
}: BottomSheetSearchableListProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = data.filter((item) =>
    String(item[displayKey]).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-white p-4">
        <TextInput
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          className="border p-2 rounded mb-4"
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 border-b border-gray-200"
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text>{String(item[displayKey])}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity className="p-3 mt-4 bg-gray-200 rounded" onPress={onClose}>
          <Text className="text-center">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
