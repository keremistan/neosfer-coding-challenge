
'use client';

import { useState } from "react";

type RatingInputProps = {
    movieId: number;
    onRatingChange: () => void;
};

export const RatingInput = ({ movieId, onRatingChange }: RatingInputProps) => {
    const [rating, setRating] = useState<number | null>(null);

    const handleRatingChange = async () => {
        await fetch(`/api/updateRating/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rating })
        });

        onRatingChange();

        setRating(null);
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
            <button onClick={handleRatingChange}>Submit Rating</button>
        </div>
    );
};