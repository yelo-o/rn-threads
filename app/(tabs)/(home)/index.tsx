import { usePathname, useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    console.log("pathname >> ", pathname);
    console.log("insets: ", insets);

    const { width, height } = Dimensions.get("window");

    console.log(`화면 너비: ${width}dp, 높이: ${height}dp`);

    return (
        <View>
            <TouchableOpacity
                onPress={() => router.push(`/@layer7654321/post/1`)}
            >
                <Text>게시글1</Text>
            </TouchableOpacity>
        </View>
    );
}
