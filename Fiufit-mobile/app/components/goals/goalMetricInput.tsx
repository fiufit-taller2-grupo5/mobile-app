import { View, Select, Input } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  goalMetric: number;
  setGoalMetric: (difficulty: number) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function GoalMetricInput(props: Props) {
  const { goalMetric, setGoalMetric, styles } = props;

  const onChange = (text: string) => {
    if (text !== undefined && text !== null && parseInt(text) !== NaN && parseInt(text) >= 0) {
      setGoalMetric(parseInt(text));
    } else {
      setGoalMetric(0);
    }
  }

  return (
    <View>
      <Input
        width={300}
        variant="underlined"
        placeholder="Objetivo"
        placeholderTextColor={"#000000"}
        onChangeText={onChange}
        value={goalMetric.toString()}
      />
    </View>
  )
}
