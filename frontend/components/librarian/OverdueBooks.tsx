'use client';

import { useState, useEffect } from 'react';

interface OverdueBook {
  id: string;
  bookTitle: string;
  bookId: string;
  studentName: string;
  studentId: string;
  borrowDate: string;
  dueDate: string;
  daysOverdue: number;
  fineAmount: number;
}

export default function OverdueBooks() {
  const [overdueBooks, setOverdueBooks] = useState<OverdueBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOverdueBooks();
  }, []);

  const fetchOverdueBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/library/books/overdue');
      
      if (!response.ok) {
        throw new Error('Failed to fetch overdue books');
      }
      
      const data = await response.json();
      setOverdueBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkReturned = async (bookId: string, borrowId: string) => {
    try {
      const response = await fetch(`/api/library/books/${bookId}/return`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ borrowId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark as returned');
      }

      // Remove the returned book from the list
      setOverdueBooks(overdueBooks.filter(book => book.id !== borrowId));
      alert('Book marked as returned successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to mark as returned');
    }
  };

  if (loading) return <div className="loading loading-spinner loading-lg"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Overdue Books</h2>
        
        {overdueBooks.length === 0 ? (
          <p className="text-gray-500">No overdue books</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Student</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                  <th>Fine</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {overdueBooks.map((book) => (
                  <tr key={book.id} className={book.daysOverdue > 30 ? 'bg-error/20' : ''}>
                    <td className="font-medium">{book.bookTitle}</td>
                    <td>
                      <div>
                        <div className="font-bold">{book.studentName}</div>
                        <div className="text-sm text-gray-500">ID: {book.studentId}</div>
                      </div>
                    </td>
                    <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${book.daysOverdue > 7 ? 'badge-error' : 'badge-warning'}`}>
                        {book.daysOverdue} days
                      </span>
                    </td>
                    <td className="font-bold text-error">Ksh {book.fineAmount.toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => handleMarkReturned(book.bookId, book.id)}
                        className="btn btn-primary btn-sm"
                      >
                        Mark Returned
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Statistics */}
        {overdueBooks.length > 0 && (
          <div className="stats shadow mt-4">
            <div className="stat">
              <div className="stat-title">Total Overdue</div>
              <div className="stat-value">{overdueBooks.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Fines</div>
              <div className="stat-value">
                Ksh {overdueBooks.reduce((sum, book) => sum + book.fineAmount, 0).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}