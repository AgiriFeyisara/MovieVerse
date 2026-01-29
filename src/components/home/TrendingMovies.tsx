import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchTrendingMovies, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import MovieSkeleton from "../skeletons/MovieSkeletons";
import Link from "next/link";


interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const TrendingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        setError("Unable to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

 if (loading) {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {Array.from({ length: 8 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}


  if (error) {
    return <p className="px-6 py-10 text-red-500">{error}</p>;
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[160px] sm:min-w-[200px] snap-start cursor-pointer hover:scale-105 transition"
          >
            <div className="relative h-64 w-full rounded-lg overflow-hidden group">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />

              <Link href={`/movies/${movie.id}`}><div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                <h3 className="text-sm font-semibold text-white">{movie.title}</h3>
                <p className="text-xs text-gray-300">
                  {movie.release_date?.split("-")[0]}
                </p>
              </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
