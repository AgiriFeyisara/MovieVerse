import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchTVDetails, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";

const SeriesDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [series, setSeries] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    if (!series) return;
    const favorites = JSON.parse(
      localStorage.getItem("favoriteSeries") || "[]",
    );
    setIsFavorite(favorites.includes(series.id));
  }, [series]);

  // Fetch series details
  useEffect(() => {
    if (!id) return;

    const loadSeries = async () => {
      try {
        const data = await fetchTVDetails(id as string);
        setSeries(data);

        // Grab first trailer if exists
        const trailer = data.videos?.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube",
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch {
        setError("Unable to load series details");
      } finally {
        setLoading(false);
      }
    };

    loadSeries();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteSeries") || "[]",
    );

    if (isFavorite) {
      // Remove
      const updated = favorites.filter((x: number) => x !== series.id);
      localStorage.setItem("favoriteSeries", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Add
      favorites.push(series.id);
      localStorage.setItem("favoriteSeries", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (loading)
    return <p className="p-6 text-gray-400 text-center">Loading series...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;
  if (!series) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-black px-6 py-4 shadow-md">
        <button
          onClick={() => router.back()}
          className="text-white text-2xl font-bold"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-center flex-1 truncate">
          {series.name}
        </h1>
        <div className="w-6" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col md:flex-row gap-8">
        {/* Poster + Buttons */}
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={
                series.poster_path
                  ? `${TMDB_IMAGE_BASE_URL}${series.poster_path}`
                  : "/placeholder.png"
              }
              alt={series.name}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
              onClick={() => {
                if (trailerKey) {
                  window.open(
                    `https://www.youtube.com/watch?v=${trailerKey}`,
                    "_blank",
                  );
                } else {
                  alert("Trailer not available");
                }
              }}
            >
              Watch Trailer
            </button>

            <button
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                isFavorite
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={toggleFavorite}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Series Info */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <h1 className="text-3xl font-bold">{series.name}</h1>
          <p className="text-gray-400">
            {series.first_air_date?.split("-")[0]} • {series.number_of_seasons}{" "}
            seasons • ⭐ {series.vote_average}/10
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {series.genres.map((genre: any) => (
              <span
                key={genre.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed mt-2">
              {series.overview}
            </p>
          </div>

          {/* Cast */}
          {series.credits?.cast && series.credits.cast.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                {series.credits.cast.slice(0, 10).map((cast: any) => (
                  <div key={cast.id} className="flex-shrink-0 w-24">
                    {cast.profile_path ? (
                      <div className="relative w-24 h-32 rounded-lg overflow-hidden">
                        <Image
                          src={`${TMDB_IMAGE_BASE_URL}${cast.profile_path}`}
                          alt={cast.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                    <p className="text-sm mt-1 truncate">{cast.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {cast.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
