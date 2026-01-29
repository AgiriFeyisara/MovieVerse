import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white px-8 py-4">
      <div className=" max-w-7xl max-auto flex items-center justify-between ">
        <Link href="/" className="text-xl font-bold">MovieVerse</Link>

        <ul className="flex items-center justify-between gap-10 px-15">
          <li>
            <Link href="/movies" className="hover:text-red-600  hover:scale-105 transition">Movies</Link>
          </li>
          <li>
            <Link href="/series" className="hover:text-red-600 hover:scale-50 transition">Series</Link>
          </li>
          <li>
            <Link href="/download" className="hover:text-red-600 hover:scale-50 transition">How to download</Link>
          </li>
        
          <li><Link href="/contact" className="hover:text-red-600 hover:scale-50 transition">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
