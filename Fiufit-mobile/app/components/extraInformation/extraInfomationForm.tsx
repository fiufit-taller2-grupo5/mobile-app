import { VStack, Text } from "native-base";
import LocationForm from "../metadata/locationForm";
import BirthDateForm from "../metadata/birthdateForm";
import WeightForm from "../metadata/weightForm";
import HeightForm from "../metadata/heightForm";
import InterestsForm from "../metadata/interestsForm";

interface Props {
  streetName: string;
  setStreetName: (streetName: string) => void;
  streetNumber: number;
  setStreetNumber: (streetNumber: number) => void;
  date: Date;
  setDate: (date: Date) => void;
  weight: number
  setWeight: (weight: number) => void;
  height: number;
  setHeight: (height: number) => void;
  interests: string[];
  setInterests: (interests: string[]) => void;
}

export default function ExtraInformationForm(props: Props) {
  const {
    streetName,
    setStreetName,
    streetNumber,
    setStreetNumber,
    date,
    setDate,
    weight,
    setWeight,
    height,
    setHeight,
    interests,
    setInterests,
  } = props;

  return (
    <VStack space={6} alignItems="center" top={"5%"}>
      <Text style={{ fontSize: 13, top: "2%" }}>Ubicación</Text>
      <LocationForm
        streetName={streetName}
        setStreetName={setStreetName}
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
      />
      <BirthDateForm top={"0%"} date={date} setDate={setDate}/>
      <WeightForm top={"0%"} weight={weight} setWeight={setWeight}/>
      <HeightForm top={"0%"} height={height} setHeight={setHeight}/>
      <InterestsForm top={"0%"} interests={interests} setInterests={setInterests}/>
    </VStack>
  );
}