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
