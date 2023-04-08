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
      w={{base: "80%", md: "30%"}} 
      h="12%" 
      variant="underlined" 
      placeholder={placeholder} 
      onChangeText={(value) => setValue(value)}
    />
  );
}
