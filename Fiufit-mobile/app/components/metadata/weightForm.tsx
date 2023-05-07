import { VStack, Text, Input } from "native-base";



interface Props {
  top: string;
  weight: number
  setWeight: (weight: number) => void;
}

export default function WeightForm(props: Props) {
  const { top, weight, setWeight } = props;

  return (
    <VStack>
      <Input
        width="xs"
        variant="underlined"
        accessibilityLabel="Seleccionar peso"
        placeholder="Seleccionar peso"
        placeholderTextColor={"#000000"}
        mt={1}
        top={top}
        keyboardType="numeric"
        value={weight.toString()}
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
            kgs
          </Text>
        }
        onChangeText={text => setWeight(parseInt(text))}
      />
    </VStack>
  );
}