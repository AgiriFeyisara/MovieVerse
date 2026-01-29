import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchTrendingMovies, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load more movies for pagination
  const loadMoreMovies = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const nextPage = page + 1;
      const data = await fetchTrendingMovies(nextPage);

      if (!data.results || data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more movies", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Search query:", query);
    // TODO: implement search logic
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-black px-6 py-4 shadow-md">
        <button
          onClick={() => history.back()}
          className="text-white text-2xl font-bold"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-center flex-1">Movies</h1>
        <div className="w-6" />
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <form
            onSubmit={handleSubmit}
            className="flex w-full sm:w-1/2 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <input
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 font-semibold text-white"
            >
              Search
            </button>
          </form>

          <div className="flex gap-2">
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2">
              <option>All Countries</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2">
              <option>All Genres</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2">
              <option>All Years</option>
            </select>
          </div>
        </div>

        {/* Movie Grid */}
        <div>
          <h2 className="font-bold text-2xl mb-4">Recommended Movies</h2>

          {loading ? (
            <p className="text-gray-400">Loading movies...</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="group">
                  {/* Poster */}
                  <div className="relative h-72 w-full rounded-lg overflow-hidden">
                    <Image
                      src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title + Favorite */}
                  <div className="flex justify-between items-center mt-2">
                    <Link
                      href={`/movies/${movie.id}`}
                      className="font-semibold text-white hover:underline"
                    >
                      {movie.title}
                    </Link>

                    <button className="ml-2 text-red-500 hover:text-red-600">
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreMovies}
                disabled={loadingMore}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
