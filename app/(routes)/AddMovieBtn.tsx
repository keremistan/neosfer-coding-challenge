'use client';

import { useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";

export const AddMovieBtn = (
    { onAddMovie }: { onAddMovie: () => void }
) => {

    const [movieName, setMovieName] = useState<string>("");

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

    return (
        <div>
            <button className="btn" onClick={() => {
                const modal = document.getElementById('add_movie_modal_1');
                if (modal) {
                    (modal as HTMLDialogElement).showModal();
                }
            }}><BsPlusSquareFill size={24} color="gray" /> Add Movie</button>

            
            <dialog id="add_movie_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add a new movie</h3>
                    <div className="modal-action">
                        <form method="dialog">

                            <input
                                type="text"
                                placeholder="Movie name"
                                className="input input-bordered w-full max-w-xs mb-6"
                                onChange={(e) => setMovieName(e.target.value)}
                            />

                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn font-light">Close</button>
                            <button className="btn ml-8" onClick={handleClick}>Add</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}