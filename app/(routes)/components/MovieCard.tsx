import React, { useContext } from 'react';
import { CommentInput } from './CommentInput';
import { RatingInput } from './RatingInput';
import { RemoveMovieBtn } from './RemoveMovieBtn';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MovieType } from '../../types/movie';
import { HomeSearchQueryContext } from './Gallery';
import { sendApiRequest } from '@/app/utility/sendApiRequest';

type MovieCardProps = {
    movie: MovieType;
    fetchMovies: (searchQuery: string) => void;
};

export const MovieCard = ({ movie, fetchMovies }: MovieCardProps) => {

    const { searchQuery } = useContext(HomeSearchQueryContext);

    const handleWishlistToggle = async (movieId: number) => {
        let toggleRes = await sendApiRequest(`/api/toggleWishlist?movieId=${movieId}`, "GET");

        console.log({ toggleRes });

        fetchMovies(searchQuery);
    }

    return (
        <div className="container p-4 rounded w-full md:w-1/3" key={movie.id}>
            <div className="bg-white p-4 rounded-lg drop-shadow hover:drop-shadow-lg">

                {/* Card title and movie delete button */}
                <div className="group flex justify-between items-center">
                    <h2 className="text-2xl mb-2 text-gray-500">{movie.title}</h2>
                    <div className="hidden group-hover:block">
                        <RemoveMovieBtn key={movie.id} movieId={movie.id} movieTitle={movie.title} onRemoveMovie={() => fetchMovies(searchQuery)} />
                    </div>
                </div>

                {/* Comment input */}
                <div className="my-4">
                    <CommentInput movieId={movie.id} movieComment={movie.comment} onCommentChange={() => fetchMovies(searchQuery)} />
                </div>

                {/* Rating and wishlisting an individual movie */}
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
    );
}