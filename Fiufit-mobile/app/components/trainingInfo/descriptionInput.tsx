import { View, TextArea } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  trainingDescription: string;
  setTrainingDescription: (description: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function DescriptionInput(props: Props) {
  const { trainingDescription, setTrainingDescription, styles } = props;
  return (
    <View>
      <TextArea
        autoCompleteType="off"
        placeholder="Descripción del entrenamiento"
        width="75%"
        height="200%"
        fontSize={14}
        value={trainingDescription}
        style={styles}
        onChangeText={(description) => setTrainingDescription(description)}
      />
    </View>
  )
}