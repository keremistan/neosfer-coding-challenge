import { Gallery } from "./components/Gallery";

type Movie = {
  id: number;
  title: string;
  comment: string | null;
  rating: number | null;
  isInWishlist: boolean;
}

type DB = {
  movies: Movie[];
}

export default function Home() {
  return (
    <div>
      <Gallery />
    </div>
  );
}
