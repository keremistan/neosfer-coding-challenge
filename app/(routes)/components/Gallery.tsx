'use client';

import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { AddMovieBtn } from "./AddMovieBtn";
import { MovieType } from "../../types/movie";
import { MovieCard } from "./MovieCard";

type HomeSearchQueryContextType = {
    searchQuery: string;
};

export const HomeSearchQueryContext = createContext<HomeSearchQueryContextType>({ searchQuery: '' });

export const Gallery = () => {
    const [movies, setMovies] = useState<MovieType[]>([]);
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
        <HomeSearchQueryContext.Provider value={{ searchQuery }}>
            <div className="m-4">
                {/* Title and adding a movie button */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">MovieLibs</h1>
                    <AddMovieBtn onAddMovie={() => fetchMovies()} />
                </div>

                {/* Search field */}
                <input
                    className="input input-bordered w-full mb-4"
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Laying out the movie cards */}
                <div className="md:flex md:flex-wrap">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} fetchMovies={fetchMovies} />
                    ))}
                </div>
            </div>
        </HomeSearchQueryContext.Provider>
    );
};