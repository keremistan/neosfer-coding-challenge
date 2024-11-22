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

    return NextResponse.json(db.data.movies);
}