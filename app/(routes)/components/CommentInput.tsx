'use client';

import { useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";

type CommentInputProps = {
    movieId: number;
    movieComment: string | null;
    onCommentChange: () => void;
};

export const CommentInput = ({ movieId, movieComment, onCommentChange }: CommentInputProps) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = async () => {
        await fetch(`/api/updateComment/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment })
        });

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

    if (movieComment) {
        return (
            <div className="flex">
                <p>{movieComment}</p>
                <button className="ml-4" onClick={handleRemoveComment} aria-label="Remove Comment">
                    <FaTrash />
                </button>
            </div>
        );
    }

    return (
        <div className="border-2 rounded flex">
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 w-full"
                // placeholder="add comment"
                
            />
            <button className="mx-4" onClick={handleCommentChange} aria-label="Submit Comment">
                <FaArrowRight />
            </button>
        </div>
    );
};
