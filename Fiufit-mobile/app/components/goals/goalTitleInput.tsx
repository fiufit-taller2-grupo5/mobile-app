import { View, Input } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  goalTitle: string;
  setGoalTitle: (title: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function GoalTitleInput(props: Props) {
  const { goalTitle, setGoalTitle, styles } = props;
  return (
    <View>
      <Input
        placeholder="Nombre de la meta"
        width="75%"
        variant="underlined"
        py="3%"
        fontSize={14}
        value={goalTitle}
        style={styles}
        onChangeText={(name) => setGoalTitle(name)}
      />
    </View>
  )
}