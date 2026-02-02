import { reviews } from "@/data/reviews";
const Reviews = () => {
  return (
    <section className="px-6 py-16 bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-10 text-white">
        What Users Love About MovieVerse
      </h2>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
          >
            <p className="text-sm text-gray-300">“{review.comment}”</p>
            <h4 className="mt-4 font-semibold text-white">{review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Reviews;
