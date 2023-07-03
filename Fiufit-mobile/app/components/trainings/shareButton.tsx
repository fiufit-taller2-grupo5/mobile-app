import { Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { share } from "../../../shareUtils";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { View } from "native-base";
import { LoadableButton } from "../commons/buttons";

export const ShareButton = (props: { title: string, message: string, styles?: StyleProp<ViewStyle> }) => {
    // this circular red button calls share() function with the given title and message and uses native-base library
    const styles = StyleSheet.flatten(props.styles);
    return <LoadableButton
        customStyles={{
            borderRadius: 50,
            backgroundColor: "#ffffff",
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
            paddingBottom: -2,
        }}
        text={
            <View >
                <MaterialIcons name="share" size={30} color="#ff6060" />
            </View>
        }
        hideTextWhileLoading

        onPress={() => share(props.title, props.message)}
    />
}