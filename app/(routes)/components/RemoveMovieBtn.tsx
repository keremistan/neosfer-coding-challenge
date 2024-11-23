'use client';

import { FaTrash } from "react-icons/fa";

export const RemoveMovieBtn = (
    { movieId, onRemoveMovie }: { movieId: number, onRemoveMovie: () => void }
) => {

    const handleClick = () => {
        let apiRes = fetch("/api/removeMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: movieId })
        });

        apiRes.then((res) => res.json()).then((data) => console.log(data));

        onRemoveMovie();
    }

    return <button onClick={handleClick}>
        <FaTrash size={16} color="gray" />
    </button>;
}