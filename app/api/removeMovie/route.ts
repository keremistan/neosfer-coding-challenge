import { NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";
import { DbType } from "@/app/types/db";

export async function POST(req: Request) {
    console.log("removeMovie API route hit!");

    const body = await req.json();
    console.log("body: ", body);

    // check if body contains 'id' and it is a number
    if (!body.id || typeof body.id !== 'number') {
        return NextResponse.json({ message: "Invalid movie id" }, { status: 400 });
    }

    const id: number = body.id;

    console.log("Initializing db...");
    const defaultData: DbType = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    // remove movie from db
    console.log("Removing movie from db...");
    db.data.movies = db.data.movies.filter((movie) => movie.id !== id);
    await db.write();

    return NextResponse.json({ message: "Movie removed successfully" });
}