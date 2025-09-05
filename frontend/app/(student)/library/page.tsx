'use client';

import { useState } from 'react';
import BookSearch from '@/components/library/BookSearch';
import BorrowedBooks from '@/components/library/BorrowedBooks';

export default function StudentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Library</h1>
      
      {/* Search Component */}
      <BookSearch onSearch={setSearchQuery} />
      
      {/* Borrowed Books List */}
      <BorrowedBooks />
      
      {/* Search Results */}
      <BookSearchResults query={searchQuery} />
    </div>
  );
}