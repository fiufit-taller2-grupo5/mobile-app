import { View, Input } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  trainingTitle: string;
  setTrainingTitle: (title: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function TitleInput(props: Props) {
  const { trainingTitle, setTrainingTitle, styles } = props;
  return (
    <View>
      <Input
        placeholder="Nombre del entrenamiento"
        width="75%"
        variant="underlined"
        py="3%"
        fontSize={14}
        value={trainingTitle}
        style={styles}
        onChangeText={(name) => setTrainingTitle(name)}
      />
    </View>
  )
}