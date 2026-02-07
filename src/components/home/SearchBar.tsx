import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({ query, setQuery, onSubmit }: SearchBarProps) => {
  return (
    <section className="w-full py-10 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <form
          onSubmit={onSubmit}
          className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none"
          />

          <button
            type="submit"
            disabled={!query.trim()}
            className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition text-white font-semibold disabled:opacity-50"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
