

'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, name: "John Doe", rating: 5, comment: "Amazing shoes! Very comfortable." },
    { id: 2, name: "Sarah Lee", rating: 4, comment: "Good quality, but size runs small." },
  ]);

  const [showReviews, setShowReviews] = useState(false);

  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });

  // handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || newReview.rating === 0) return;

    setReviews([
      ...reviews,
      { id: reviews.length + 1, ...newReview }
    ]);
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <section className="w-full max-w-2xl mx-auto mt-10  rounded-lg bg-white">
      {/* Average Rating */}
      <div className="flex items-center justify-between gap-2 mb-4">
      
          <h2 className="text-heading-3">Reviews</h2>
          
        <span className="ml-auto text-yellow-500 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < Math.round(averageRating) ? "fill-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {averageRating.toFixed(1)} / 5
          </span>
        </span>
        <span onClick={() => setShowReviews(prev => !prev)}>
            {
              showReviews ?  <ChevronDown/> : <ChevronUp />
            }
          </span>
      </div>

      {
        showReviews &&(
          <>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-3 border rounded-md">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{review.name}</p>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mt-1">{review.comment}</p>
          </div>
        ))}
      </div>

     
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">

        <textarea
          placeholder="Write your review..."
          className="border p-2 rounded-md"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />

        <div className="flex items-center gap-2">
          <span className="text-sm">Your Rating:</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              className={`cursor-pointer ${i < newReview.rating ? "fill-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Submit Review
        </button>
      </form>
      </>
        )
      }
    </section>
  );
}
