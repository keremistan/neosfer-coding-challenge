import { AddMovieBtn } from "./add_movie_btn";
import { RemoveMovieBtn } from "./remove_movie_btn";
import { JSONFilePreset } from "lowdb/node";

type Movie = {
  id: number;
  title: string;
  comment: string | null;
  rating: number | null;
}

type DB = {
  movies: Movie[];
}

export default async function Home() {

  // get all movies without using fetch, directly from the server
  const db = await JSONFilePreset<DB>("db.json", { movies: [] });
  const movies = db.data.movies;

  return (<div>
    <h1>Movies</h1>
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Comment: {movie.comment || "N/A"}</p>
          <p>Rating: {movie.rating || "N/A"}</p>
        </li>
      ))}
    </ul>
    <AddMovieBtn />
    <RemoveMovieBtn />
  </div>);
}
