import { NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";

export async function POST(req: Request, 
    { params }: { params: Promise<{ slug: string }> }
) {
    console.log("update comment to a movie API route hit!");

    const { slug } = await params;
    console.log("slug: ", slug);

    const body = await req.json();
    console.log("body: ", body);

    // check if body contains 'comment' and it is a non-empty string
    if (!body.comment || typeof body.comment !== 'string' || body.comment.trim().length === 0) {
        return NextResponse.json({ message: "Invalid comment" }, { status: 400 });
    }

    // check if slug is a number
    if (isNaN(parseInt(slug))) {
        return NextResponse.json({ message: "Invalid movie id" }, { status: 400 });
    }

    const id: number = parseInt(slug);
    const comment: string = body.comment;

    console.log("Initializing db...");
    const defaultData: {
        movies: {
            id: number;
            title: string;
            comment: string | null;
            rating: number | null;
        }[]
    } = { movies: [] };
    const db = await JSONFilePreset("db.json", defaultData);

    // find movie by id
    const movie = db.data.movies.find((movie) => movie.id === id);
    if (!movie) {
        return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    // add comment to movie
    console.log("Adding comment to movie...");
    movie.comment = comment;
    await db.write();

    return NextResponse.json({ message: "Comment added successfully" });
}