'use client';

import React from "react";
import { useState, useEffect } from "react";
import { AddMovieBtn } from "../AddMovieBtn";
import { RemoveMovieBtn } from "./RemoveMovieBtn";
import { CommentInput } from "./CommentInput";
import { RatingInput } from "./RatingInput";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";


type Movie = {
    id: number;
    title: string;
    comment: string | null;
    rating: number | null;
    isInWishlist: boolean;
}

export const MoviesList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchMovies = async (query: string = "") => {
        const response = await fetch(`/api/getAllMovies?query=${query}`);
        const data = await response.json();
        console.log("Movies fetched!", data);
        setMovies(data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        fetchMovies(searchQuery);
    }, [searchQuery]);

    const handleWishlistToggle = async (movieId: number) => {
        await fetch(`/api/toggleWishlist?movieId=${movieId}`);
        fetchMovies(searchQuery);
    }

    return (
        <div className="m-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">MovieLibs</h1>
                <AddMovieBtn onAddMovie={() => fetchMovies()} />
            </div>

            <input
                className="input input-bordered w-full mb-4"
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="md:flex md:flex-wrap">
                {movies.map((movie) => (
                    <div className="container p-4 rounded w-full md:w-1/3" key={movie.id}>
                        <div className="bg-white p-4 rounded drop-shadow">
                            <div className="group flex justify-between items-center">
                                <h2 className="text-2xl mb-2 text-gray-500">{movie.title}</h2>
                                <div className="hidden group-hover:block">

                                <RemoveMovieBtn key={movie.id} movieId={movie.id} movieTitle={movie.title} onRemoveMovie={() => fetchMovies(searchQuery)} />
                                </div>
                            </div>
                            <div className="my-4">
                                <CommentInput movieId={movie.id} movieComment={movie.comment} onCommentChange={() => fetchMovies(searchQuery)} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="my-4">
                                    <RatingInput key={movie.id} movieId={movie.id} movieRating={movie.rating} onRatingChange={() => fetchMovies(searchQuery)} />
                                </div>
                                <div>
                                    <button onClick={() => handleWishlistToggle(movie.id)}>
                                        {movie.isInWishlist ? <FaBookmark color="gray" /> : <FaRegBookmark color="gray" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    );
};