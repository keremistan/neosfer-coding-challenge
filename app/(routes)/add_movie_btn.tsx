'use client';

export const AddMovieBtn = () => {

    const handleClick = () => {
        let apiRes = fetch("/api/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: "Interstellar" })
        });

        apiRes.then((res) => res.json()).then((data) => console.log(data));

        console.log("Add button clicked!");
    }
    
    return <button onClick={handleClick}>Add Movie Button</button>;
}