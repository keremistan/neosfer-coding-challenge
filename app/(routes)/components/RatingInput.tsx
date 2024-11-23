
'use client';

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

type RatingInputProps = {
    movieId: number;
    movieRating: number | null;
    onRatingChange: () => void;
};

export const RatingInput = ({ movieId, movieRating, onRatingChange }: RatingInputProps) => {
    const [rating, setRating] = useState<number | null>(movieRating);

    const handleRatingChange = async () => {
        await fetch(`/api/updateRating/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rating })
        });

        onRatingChange();
    };

    return (
        <div>
            <input
                type="number"
                min="1"
                max="5"
                value={rating ?? ""}
                onChange={(e) => setRating(Number(e.target.value))}
            />
            <button onClick={handleRatingChange}>
                <FaPaperPlane />
            </button>
        </div>
    );
};