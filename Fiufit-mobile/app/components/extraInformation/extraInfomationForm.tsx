import { VStack, Input } from "native-base";
import InputForm from "../form/inputForm";


interface Props {
  location: string;
  setLocation: (location: string) => void;
  age: string;
  setAge: (age: string) => void;
  weight: string;
  setWeight: (weight: string) => void;
  height: string;
  setHeight: (height: string) => void;
  interests: string;
  setInterests: (interests: string) => void;
}


// TODO: hacer chequeos de los inputs
export default function ExtraInformationForm(props: Props) {
  const {
    location,
    setLocation,
    age,
    setAge,
    weight,
    setWeight,
    height,
    setHeight,
    interests,
    setInterests
  } = props;

  return (
  <VStack space={6} alignItems="center" top={"10%"}>
    <InputForm value={location} placeholder="Ubicación" setValue={setLocation}/>
    <InputForm value={age} placeholder="Edad" setValue={setAge}/>
    <InputForm value={weight} placeholder="Peso" setValue={setWeight}/>
    <InputForm value={height} placeholder="Altura" setValue={setHeight}/>
    <InputForm value={interests} placeholder="Intereses" setValue={setInterests}/>
  </VStack>
  );
}