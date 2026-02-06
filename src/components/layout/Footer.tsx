import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const isBlack = router.pathname === "/" || router.pathname === "/movies";

  return (
    <footer className="border-t border-gray-800 mt-20 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* Brand */}
        <div>
          <h3
            className={`text-xl font-bold ${
              isBlack ? "text-black" : "text-white"
            }`}
          >
            MovieVerse
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Discover movies you’ll love. Anytime. Anywhere.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm text-gray-500">
          <Link href="/movies" className="hover:text-gray-300 transition">
            Movies
          </Link>

          <Link href="/series" className="hover:text-gray-300 transition">
            Series
          </Link>

          <Link href="/favorites" className="hover:text-gray-300 transition">
            Favorites
          </Link>

          <Link
            href="/how-to-download"
            className="hover:text-gray-300 transition"
          >
            How to Download
          </Link>
        </div>
      </div>

      {/* TMDB Attribution */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-xs text-gray-500 text-center">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>

        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/tmdb-logo.svg"
            alt="The Movie Database (TMDB)"
            width={120}
            height={40}
            className="opacity-80 hover:opacity-100 transition"
          />
        </a>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} MovieVerse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
