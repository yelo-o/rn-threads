import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useState } from "react";
import { Alert } from "react-native";

interface User {
    id: string;
    name: string;
    description: string;
    profileImage: string;
}

export const AuthContext = createContext<{
    user: User | null;
    login?: () => Promise<any>;
    logout?: () => Promise<any>;
}>({ user: null });

export default function RootLayout() {
    const [user, setUser] = useState(null);

    const login = () => {
        return fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                username: "testuser",
                password: "password123",
            }),
        })
            .then((res) => {
                console.log("Response status:", res.status);
                if (res.status >= 400) {
                    return Alert.alert("Login failed", "Invalid credentials");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Login successful:", data);
                setUser(data.user);
                return Promise.all([
                    SecureStore.setItemAsync("accessToken", data.accessToken),
                    SecureStore.setItemAsync("refreshToken", data.refreshToken),
                    AsyncStorage.setItem("userId", JSON.stringify(data.user)),
                ]);
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };
    const logout = () => {
        setUser(null);
        return Promise.all([
            SecureStore.deleteItemAsync("accessToken"),
            SecureStore.deleteItemAsync("refreshToken"),
            AsyncStorage.removeItem("userId"),
        ]).then(() => {
            setUser(null);
            Alert.alert("Logged out", "You have been logged out successfully");
        });
    };

    return (
        <AuthContext value={{ user, login, logout }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal" }}
                />
            </Stack>
        </AuthContext>
    );
}
