'use client';

import { useState, useEffect } from "react";
import { AddMovieBtn } from "../add_movie_btn";
import { RemoveMovieBtn } from "./RemoveMovieBtn";
import { CommentInput } from "./CommentInput";
import { RatingInput } from "./RatingInput";

type Movie = {
    id: number;
    title: string;
    comment: string | null;
    rating: number | null;
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

    return (
        <div>
            <h1>Movies</h1>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-wrap">
                {/* <div className="flex justify-start"> */}
                {movies.map((movie) => (
                    <div className="container w-1/3 m-4 bg-slate-300 rounded" key={movie.id}>
                        <div className="flex">
                            <h2 className="text-2xl mb-2">{movie.title}</h2>
                            <RemoveMovieBtn movieId={movie.id} onRemoveMovie={() => fetchMovies(searchQuery)} />
                        </div>
                        <div className="my-4">
                            <CommentInput movieId={movie.id} movieComment={movie.comment} onCommentChange={() => fetchMovies(searchQuery)} />
                        </div>
                        <div className="my-4">
                            <RatingInput movieId={movie.id} movieRating={movie.rating} onRatingChange={() => fetchMovies(searchQuery)} />
                        </div>
                    </div>
                )
                )}
            </div>
            <AddMovieBtn />

        </div>
    );
};