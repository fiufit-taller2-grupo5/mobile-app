import { Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { share } from "../../../shareUtils";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";

export const ShareButton = (props: { title: string, message: string, styles?: StyleProp<ViewStyle> }) => {
    // this circular red button calls share() function with the given title and message and uses native-base library
    const styles = StyleSheet.flatten(props.styles);
    return <Button
            style={[{
                position: "absolute",
                bottom: 0,
                right: '2%',
                borderRadius: 50,
                backgroundColor: "#ffffff",
                margin: '1%',
            }, styles]}
            onPress={() => share(props.title, props.message)}
        >
            <MaterialIcons name="share" size={30} color="#474E68"/>
        </Button>
}