import { HStack, Input } from "native-base";
import StreetNameForm from "./streetNameForm";
import StreetNumberForm from "./streetNumberForm";


interface Props {
  streetName: string;
  setStreetName: (streetName: string) => void;
  streetNumber: number;
  setStreetNumber: (streetNumber: number) => void;
  top: string;
}

export default function LocationForm(props: Props) {
  const { streetName, setStreetName, streetNumber, setStreetNumber, top } = props;
  return (
    <HStack space={6} alignItems="center" top={top}>
      <StreetNameForm top={"0%"} width={"3xs"} streetName={streetName} setStreetName={setStreetName}/>
      <StreetNumberForm top={"0%"} width={"20"} streetNumber={streetNumber} setStreetNumber={setStreetNumber}/>
    </HStack>
  );
}