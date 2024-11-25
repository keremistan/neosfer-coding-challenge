import { NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";
import { DbType } from "@/app/types/db";

export async function POST(req: Request) {
    console.log("createMovie API route hit!");

    const body = await req.json();
    console.log("body: ", body);

    // check if body contains 'title' and it is a non-empty string
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
        return NextResponse.json({ message: "Invalid movie title" }, { status: 400 });
    }

    const title: string = body.title;

    console.log("Initializing db...");
    const defaultData: DbType = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    // get highest id
    let highestId = 0;
    db.data.movies.forEach((movie) => {
        const id = movie.id;
        if (id > highestId) {
            highestId = id;
        }
    });

    // add movie to db
    console.log("Adding movie to db...");
    db.data.movies.push({
        id: highestId + 1,
        title: title,
        isInWishlist: false
    });
    await db.write();

    return NextResponse.json({ message: "Movie added successfully" });
}