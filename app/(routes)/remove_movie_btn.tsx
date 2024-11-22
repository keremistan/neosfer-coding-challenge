'use client';

export const RemoveMovieBtn = () => {

    const handleClick = () => {
        let apiRes = fetch("/api/removeMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: 3 })
        });

        apiRes.then((res) => res.json()).then((data) => console.log(data));

        console.log("Rmove button clicked!");
    }

    return <button onClick={handleClick}>Remove Movie</button>;
}