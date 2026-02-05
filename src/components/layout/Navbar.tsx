import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-black text-white px-8 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MovieVerse
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link href="/movies" className="hover:text-red-600 transition">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/series" className="hover:text-red-600 transition">
              Series
            </Link>
          </li>
          <li>
            <Link href="/download" className="hover:text-red-600 transition">
              How to download
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-red-600 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className="ml-4 bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
            >
              Favorites
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 p-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" onClick={() => setIsOpen(false)}>
              Movies
            </Link>
          </li>
          <li>
            <Link href="/series" onClick={() => setIsOpen(false)}>
              Series
            </Link>
          </li>
          <li>
            <Link href="/download" onClick={() => setIsOpen(false)}>
              How to download
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
