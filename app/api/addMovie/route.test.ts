import { POST } from "./route";
import { describe, it, expect, vi } from "vitest";

vi.mock("lowdb/node", () => ({
    JSONFilePreset: vi.fn().mockImplementation(() => ({
        data: { movies: [] },
        write: vi.fn(),
    })),
}));

describe("POST /api/addMovie", () => {
    it("should add movie and return success message", async () => {
        const req = {
            json: vi.fn().mockResolvedValue({ title: "Inception" }),
        } as unknown as Request;

        const res = await POST(req);

        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json).toEqual({ message: "Movie added successfully" });
    });
});