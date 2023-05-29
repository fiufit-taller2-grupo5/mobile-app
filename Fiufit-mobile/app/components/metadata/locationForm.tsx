import { HStack, Input } from "native-base";
import StreetNameForm from "./streetNameForm";
import StreetNumberForm from "./streetNumberForm";


interface Props {
  streetName: string;
  setStreetName: (streetName: string) => void;
  streetNumber: number;
  setStreetNumber: (streetNumber: number) => void;
  top: string;
  streetNameWidth: string;
  streetNumberWidth: string;
}

export default function LocationForm(props: Props) {
  const { streetName, setStreetName, streetNumber, setStreetNumber, top, streetNameWidth, streetNumberWidth } = props;
  return (
    <HStack space={6} alignItems="center" top={top}>
      <StreetNameForm top={"0%"} width={streetNameWidth} streetName={streetName} setStreetName={setStreetName}/>
      <StreetNumberForm top={"0%"} width={streetNumberWidth} streetNumber={streetNumber} setStreetNumber={setStreetNumber}/>
    </HStack>
  );
}