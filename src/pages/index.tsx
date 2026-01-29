import Hero from "@/components/home/Hero";
import Reviews from "@/components/home/Reviews";
import SearchBar from "@/components/home/SearchBar";
import TrendingMovies from "@/components/home/TrendingMovies";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
   <>
   <Navbar/>
   <Hero/>
   <SearchBar/>
   <TrendingMovies/>
   <Reviews/>
    <Footer/>
   </>
  );
}
