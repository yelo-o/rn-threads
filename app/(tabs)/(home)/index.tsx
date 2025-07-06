import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View>
                <TouchableOpacity
                    onPress={() => {
                        router.push(`/`);
                    }}
                >
                    <Text>For you</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        router.push(`/following`);
                    }}
                >
                    <Text>Following</Text>
                </TouchableOpacity>
            </View>
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
    );
}
