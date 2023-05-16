import { View, Input } from "native-base";


interface Props {
  top: string;
  width: string;
  streetNumber: number;
  setStreetNumber: (streetName: number) => void;
}

export default function StreetNumberForm(props: Props) {
  const { top, width, streetNumber, setStreetNumber } = props;

  const onChange = (text: string) => {
    if (text !== undefined && text !== null && parseInt(text) !== NaN && parseInt(text) >= 0) {
      setStreetNumber(parseInt(text));
    } else {
      setStreetNumber(0);
    }
  }

  return (
    <View>
      <Input
        width={width}
        variant="underlined"
        placeholder="Número de la calle"
        placeholderTextColor={"#000000"}
        top={top}
        onChangeText={onChange}
        value={streetNumber.toString()}
      />
    </View>
  );
}