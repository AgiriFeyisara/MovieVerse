import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { toggleFavorite } from "@/store/favoritesSlice";
import Footer from "@/components/layout/Footer";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";

const FavoritesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-900 text-white">
        <div className="flex items-center px-6 py-4 shadow-md bg-gray-800">
          <button
            onClick={() => router.back()}
            className="text-white text-2xl font-bold mr-4 hover:opacity-80"
          >
            ←
          </button>
          <h1 className="text-xl md:text-2xl font-bold">My Favorites</h1>
        </div>
        <div className="text-white flex flex-col items-center justify-center w-full min-h-screen">
          <h1 className="text-3xl font-bold mb-4">No Favorites Added Yet</h1>
          <p className="text-gray-400 mb-6">
            Start adding movies or series to your favorites!
          </p>
          <Link
            href="/movies"
            className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="flex items-center px-6 py-4 shadow-md bg-gray-800">
        <button
          onClick={() => router.back()}
          className="text-white text-2xl font-bold mr-4 hover:opacity-80"
        >
          ←
        </button>
        <h1 className="text-xl md:text-2xl font-bold">My Favorites</h1>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div
            key={`${item.media_type}-${item.id}`}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-72 w-full">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center mt-2 px-2 py-2">
              <div className="flex flex-col">
                <Link
                  href={`/${item.media_type === "movie" ? "movies" : "series"}/${item.id}`}
                  className="font-semibold text-white hover:underline truncate"
                >
                  {item.title}
                </Link>
              </div>
              <button
                onClick={() => dispatch(toggleFavorite(item))}
                className="px-4 py-2 bg-red-600 rounded text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
