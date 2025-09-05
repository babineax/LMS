'use client';

// import { useDebounce } from '@/hooks/useDebounce';

export default function BookSearch({ onSearch }: { onSearch: (query: string) => void }) {
  // const debouncedSearch = useDebounce(onSearch, 300);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search books by title, author, or ISBN..."
        // onChange={(e) => debouncedSearch(e.target.value)}
        className="input input-bordered w-full max-w-md"
      />
    </div>
  );
}