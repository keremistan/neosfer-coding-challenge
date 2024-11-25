import { NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";
import { DbType } from "@/app/types/db";

export async function POST(req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    console.log("update rating to a movie API route hit!");

    const { slug } = await params;
    console.log("slug: ", slug);

    const body = await req.json();
    console.log("body: ", body);

    // check if slug is a number
    if (isNaN(parseInt(slug))) {
        return NextResponse.json({ message: "Invalid movie id" }, { status: 400 });
    }

    const id: number = parseInt(slug);
    const rating: number = body.rating || 0;

    console.log("Initializing db...");
    const defaultData: DbType = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    // find movie by id
    const movie = db.data.movies.find((movie) => movie.id === id);
    if (!movie) {
        return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    // add rating to movie
    console.log("Adding rating to movie...");
    movie.rating = rating;
    await db.write();

    return NextResponse.json({ message: "Rating added successfully" });
}
