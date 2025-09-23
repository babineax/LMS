import React, { useState } from "react";
import { Modal, View, TextInput, FlatList, Text, TouchableOpacity, Pressable } from "react-native";

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
      <Pressable 
          className="flex-1 bg-black/40"
          onPress={onClose}
      />
      <View className="absolute bottom-0 left-0 right-0 bg-white max-h-[50%] p-4">
        <TextInput
          placeholder="Search..."
          placeholderClassName="text-headingColor text-sm ml-2"
          value={query}
          onChangeText={setQuery}
          className="border-hairline py-2 rounded-md mb-4"
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          style={{paddingVertical: 8}}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="px-3 py-2 border-b-hairline border-border"
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text className="text-headingColor">{String(item[displayKey])}</Text>
            </TouchableOpacity>
          )}
        />
        {/* <TouchableOpacity className="p-3 mt-4 bg-gray-200 rounded" onPress={onClose}>
          <Text className="text-center">Close</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
}
