import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BorrowedBooksOverview } from "./BorrowedBooksOverview";
import { BorrowLimitConfiguration } from "./BorrowLimitConfiguration";
import { LibraryAPI } from "@/services/LibraryService";
import { Book, BorrowedBook, UserRoles } from "@/types/types";
import { AddUpdateDeleteBooksForm } from "./AddUpdateDeleteBooksForm";

type LibrarySection = "overview" | "books" | "borrowed" | "config";

const LibraryAction = () => {
  const [activeSection, setActiveSection] =
    useState<LibrarySection>("overview");

  // State
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [userRoles, setUserRoles] = useState<UserRoles[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  /**
   * Load all required data
   */
  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([loadBooks(), loadBorrowedBooks()]);
    } catch (err) {
      setError("Failed to load library data");
      console.error("Error loading initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Pull-to-refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadInitialData();
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Books API
   */
  const loadBooks = async () => {
    try {
      const booksData = await LibraryAPI.getBooks();
      setBooks(booksData.map(LibraryAPI.transformBookData));
    } catch (err) {
      console.error("Error loading books:", err);
      throw err;
    }
  };

  /**
   * Borrowed Books API
   */
  const loadBorrowedBooks = async () => {
    try {
      const borrowedData = await LibraryAPI.getAllBorrowedBooks();
      setBorrowedBooks(borrowedData.map(LibraryAPI.transformBorrowedBookData));
    } catch (err) {
      console.error("Error loading borrowed books:", err);
      throw err;
    }
  };

  /**
   * Alerts
   */
  const showError = (title: string, message: string) =>
    Alert.alert(title, message, [{ text: "OK" }]);

  const showSuccess = (title: string, message: string) =>
    Alert.alert(title, message, [{ text: "OK" }]);

  /**
   * CRUD Handlers
   */
  const handleAddBook = async (bookData: Omit<Book, "id">): Promise<void> => {
    try {
      setLoading(true);
      const backendBook = {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        total_quantity: bookData.quantity,
      };
      const newBook = await LibraryAPI.addBook(backendBook);
      setBooks((prev) => [...prev, LibraryAPI.transformBookData(newBook)]);
      showSuccess("Success", "Book added successfully!");
    } catch {
      showError("Error", "Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBook = async (id: string, updated: Partial<Book>): Promise<void> => {
    try {
      setLoading(true);
      const backendUpdate = {
        ...(updated.title && { title: updated.title }),
        ...(updated.author && { author: updated.author }),
        ...(updated.isbn && { isbn: updated.isbn }),
        ...(updated.quantity && { total_quantity: updated.quantity }),
      };
      const updatedBook = await LibraryAPI.updateBook(id, backendUpdate);
      setBooks((prev) =>
        prev.map((b) =>
          b.id === id ? LibraryAPI.transformBookData(updatedBook) : b
        )
      );
      showSuccess("Success", "Book updated successfully!");
    } catch {
      showError("Error", "Failed to update book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = (id: string) => {
    Alert.alert("Confirm Delete", "Delete this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await LibraryAPI.deleteBook(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
            showSuccess("Success", "Book deleted successfully!");
          } catch {
            showError("Error", "Failed to delete book. Please try again.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleReturnBook = async (borrowId: string) => {
    try {
      setLoading(true);
      await LibraryAPI.returnBook(borrowId);

      // Update local state
      setBorrowedBooks((prev) =>
        prev.map((b) =>
          b.id === borrowId
            ? { ...b, status: "returned" as const, returnDate: new Date() }
            : b
        )
      );

      // Increment availability
      const borrowed = borrowedBooks.find((b) => b.id === borrowId);
      if (borrowed) {
        setBooks((prev) =>
          prev.map((book) =>
            book.title === borrowed.bookTitle
              ? { ...book, available: book.available + 1 }
              : book
          )
        );
      }

      showSuccess("Success", "Book returned successfully!");
    } catch {
      showError("Error", "Failed to return book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExtendDueDate = async (borrowId: string, newDue: Date) => {
    try {
      setLoading(true);
      await LibraryAPI.extendDueDate(
        borrowId,
        newDue.toISOString().split("T")[0]
      );
      setBorrowedBooks((prev) =>
        prev.map((b) => (b.id === borrowId ? { ...b, dueDate: newDue } : b))
      );
      showSuccess("Success", "Due date extended successfully!");
    } catch {
      showError("Error", "Failed to extend due date. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async (borrowId: string) => {
    try {
      setLoading(true);
      await LibraryAPI.sendReminder(borrowId);
      showSuccess("Success", "Reminder sent successfully!");
    } catch {
      showError("Error", "Failed to send reminder. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Stats
   */
  const getOverviewStats = () => ({
    totalBooks: books.reduce((s, b) => s + b.quantity, 0),
    availableBooks: books.reduce((s, b) => s + b.available, 0),
    activeBorrows: borrowedBooks.filter((b) => b.status === "borrowed").length,
    overdueBooks: borrowedBooks.filter((b) => b.status === "overdue").length,
    returnedBooks: borrowedBooks.filter((b) => b.status === "returned").length,
  });

  /**
   * Loading overlay
   */
  const LoadingOverlay = () => (
    <View className="absolute inset-0 bg-black/20 items-center justify-center z-50">
      <View className="bg-white rounded-lg p-4 items-center">
        <ActivityIndicator size="large" color="#128C7E" />
        <Text className="mt-2 text-slate-600">Loading...</Text>
      </View>
    </View>
  );

  /**
   * Sections
   */
  const sections = [
    { id: "overview", title: "Overview", icon: "home-outline" },
    { id: "books", title: "Books", icon: "library-outline" },
    { id: "borrowed", title: "Borrowed", icon: "book-outline" },
    { id: "config", title: "Config", icon: "settings-outline" },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* … keep your overview UI (unchanged for brevity) … */}
          </ScrollView>
        );
      case "books":
        return (
          <AddUpdateDeleteBooksForm
            books={books}
            onAddBook={handleAddBook}
            onUpdateBook={handleUpdateBook}
            onDeleteBook={handleDeleteBook}
          />
        );
      case "borrowed":
        return (
          <BorrowedBooksOverview
            onReturnBook={handleReturnBook}
            onExtendDueDate={handleExtendDueDate}
            onSendReminder={handleSendReminder}
          />
        );
      case "config":
        return (
          <BorrowLimitConfiguration
            userRoles={userRoles}
            onUpdateRole={(id, role) =>
              setUserRoles(
                userRoles.map((r) => (r.id === id ? { ...r, ...role } : r))
              )
            }
            onAddRole={(role) =>
              setUserRoles([
                ...userRoles,
                { ...role, id: Date.now().toString() },
              ])
            }
            onDeleteRole={(id) =>
              setUserRoles(userRoles.filter((r) => r.id !== id))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-mint-50">
      {/* Header Nav */}
      <View className="bg-white border-b border-slate-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-3"
        >
          <View className="flex-row">
            {sections.map((s) => (
              <TouchableOpacity
                key={s.id}
                className={`mr-4 px-4 py-2 rounded-full border ${
                  activeSection === s.id
                    ? "bg-teal-600 border-teal-600"
                    : "bg-white border-slate-300"
                }`}
                onPress={() => setActiveSection(s.id as LibrarySection)}
                disabled={loading}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name={s.icon as any}
                    size={16}
                    color={activeSection === s.id ? "white" : "#64748B"}
                  />
                  <Text
                    className={`ml-2 text-sm font-medium ${
                      activeSection === s.id ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {s.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Section Content */}
      <View className="flex-1">{renderSectionContent()}</View>

      {/* Loader */}
      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default LibraryAction;