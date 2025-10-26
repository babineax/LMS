// services/LibraryAPI.ts
import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "./api";

import {
  AddBookRequest,
  BackendBook,
  BackendBorrowedBook,
  BorrowBookRequest,
  ExtendDueDateRequest,
  FrontendBook,
  FrontendBorrowedBook,
  ReturnBookRequest,
  UpdateBookRequest,
} from "@/types/types";
import { supabase } from "@/libs/supabase";

/**
 * Library API Wrapper
 * Handles all library-related API calls with proper error handling and token management
 */
export class LibraryAPI {
  /**
   * Get authorization header with Supabase session token
   */
  static async getAuthHeaders(): Promise<Record<string, string>> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.access_token) {
      throw new Error("No authentication token found");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
    };
  }

  /**
   * Centralized error handler
   * Always returns a human-friendly string
   */
  static handleAPIError(error: AxiosError): string {
    if (error.response) {
      const { status, data } = error.response;
      const errorData = data as any;

      switch (status) {
        case 400:
          return errorData?.message || "Invalid request data";
        case 401:
          return "Unauthorized: Please log in again";
        case 403:
          return "Forbidden: You don’t have permission for this action";
        case 404:
          return "Resource not found";
        case 500:
          return "Server error: Something went wrong on our side";
        default:
          return errorData?.message || "Unknown API error occurred";
      }
    } else if (error.request) {
      return "Network error: No response from server";
    } else {
      return error.message || "Unexpected error occurred";
    }
  }

  /** Wrap API calls in try/catch with consistent error handling */
  private static async safeRequest<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      const message = this.handleAPIError(err as AxiosError);
      console.error("❌ API Error:", message);
      throw new Error(message);
    }
  }

  // Add a new book
  static async addBook(bookData: AddBookRequest): Promise<BackendBook> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.post<BackendBook>("/library/books", bookData, {
        headers,
      });
      return response.data;
    });
  }

  // Get all books
  static async getBooks(): Promise<BackendBook[]> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.get<BackendBook[]>("/library/books", {
        headers,
      });
      return response.data;
    });
  }

  // Update book
  static async updateBook(
    bookId: string,
    updateData: UpdateBookRequest
  ): Promise<BackendBook> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.put<BackendBook>(
        `/library/books/${bookId}`,
        updateData,
        { headers }
      );
      return response.data;
    });
  }

  // Delete book
  static async deleteBook(bookId: string): Promise<void> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      await api.delete(`/library/books/${bookId}`, { headers });
    });
  }

  // Borrow book
  static async borrowBook(
    bookId: string,
    dueDate: string
  ): Promise<BackendBorrowedBook> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.post<BackendBorrowedBook>(
        `/library/borrow/${bookId}`,
        { due_date: dueDate } as BorrowBookRequest,
        { headers }
      );
      return response.data;
    });
  }

  // Return book
  static async returnBook(
    borrowId: string,
    returnedAt: string = new Date().toISOString()
  ): Promise<BackendBorrowedBook> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.post<BackendBorrowedBook>(
        `/library/return/${borrowId}`,
        { returned_at: returnedAt } as ReturnBookRequest,
        { headers }
      );
      return response.data;
    });
  }

  // Borrowing history
  static async getBorrowingHistory(
    studentId: string
  ): Promise<BackendBorrowedBook[]> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.get<BackendBorrowedBook[]>(
        `/library/history/${studentId}`,
        { headers }
      );
      return response.data;
    });
  }

  // All borrowed books
  static async getAllBorrowedBooks(): Promise<BackendBorrowedBook[]> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.get<BackendBorrowedBook[]>(
        "/library/borrowed",
        { headers }
      );
      return response.data;
    });
  }

  // Send reminder
  static async sendReminder(borrowId: string): Promise<{ message: string }> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.post<{ message: string }>(
        `/library/reminder/${borrowId}`,
        {},
        { headers }
      );
      return response.data;
    });
  }

  // Extend due date
  static async extendDueDate(
    borrowId: string,
    newDueDate: string
  ): Promise<BackendBorrowedBook> {
    return this.safeRequest(async () => {
      const headers = await this.getAuthHeaders();
      const response = await api.put<BackendBorrowedBook>(
        `/library/extend/${borrowId}`,
        { new_due_date: newDueDate } as ExtendDueDateRequest,
        { headers }
      );
      return response.data;
    });
  }

  // Transform backend → frontend
  static transformBookData(backendBook: BackendBook): FrontendBook {
    return {
      id: backendBook.id,
      title: backendBook.title,
      author: backendBook.author,
      isbn: backendBook.isbn,
      category: backendBook.category || "General",
      quantity: backendBook.total_quantity,
      available: backendBook.available_quantity,
      createdAt: backendBook.created_at,
    };
  }

  static transformBorrowedBookData(
    backendBorrow: BackendBorrowedBook
  ): FrontendBorrowedBook {
    return {
      id: backendBorrow.id,
      bookTitle: backendBorrow.book.title,
      author: backendBorrow.book.author,
      isbn: backendBorrow.book.isbn || "",
      borrowerId: backendBorrow.student_id,
      borrowerName: backendBorrow.student?.name || "Unknown",
      borrowerEmail: backendBorrow.student?.email || "",
      borrowDate: new Date(backendBorrow.borrowed_at),
      dueDate: new Date(backendBorrow.due_date),
      returnDate: backendBorrow.returned_at
        ? new Date(backendBorrow.returned_at)
        : undefined,
      status: backendBorrow.status,
    };
  }
}

/**
 * Custom hook for library operations with loading + error states
 */
export const useLibraryAPI = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const executeWithLoading = async <T>(
    apiCall: () => Promise<T>
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      return await apiCall();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    executeWithLoading,
    clearError: () => setError(null),
  };
};
