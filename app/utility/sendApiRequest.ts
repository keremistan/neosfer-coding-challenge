export const sendApiRequest = async (url: string, method: string, body?: object) => {
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
    });

    return await res.json();
}