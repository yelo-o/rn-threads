import "expo-router/entry";

import { createServer, Response } from "miragejs";

if (__DEV__) {
    createServer({
        routes() {
            this.post("/login", (schema, request) => {
                const { username, password } = JSON.parse(request.requestBody);
                if (username === "testuser" && password === "password123") {
                    return {
                        accessToken: "mocked-access-token",
                        refreshToken: "mocked-refresh-token",
                        user: {
                            id: "testuser",
                            name: "Test User",
                            description: "Mocked user for testing",
                            profileImageUrl:
                                "https://avatars.githubusercontent.com/u/885857?v=4",
                        },
                    };
                } else {
                    return new Response(
                        401,
                        {},
                        { error: "Invalid credentials" }
                    );
                }
            });
        },
    });
}
