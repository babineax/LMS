'use client';

import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
}

interface BorrowDialogProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

interface BorrowFormData {
  borrowDate: string;
  expectedReturn: string;
  purpose?: string;
}

export default function BorrowDialog({ book, isOpen, onClose }: BorrowDialogProps) {
  const [formData, setFormData] = useState<BorrowFormData>({
    borrowDate: new Date().toISOString().split('T')[0], // Today's date
    expectedReturn: '',
    purpose: ''
  });
  
  const [errors, setErrors] = useState<Partial<BorrowFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom validation function
  const validateForm = (data: BorrowFormData): boolean => {
    const newErrors: Partial<BorrowFormData> = {};

    if (!data.expectedReturn) {
      newErrors.expectedReturn = 'Return date is required';
    } else if (new Date(data.expectedReturn) <= new Date(data.borrowDate)) {
      newErrors.expectedReturn = 'Return date must be after borrow date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BorrowFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/library/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bookId: book.id,
          borrowDate: new Date(formData.borrowDate).toISOString(),
          expectedReturn: new Date(formData.expectedReturn).toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit borrow request');
      }

      alert('Borrow request submitted successfully!');
      onClose();
      
      // Reset form
      setFormData({
        borrowDate: new Date().toISOString().split('T')[0],
        expectedReturn: '',
        purpose: ''
      });

    } catch (error) {
      console.error('Borrow request failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Borrow "{book.title}"</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Borrow Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Borrow Date</span>
            </label>
            <input
              type="date"
              name="borrowDate"
              value={formData.borrowDate}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          {/* Expected Return Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Expected Return Date *</span>
            </label>
            <input
              type="date"
              name="expectedReturn"
              value={formData.expectedReturn}
              onChange={handleInputChange}
              className={`input input-bordered ${errors.expectedReturn ? 'input-error' : ''}`}
              required
              min={formData.borrowDate}
            />
            {errors.expectedReturn && (
              <span className="text-error text-sm">{errors.expectedReturn}</span>
            )}
          </div>

          {/* Purpose (Optional) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Purpose (Optional)</span>
            </label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="textarea textarea-bordered"
              placeholder="Why do you need this book?"
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Borrow'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}