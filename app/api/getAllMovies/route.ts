import { NextRequest, NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";

export async function GET(req: NextRequest) {
    console.log("getAllMovies API route hit!");

    const searchParams = req.nextUrl.searchParams;
    console.log("searchParams: ", searchParams);

    const searchQuery = searchParams.get("query");
    console.log("query: ", searchQuery);

    const defaultData: {
        movies: {
            id: number;
            title: string;
        }[]
    } = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    const allMovies = db.data.movies;
    console.log("Movies: ", allMovies);

    if (searchQuery) {
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log("Filtered Movies: ", filteredMovies);
        return NextResponse.json(filteredMovies);
    }

    return NextResponse.json(allMovies);
}