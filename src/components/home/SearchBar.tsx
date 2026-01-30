import { useState } from "react";
import { useRouter } from "next/router";

interface SearchBarProps {
  showTypeSelector?: boolean; // optional, default false
}

const SearchBar = ({ showTypeSelector = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"movie" | "tv" | "all">("all");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirect depending on type
    if (type === "movie") {
      router.push(`/movies?search=${encodeURIComponent(query)}`);
    } else if (type === "tv") {
      router.push(`/series?search=${encodeURIComponent(query)}`);
    } else {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="w-full py-10 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search for a movie or TV show..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none"
          />

          {/* Only show type selector on homepage */}
          {showTypeSelector && (
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "movie" | "tv" | "all")
              }
              className="bg-gray-200 text-gray-900 px-3 py-3 border-l border-gray-300 outline-none"
            >
              <option value="all">All</option>
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          )}

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 font-semibold hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
