import Card from "@/components/Card";
import { useState } from "react";
import { Circle, CircleCheckIcon, SearchIcon } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View, ScrollView, Dimensions, TextInput } from "react-native";

const filters = [
  "All",
  "Literature",
  "Mathematics",
  "Computer Science",
]

type BookType = {
  id: string
  title: string
  author: string
  category: string
  available: boolean
}

const books: BookType[] = [
  { id: "1", title: "Introduction to Python", author: "John Doe", category: "Computer Science", available: true },
  { id: "2", title: "Advanced Algebra II", author: "Jane Smith", category: "Mathematics", available: true },
  { id: "3", title: "Shakespeare Anthology", author: "William S.", category: "Literature", available: false },
]

export default function Library() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

   const { width } = Dimensions.get("window");
  const cardWidth = (width - 60) / 2;


  const filteredBooks = books.filter((book) => {
    const matchesFilter =
      selectedFilter === "All" || book.category === selectedFilter
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggleBookSelection = (bookId: string) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    )
  }
  return (
    <ScrollView className="flex-1 bg-bgMain" showsVerticalScrollIndicator={false}>
        <View className="bg-bgLight mx-4 mt-12 rounded-xl p-4">
            <View className="p-2">
              <TouchableOpacity className="flex-row items-center gap-2 bg-white rounded-xl px-2 shadow">
                <SearchIcon size={16} color="#2C3E50" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Find a book"
                  placeholderTextColor={"#2C3E50"}
                  className="ml-2 flex-1 text-black"
                />
              </TouchableOpacity>
            </View>
            {/* filters */}
            <View className="flex-row justify-center gap-4">
              {filters.map((filter, index) => {
                const isSelectedFilter = selectedFilter === filter
                return(
                <View key={index}>
                  <TouchableOpacity 
                      onPress={() => setSelectedFilter(filter)}
                    className={`${isSelectedFilter ? "bg-actionColor" : "bg-[#b3f4e8]"} rounded-lg px-3 py-2 justify-center items-center`}
                  >
                    <Text>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                </View>
              )})}
            </View>
            {/* books */}
            <FlatList
              data={filteredBooks}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{ padding: 8 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text className="text-center text-gray-500 mt-8">
                  No books found.
                </Text>
              }
              renderItem={({ item }) =>{ 
                const isSelected = selectedBooks.includes(item.id)
                return(
                  <View style={{width: cardWidth}} className="gap-2 py-2 px-2">
                    <Card 
                      onPress={() => toggleBookSelection(item.id)}
                      className=""
                    >
                      <View className="flex-row justify-between py-3">
                        {/* <Book size={30} color="#2C3E50" /> */}
                        <Text className="text-center text-4xl">📚</Text>
                        {item.available && (
                          <>
                            {isSelected ? (
                            <CircleCheckIcon size={30} color="white" fill={"#1ABC9C"} />
                          ) : (
                            <Circle size={30} color="#2C3E50" />
                          )}
                          </>)
                          }
                        
                        
                      </View>
                      <View className="py-3">
                        <Text className="text-headingColor text-left text-base">
                          {item.title}
                        </Text>
                        <Text>{item.author}</Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => toggleBookSelection(item.id)} className={`${item.available ? "bg-[#c4f7ed]" : "bg-gray-500"} rounded-xl p-2 justify-center items-center`}>
                          {item.available ? <Text >Available</Text> : <Text className="text-white">Unavailable</Text>}
                        </TouchableOpacity>
                      </View>
                    </Card>
                  </View>
                )}
              }
            />
                
            <View className="py-4">
              <TouchableOpacity className="bg-actionColor justify-center items-center rounded-xl p-4">
                {selectedBooks.length === 0 ? (
                  <Text className="text-white font-bold">Select a book</Text>
                ):(
                  <Text className="text-white font-bold">Borrow ({selectedBooks.length})</Text>

                )}
              </TouchableOpacity>
            </View>
        </View>
        
    </ScrollView>
  );
}