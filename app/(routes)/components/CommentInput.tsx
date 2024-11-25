'use client';

import { sendApiRequest } from "@/app/utility/sendApiRequest";
import { useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";

type CommentInputProps = {
    movieId: number;
    movieComment?: string;
    onCommentChange: () => void;
};

export const CommentInput = ({ movieId, movieComment, onCommentChange }: CommentInputProps) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = async () => {
        let commentRes = await sendApiRequest(`/api/updateComment/${movieId}`, "POST", { comment });

        console.log({ commentRes });

        onCommentChange();

        setComment("");
    };

    const handleRemoveComment = async () => {
        await fetch(`/api/updateComment/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment: "" })
        });

        onCommentChange();
    }

    // if comment exists, show it with a trashCan icon that removes that comment
    if (movieComment) {
        return (
            <div className="flex justify-between group">
                <p className="text-gray-500" >{movieComment}</p>
                <button className="ml-4 hidden group-hover:block" onClick={handleRemoveComment} aria-label="Remove Comment">
                    <FaTrash size={16} color="lightgray" />
                </button>
            </div>
        );
    }

    // if no comment, show input field and a submit button
    return (
        <div className="rounded flex">
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full ${comment !== "" ? "px-2" : ""}`}
                placeholder="add comment"
            />

            {/* Show the submit button only if the input field contains a nonempty value */}
            {comment && (
                <button className="mx-4" onClick={handleCommentChange} aria-label="Submit Comment">
                    <FaArrowRight color="gray" />
                </button>
            )}
        </div>
    );
};
