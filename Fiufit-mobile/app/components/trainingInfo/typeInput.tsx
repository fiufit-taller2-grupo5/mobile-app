import { View, Select } from "native-base";
import { StyleProp, ViewStyle } from "react-native";


interface Props {
  trainingType: string;
  setTrainingType: (type: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export default function TypeInput(props: Props) {
  const { trainingType, setTrainingType, styles } = props;
  return (
    <View>
      <Select
        selectedValue={trainingType}
        minWidth="280"
        accessibilityLabel="Elige un tipo"
        placeholder="Elige un tipo" 
        _selectedItem={{bg: "#FF6060"}}
        colorScheme={"red"}
        variant="underlined"
        placeholderTextColor={"#707070"}
        size={"md"}
        style={styles}
        onValueChange={newType => setTrainingType(newType)}>
        <Select.Item label="Running" value="Running"/>
        <Select.Item label="Swimming" value="Swimming"/>
        <Select.Item label="Biking" value="Biking"/>
        <Select.Item label="Yoga" value="Yoga"/>
        <Select.Item label="Basketball" value="Basketball"/>
        <Select.Item label="Football" value="Football"/>
        <Select.Item label="Walking" value="Walking"/>
        <Select.Item label="Gymnastics" value="Gymnastics"/>
        <Select.Item label="Dancing" value="Dancing"/>
        <Select.Item label="Hiking" value="Hiking"/>
      </Select>
    </View>
  )
}
