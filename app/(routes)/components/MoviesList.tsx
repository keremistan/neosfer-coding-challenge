'use client';

import { useState, useEffect } from "react";
import { AddMovieBtn } from "../add_movie_btn";
import { RemoveMovieBtn } from "../remove_movie_btn";
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
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2 className="text-3xl text-tahiti">{movie.title}</h2>
                        <p className="text-red font-medium">Comment: {movie.comment == undefined ? "N/A" : movie.comment.length == 0 ? "No Comment" : movie.comment}</p>
                        <CommentInput movieId={movie.id} onCommentChange={() => fetchMovies(searchQuery)} />
                        <p>Rating: {movie.rating || "N/A"}</p>
                        <RatingInput movieId={movie.id} onRatingChange={() => fetchMovies(searchQuery)} />
                    </li>
                ))}
            </ul>
            <AddMovieBtn />
            <RemoveMovieBtn />
        </div>
    );
};