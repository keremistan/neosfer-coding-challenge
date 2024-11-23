'use client';

import { useState, useEffect } from "react";
import { AddMovieBtn } from "../add_movie_btn";
import { RemoveMovieBtn } from "../remove_movie_btn";
import { CommentInput } from "./CommentInput";

type Movie = {
    id: number;
    title: string;
    comment: string | null;
    rating: number | null;
}

export const MoviesList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async () => {
        const response = await fetch("/api/getAllMovies");
        const data = await response.json();
        console.log("Movies fetched!", data);
        setMovies(data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>Comment: {movie.comment || "N/A"}</p>
                        <CommentInput movieId={movie.id} onCommentChange={fetchMovies} />
                        <p>Rating: {movie.rating || "N/A"}</p>
                    </li>
                ))}
            </ul>
            <AddMovieBtn />
            <RemoveMovieBtn />
        </div>
    );
};