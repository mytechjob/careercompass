'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Search careers...',
}: {
  defaultValue?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/browse?q=${encodeURIComponent(q)}` : '/browse');
  }

  return (
    <form className="searchbar" onSubmit={submit} role="search">
      <span className="icon" aria-hidden>🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search careers"
      />
    </form>
  );
}
