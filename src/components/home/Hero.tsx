import { useEffect, useState } from "react";
const images=[
    "https://image.tmdb.org/t/p/original/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg",
  "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
];
const Hero = () => {
    const[currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
   
  
  return (
    <section className="relative w-full h-[70vh]">
      
       {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
     

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="px-6 max-w-7xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Movies You’ll Love
          </h1>

          <p className="text-gray-200 max-w-xl text-center">
            Browse trending movies, explore series, and find your next favorite
            show all in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
