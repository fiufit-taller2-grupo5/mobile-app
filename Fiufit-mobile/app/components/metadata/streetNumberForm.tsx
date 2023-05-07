import { View, Input } from "native-base";


interface Props {
  top: string;
  width: string;
  streetNumber: number;
  setStreetNumber: (streetName: number) => void;
}

export default function StreetNumberForm(props: Props) {
  const { top, width, streetNumber, setStreetNumber } = props;

  return (
    <View>
      <Input
        width={width}
        variant="underlined"
        placeholder="Número de la calle"
        placeholderTextColor={"#000000"}
        top={top}
        onChangeText={text => setStreetNumber(parseInt(text))}
        value={streetNumber.toString()}
      />
    </View>
  );
}