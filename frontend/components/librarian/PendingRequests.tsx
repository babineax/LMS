'use client';

import { useState, useEffect } from 'react';

interface BorrowRequest {
  id: string;
  studentName: string;
  studentId: string;
  bookTitle: string;
  bookId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function PendingRequests() {
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/library/requests/pending');
      
      if (!response.ok) {
        throw new Error('Failed to fetch pending requests');
      }
      
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      const response = await fetch(`/api/library/requests/${requestId}/approve`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to approve request');
      }

      // Remove the approved request from the list
      setRequests(requests.filter(req => req.id !== requestId));
      alert('Request approved successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to approve request');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const response = await fetch(`/api/library/requests/${requestId}/reject`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }

      // Remove the rejected request from the list
      setRequests(requests.filter(req => req.id !== requestId));
      alert('Request rejected successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to reject request');
    }
  };

  if (loading) return <div className="loading loading-spinner loading-lg"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Pending Borrow Requests</h2>
        
        {requests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Request Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <div>
                        <div className="font-bold">{request.studentName}</div>
                        <div className="text-sm text-gray-500">ID: {request.studentId}</div>
                      </div>
                    </td>
                    <td className="font-medium">{request.bookTitle}</td>
                    <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="btn btn-success btn-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}