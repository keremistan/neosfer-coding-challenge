'use client';

import { FaTrash } from "react-icons/fa";

export const RemoveMovieBtn = (
    { movieId, movieTitle, onRemoveMovie }: { movieId: number, movieTitle: string; onRemoveMovie: () => void }
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

    return (<div>
        <button className="btn font-light btn-ghost" onClick={() => {
            const modal = document.getElementById("remove_movie_modal_" + movieId);
            if (modal) {
                (modal as HTMLDialogElement).showModal();
            }
        }}>
            <FaTrash size={16} color="gray" />
        </button>


        <dialog id={"remove_movie_modal_" + movieId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete movie</h3>
                <div className="modal-action">
                    <form method="dialog">

                        <p className="mb-4">Do you really want to remove the following movie from your favourite movie library?</p>
                        <p className="mb-8 text-2xl">{movieTitle}</p>

                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn font-light">Cancel</button>
                        <button className="btn ml-8 btn-error" onClick={handleClick}>Delete</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>);
}