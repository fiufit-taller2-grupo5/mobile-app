import { View, Select } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  goalMetric: number;
  setGoalMetric: (difficulty: number) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function GoalMetricInput(props: Props) {
  const { goalMetric, setGoalMetric, styles } = props;
  return (
    <View>
      <Select
        selectedValue={goalMetric.toString()}
        minWidth="280"
        accessibilityLabel="Elige una metrica"
        placeholder="Elige una metrica" 
        _selectedItem={{bg: "#FF6060"}}
        variant="underlined"
        placeholderTextColor={"#707070"}
        size={"md"}
        style={styles}
        onValueChange={newMetric => setGoalMetric(parseInt(newMetric))}>
        {[5, 10, 50, 100, 200, 300, 400, 500].map((metric) => (
            <Select.Item key={metric.toString()} label={metric.toString()} value={metric.toString()}/>
            ))
        }
      </Select>
    </View>
  )
}