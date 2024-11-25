'use client';
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type RatingInputProps = {
    movieId: number;
    movieRating?: number;
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
            <div className="flex justify-end items-center text-gray-500">

                {
                    movieRating == null ? <FaRegStar color="lightgray" /> : <FaStar color="orange" />
                }

                <select value={movieRating || 'R'} onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
                    <option disabled value={'R'}>R</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>

            </div>
        </div>
    );
};