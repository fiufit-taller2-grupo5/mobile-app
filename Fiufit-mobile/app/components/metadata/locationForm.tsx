import { HStack, Input } from "native-base";
import StreetNameForm from "./streetNameForm";
import StreetNumberForm from "./streetNumberForm";


interface Props {
  streetName: string;
  setStreetName: (streetName: string) => void;
  streetNumber: number;
  setStreetNumber: (streetNumber: number) => void;
}

export default function LocationForm(props: Props) {
  const { streetName, setStreetName, streetNumber, setStreetNumber } = props;
  return (
    <HStack space={6} alignItems="center" top="60%">
      <StreetNameForm top={"0%"} width={"3xs"} streetName={streetName} setStreetName={setStreetName}/>
      <StreetNumberForm top={"0%"} width={"20"} streetNumber={streetNumber} setStreetNumber={setStreetNumber}/>
    </HStack>
  );
}