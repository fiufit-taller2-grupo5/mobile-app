import { View, Select } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  trainingDifficulty: number;
  setTrainingDifficulty: (difficulty: number) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function DifficultyInput(props: Props) {
  const { trainingDifficulty, setTrainingDifficulty, styles } = props;
  return (
    <View>
      <Select
        selectedValue={trainingDifficulty.toString()}
        minWidth="280"
        accessibilityLabel="Elige una dificultad"
        placeholder="Elige una dificultad" 
        _selectedItem={{bg: "#FF6060"}}
        variant="underlined"
        placeholderTextColor={"#707070"}
        size={"md"}
        style={styles}
        onValueChange={newDifficulty => setTrainingDifficulty(parseInt(newDifficulty))}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((difficulty) => (
            <Select.Item key={difficulty.toString()} label={difficulty.toString()} value={difficulty.toString()}/>
            ))
        }
      </Select>
    </View>
  )
}