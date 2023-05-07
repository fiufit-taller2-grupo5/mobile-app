import { VStack, Input, Text } from "native-base";


interface Props {
  top: string;
  height: number;
  setHeight: (height: number) => void;
}

export default function HeightForm(props: Props) {
  const { top, height, setHeight } = props;

  return (
    <VStack>
      <Input
        width="xs"
        variant="underlined"
        accessibilityLabel="Seleccionar altura"
        placeholder="Seleccionar altura"
        placeholderTextColor={"#000000"}
        mt={1}
        top={top}
        keyboardType="numeric"
        value={height.toString()}
        InputRightElement={
          <Text
            color="muted.400"
            fontSize="xs"
            mr={2}
            _light={{
              color: "blueGray.400",
            }}
            _dark={{
              color: "blueGray.50",
            }}
          >
            cm
          </Text>
        }
        onChangeText={text => setHeight(parseInt(text))}
      />
    </VStack>
  );
}