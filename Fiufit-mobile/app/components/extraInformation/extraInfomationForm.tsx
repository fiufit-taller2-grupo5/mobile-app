import { VStack, Text } from "native-base";
import BirthDateForm from "../metadata/birthdateForm";
import WeightForm from "../metadata/weightForm";
import HeightForm from "../metadata/heightForm";
import InterestsForm from "../metadata/interestsForm";
import ImageInput from "../trainingInfo/inputImage";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  weight: number
  setWeight: (weight: number) => void;
  height: number;
  setHeight: (height: number) => void;
  interests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
  image: any;
  setImage: (image: any) => void;
}

export default function ExtraInformationForm(props: Props) {
  const {
    date,
    setDate,
    weight,
    setWeight,
    height,
    setHeight,
    interests,
    setInterests,
    image,
    setImage
  } = props;

  return (
    <VStack space={6} alignItems="center">
      <BirthDateForm top={"15%"} date={date} setDate={setDate} />
      <WeightForm top={"0%"} weight={weight} setWeight={setWeight} />
      <HeightForm top={"5%"} height={height} setHeight={setHeight} />
      <InterestsForm top={"10%"} interests={interests} setInterests={setInterests} navigation />
      <ImageInput image={image} setImage={setImage} customStyles={{top: "20%", backgroundColor: "#ffffff"}}/>
    </VStack>
  );
}