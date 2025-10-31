// src/components/SearchBar.tsx

import React, { useCallback, useMemo, useState } from 'react';
import { debounce } from '../../helpers/_SearchHelpers';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  delay?: number; // Debounce delay in ms
  className?: string;
}

export default function SearchBar ({
  placeholder = 'Search...',
  onSearch,
  delay = 300,
  className = '',
}:SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize the callback so it doesn't change between renders
  const handleSearch = useCallback(
    (term: string) => {
      onSearch(term);
    },
    [onSearch]
  );

  // Create a debounced version of the search handler
  const debouncedSearch = useMemo(
    () => debounce(handleSearch, delay),
    [handleSearch, delay]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value); // This is now safely debounced
  };
  return (
    <div className={`w-full  ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
      />
    </div>
  );
};

;