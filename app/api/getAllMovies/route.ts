import { NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";

export async function GET() {
    console.log("getAllMovies API route hit!");

    const defaultData: {
        movies: {
            id: number;
            title: string;
        }[]
    } = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    const movies = db.data.movies;
    console.log("Movies: ", movies);

    return NextResponse.json(movies);
}