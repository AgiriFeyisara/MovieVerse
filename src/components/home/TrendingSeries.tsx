import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchTrendingSeries, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import MovieSkeleton from "../skeletons/MovieSkeletons";

interface Series {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string;
}

const TrendingSeries = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const data = await fetchTrendingSeries();
        setSeries(data.results);
      } catch (err) {
        setError("Unable to load series");
      } finally {
        setLoading(false);
      }
    };

    loadSeries();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 px-6">Trending Series</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 px-6">{error}</p>;
  }

  return (
    <div className="px-7 mb-14">
      <h2 className="text-2xl font-bold mb-6 px-6">Trending Series</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6">
        {series.map((s) => (
          <div
            key={s.id}
            className="min-w-[160px] sm:min-w-[200px] snap-start cursor-pointer hover:scale-105 transition"
          >
            <div className="relative h-64 w-full rounded-lg overflow-hidden group">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${s.poster_path}`}
                alt={s.name}
                fill
                className="object-cover"
              />

              <Link href={`/series/${s.id}`}>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                  <h3 className="text-sm font-semibold text-white">{s.name}</h3>
                  <p className="text-xs text-gray-300">
                    {s.first_air_date?.split("-")[0]}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSeries;
