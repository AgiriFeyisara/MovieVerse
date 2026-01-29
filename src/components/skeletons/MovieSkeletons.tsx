const MovieSkeleton = () => {
  return (
    <div className="min-w-[160px] sm:min-w-[200px] snap-start">
      <div className="h-64 w-full rounded-lg bg-gray-800 animate-pulse" />
      <div className="mt-3 h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
      <div className="mt-2 h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
    </div>
  );
};

export default MovieSkeleton;
