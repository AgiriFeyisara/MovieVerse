import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 mt-20 px-6 py-10 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">MovieVerse</h3>
          <p className="text-sm text-gray-400 mt-2">
            Discover movies you’ll love. Anytime. Anywhere.
          </p>
        </div>

       <div className="flex gap-6 text-sm text-gray-500">
  <Link href="/movies" className="hover:text-gray-900 transition">
    Movies
  </Link>

  <Link href="/series" className="hover:text-gray-900 transition">
    Series
  </Link>

  <Link href="/contact" className="hover:text-gray-900 transition">
    Contact
  </Link>

  <Link href="/how-to-download" className="hover:text-gray-900 transition">
    How to Download
  </Link>
</div>


      </div>

      <p className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} MovieVerse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
