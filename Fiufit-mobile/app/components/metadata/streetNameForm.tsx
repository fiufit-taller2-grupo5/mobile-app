import { View, Input } from "native-base";


interface Props {
  top: string;
  width: string;
  streetName: string;
  setStreetName: (streetName: string) => void;
}

export default function StreetNameForm(props: Props) {
  const { top, width, streetName, setStreetName } = props;

  return (
    <View>
      <Input
        width={width}
        variant="underlined"
        placeholder="Nombre de la calle"
        placeholderTextColor={"#000000"}
        top={top}
        onChangeText={text => setStreetName(text)}
        value={streetName}
      />
    </View>
  );
}