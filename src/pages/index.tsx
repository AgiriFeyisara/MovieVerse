import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Hero from "@/components/home/Hero";
import Reviews from "@/components/home/Reviews";
import SearchBar from "@/components/home/SearchBar";
import TrendingMovies from "@/components/home/TrendingMovies";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TrendingSeries from "@/components/home/TrendingSeries";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/movies?search=${encodeURIComponent(query)}`);
  };
  return (
    <>
      <Navbar />
      <Hero />

      <div>
        <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />
      </div>

      <TrendingMovies />
      <TrendingSeries />
      <Reviews />
      <Footer />
    </>
  );
}
