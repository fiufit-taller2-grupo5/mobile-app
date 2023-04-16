import { Input } from "native-base";


interface Props {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export default function InputForm(props: Props) {
  const { placeholder, value, setValue } = props;

  return (
    <Input
      value={value}
      w="80%"
      variant="underlined"
      placeholder={placeholder}
      onChangeText={(value) => setValue(value)}
    />
  );
}
