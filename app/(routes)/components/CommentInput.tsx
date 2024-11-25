'use client';

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
            <div className="flex justify-between group">
                <p className="text-gray-500" >{movieComment}</p>
                <button className="ml-4 hidden group-hover:block" onClick={handleRemoveComment} aria-label="Remove Comment">
                    <FaTrash size={16} color="lightgray" />
                </button>
            </div>
        );
    }

    return (
        <div className="rounded flex">
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 w-full "
                placeholder="add comment"
            />
            {comment && (
                <button className="mx-4" onClick={handleCommentChange} aria-label="Submit Comment">
                    <FaArrowRight color="gray" />
                </button>
            )}
        </div>
    );
};
