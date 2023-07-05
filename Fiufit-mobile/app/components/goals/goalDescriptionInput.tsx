import { View, TextArea } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  goalDescription: string;
  setGoalDescription: (description: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function GoalDescriptionInput(props: Props) {
  const { goalDescription, setGoalDescription, styles } = props;
  return (
    <View>
      <TextArea
        autoCompleteType="off"
        placeholder="Descripción de la meta"
        width="75%"
        height="200%"
        fontSize={14}
        value={goalDescription}
        style={styles}
        onChangeText={(description) => setGoalDescription(description)}
      />
    </View>
  )
}