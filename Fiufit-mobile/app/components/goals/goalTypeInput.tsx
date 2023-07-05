import { View, Select } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  goalType: string;
  setGoalType: (type: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function GoalTypeInput(props: Props) {
  const { goalType, setGoalType, styles } = props;
  return (
    <View>
      <Select
        selectedValue={goalType}
        minWidth="280"
        accessibilityLabel="Elige una métrica"
        placeholder="Elige un tipo de métrica"
        _selectedItem={{ bg: "#FF6060" }}
        colorScheme={"red"}
        variant="underlined"
        placeholderTextColor={"#707070"}
        size={"md"}
        style={styles}
        onValueChange={newType => setGoalType(newType)}>
        <Select.Item label="Pasos" value="Pasos" />
        <Select.Item label="Distancia" value="Distancia" />
        <Select.Item label="Calorias" value="Calorias" />
      </Select>
    </View>
  )
}