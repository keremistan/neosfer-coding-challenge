import { useState } from "react";
import { AddMovieBtn } from "./add_movie_btn";
import { RemoveMovieBtn } from "./remove_movie_btn";
import { JSONFilePreset } from "lowdb/node";
import { CommentInput } from "./components/CommentInput";
import { MoviesList } from "./components/MoviesList";

type Movie = {
  id: number;
  title: string;
  comment: string | null;
  rating: number | null;
}

type DB = {
  movies: Movie[];
}

export default function Home() {
  return (
    <div>
      <MoviesList />
    </div>
  );
}
