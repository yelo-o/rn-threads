import { Redirect, router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
    const insets = useSafeAreaInsets();
    const isLoggedIn = false;
    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />;
    }
    const onLogin = () => {
        console.log("Login button pressed");
        fetch("/login", {
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
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };
    return (
        <View style={{ paddingTop: insets.top }}>
            <Pressable
                onPress={() => {
                    router.back();
                }}
            >
                <Text>Back</Text>
            </Pressable>
            <Pressable style={styles.loginButton} onPress={onLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: 100,
    },
    loginButtonText: {
        color: "white",
    },
});
