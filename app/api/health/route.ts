export function GET(request: Request) {
    const response = {
        status: "OK"
    }

    return new Response(JSON.stringify(response), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
