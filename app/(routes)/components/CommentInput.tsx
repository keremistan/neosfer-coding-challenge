'use client';

import { useState } from "react";

type CommentInputProps = {
    movieId: number;
    onCommentChange: () => void;
};

export const CommentInput = ({ movieId, onCommentChange }: CommentInputProps) => {
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

    return (
        <div>
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleCommentChange}>Submit Comment</button>
        </div>
    );
};
