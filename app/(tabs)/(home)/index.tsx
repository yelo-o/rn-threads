import { AuthContext } from "@/app/_layout";
import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import { useContext } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const { user } = useContext(AuthContext);
    const isLoggedIn = !!user;

    console.log("pathname >> ", pathname);
    console.log("insets: ", insets);

    const { width, height } = Dimensions.get("window");

    console.log(`화면 너비: ${width}dp, 높이: ${height}dp`);

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <BlurView style={styles.header} intensity={70}>
                <Image source={require("@/assets/images/react-logo.png")} />
                {!isLoggedIn && (
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.navigate("/login")}
                    >
                        <Text style={styles.loginButtonText}>로그인</Text>
                    </TouchableOpacity>
                )}
            </BlurView>
            {isLoggedIn && (
                <View style={styles.tabContainer}>
                    <View style={styles.tab}>
                        <TouchableOpacity
                            onPress={() => {
                                router.replace(`/`);
                            }}
                        >
                            <Text
                                style={{
                                    color: pathname === "/" ? "red" : "black",
                                }}
                            >
                                For you
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                router.replace(`/following`);
                            }}
                        >
                            <Text
                                style={{
                                    color: pathname === "/" ? "black" : "red",
                                }}
                            >
                                Following
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            router.push(`/@kmg/post/1`);
                        }}
                    >
                        <Text>게시글1</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            router.push(`/@kmg/post/2`);
                        }}
                    >
                        <Text>게시글2</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            router.push(`/@kmg/post/3`);
                        }}
                    >
                        <Text>게시글3</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: "row",
    },
    tab: { flex: 1 },
    header: { alignItems: "center" },
    headerLogo: {
        width: 42,
        height: 42,
    },
    loginButton: {
        position: "absolute",
        right: 10,
        top: 0,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    loginButtonText: {
        color: "white",
    },
});
