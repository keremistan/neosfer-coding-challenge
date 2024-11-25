'use client';
import { sendApiRequest } from "@/app/utility/sendApiRequest";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type RatingInputProps = {
    movieId: number;
    movieRating?: number;
    onRatingChange: () => void;
};

export const RatingInput = ({ movieId, movieRating, onRatingChange }: RatingInputProps) => {

    const handleRatingChange = async (newRating: number) => {
        let ratingRes = await sendApiRequest(`/api/updateRating/${movieId}`, "POST", { rating: newRating });

        console.log({ ratingRes });

        onRatingChange();
    };

    return (
        <div>
            <div className="flex justify-end items-center text-gray-500">

                {/* if rated, show orange star. Else, gray hollow star */}
                {movieRating == null ?
                    <FaRegStar color="lightgray" />
                    : <FaStar color="orange" />}

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