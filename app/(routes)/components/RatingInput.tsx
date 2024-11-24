'use client';
import React from "react";
import { FaStar } from "react-icons/fa";

type RatingInputProps = {
    movieId: number;
    movieRating: number | null;
    onRatingChange: () => void;
};

export const RatingInput = ({ movieId, movieRating, onRatingChange }: RatingInputProps) => {

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
            <div className="flex justify-end items-center">
                <FaStar color="orange" />

                <select className="select select-bordered" onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
                    <option disabled selected={movieRating == null}>R</option>
                    <option selected={movieRating == 1} value={1}>1</option>
                    <option selected={movieRating == 2} value={2}>2</option>
                    <option selected={movieRating == 3} value={3}>3</option>
                    <option selected={movieRating == 4} value={4}>4</option>
                    <option selected={movieRating == 5} value={5}>5</option>
                </select>

            </div>
        </div>
    );
};