import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  fetchTrendingTV,
  searchTV,
  fetchTVByFilters,
  TMDB_IMAGE_BASE_URL,
} from "@/lib/tmdb";
import SearchBar from "@/components/home/SearchBar";
import Footer from "@/components/layout/Footer";
import { countries, genres, years } from "@/data/filterOption";

const SeriesPage = () => {
  const router = useRouter();
  const searchQuery = router.query.search as string | undefined;

  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState(searchQuery || "");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Favorites
  useEffect(() => {
    const stored = localStorage.getItem("favoriteSeries");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteSeries", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Load Series
  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true);
        setPage(1);

        if (selectedCountry || selectedGenre || selectedYear) {
          const data = await fetchTVByFilters({
            country: selectedCountry,
            genre: selectedGenre,
            year: selectedYear,
          });
          setSeries(data.results || []);
          setHasMore(data.results?.length > 0);
          return;
        }

        if (searchQuery) {
          const data = await searchTV(searchQuery);
          setSeries(data.results);
          setHasMore(data.results.length > 0);
          return;
        }

        const data = await fetchTrendingTV();
        setSeries(data.results);
        setHasMore(true);
      } catch (err) {
        console.error("Failed to load series", err);
      } finally {
        setLoading(false);
      }
    };

    loadSeries();
  }, [searchQuery, selectedCountry, selectedGenre, selectedYear]);

  const loadMoreSeries = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const nextPage = page + 1;
      let data;

      if (selectedCountry || selectedGenre || selectedYear) {
        data = await fetchTVByFilters({
          country: selectedCountry,
          genre: selectedGenre,
          year: selectedYear,
          page: nextPage,
        });
      } else if (query.trim()) {
        data = await searchTV(query, nextPage);
      } else {
        data = await fetchTrendingTV(nextPage);
      }

      if (!data.results?.length) {
        setHasMore(false);
        return;
      }

      setSeries((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/series?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="flex items-center px-6 py-4 shadow-md">
        <button onClick={() => router.back()} className="text-2xl mr-4">
          ←
        </button>
        <h1 className="text-2xl font-bold">TV Series</h1>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto bg-gray-800 rounded-lg mt-6">
        <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        <div className="flex gap-2 mt-4 flex-wrap">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-gray-700 text-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-gray-700 text-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-700 text-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {loading ? (
          <p>Loading series...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {series.map((tv) => (
              <div
                key={tv.id}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}${tv.poster_path}`}
                  alt={tv.name}
                  width={300}
                  height={450}
                />
                <div className="p-2 flex items-center justify-between">
                  <div>
                    <Link href={`/series/${tv.id}`} className="font-semibold">
                      {tv.name}
                    </Link>
                    <p className="text-sm text-gray-400">
                      {tv.first_air_date?.split("-")[0]}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(tv.id)}
                    className="mb-5"
                  >
                    {favorites.includes(tv.id) ? "❤️ Added" : "🤍 Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && !loading && (
          <button
            onClick={loadMoreSeries}
            className="mt-8 flex m-auto bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load More series
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SeriesPage;
