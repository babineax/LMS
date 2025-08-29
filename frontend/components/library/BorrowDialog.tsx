'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { borrowSchema } from '@/lib/validations/library';

interface BorrowDialogProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function BorrowDialog({ book, isOpen, onClose }: BorrowDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(borrowSchema)
  });

  const onSubmit = async (data: BorrowFormData) => {
    try {
      await fetch('/api/library/borrow', {
        method: 'POST',
        body: JSON.stringify({ ...data, bookId: book.id })
      });
      onClose();
    } catch (error) {
      console.error('Borrow request failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Borrow {book.title}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields here */}
        </form>
      </div>
    </div>
  );
}