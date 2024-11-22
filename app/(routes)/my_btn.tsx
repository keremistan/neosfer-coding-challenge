'use client';

export const MyBtn = () => {

    const handleClick = () => {
        let apiRes = fetch("/api/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: "Interstellar" })
        });

        apiRes.then((res) => res.json()).then((data) => console.log(data));

        console.log("Button clicked!");
    }

    return <button onClick={handleClick}>My Button</button>;
}