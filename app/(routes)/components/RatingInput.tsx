'use client';
import { useState } from "react";
import React from "react";

type RatingInputProps = {
    movieId: number;
    movieRating: number | null;
    onRatingChange: () => void;
};

export const RatingInput = ({ movieId, movieRating, onRatingChange }: RatingInputProps) => {

    const [rating, setRating] = useState<number | null>(movieRating);

    const handleRatingChange = async (newRating: number) => {
        await fetch(`/api/updateRating/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rating: newRating })
        });

        onRatingChange();
        
    };

    return (
        <div>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                    <input
                        key={"rating_2" + value}
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        checked={value === rating}
                        onChange={function () {
                            setRating(value);
                            handleRatingChange(value);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};