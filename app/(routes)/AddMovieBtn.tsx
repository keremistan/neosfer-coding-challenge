'use client';

import { BsPlusSquareFill } from "react-icons/bs";

export const AddMovieBtn = (
    { movieName, onAddMovie }: { movieName: string, onAddMovie: () => void }
) => {

    const handleClick = () => {
        let apiRes = fetch("/api/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: movieName })
        });

        apiRes.then((res) => res.json()).then((data) => console.log(data));

        onAddMovie();
    }

    return <button className="btn" onClick={handleClick}>
        <BsPlusSquareFill size={24} color="gray" /> Add Movie
    </button>;
}