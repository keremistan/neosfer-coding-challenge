import { NextRequest, NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";
import { DbType } from "@/app/types/db";

export async function GET(req: NextRequest) {
    console.log("toggle wishlist API route hit!");

    const searchParams = req.nextUrl.searchParams;
    console.log("searchParams: ", searchParams);

    const movieId = searchParams.get("movieId");
    console.log("movieId: ", movieId);

    const defaultData: DbType = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    const allMovies = db.data.movies;
    console.log("Movies: ", allMovies);

    const movie = allMovies.find(movie => movie.id === parseInt(movieId || ""));
    console.log("Movie: ", movie);

    if (!movie) {
        return NextResponse.error();
    }

    movie.isInWishlist = !movie.isInWishlist;
    console.log("Updated Movie: ", movie);

    await db.write();
    return NextResponse.json(movie);
}


