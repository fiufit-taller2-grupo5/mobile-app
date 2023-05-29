import { VStack, Text } from "native-base"
import { createTrainingStyles } from "../../styles"
import TitleInput from "./titleInput";
import DescriptionInput from "./descriptionInput";
import TypeInput from "./typeInput";
import DifficultyInput from "./difficultyInput";
import LocationForm from "../metadata/locationForm";


interface Props {
  trainingTitle: string;
  setTrainingTitle: (title: string) => void;
  trainingDescription: string;
  setTrainingDescription: (description: string) => void;
  trainingType: string;
  setTrainingType: (type: string) => void;
  trainingDifficulty: number;
  setTrainingDifficulty: (difficulty: number) => void;
  streetName: string;
  setStreetName: (streetName: string) => void;
  streetNumber: number;
  setStreetNumber: (streetNumber: number) => void;
  startTime: string;
  setStartTime: (startTime: string) => void;
  endTime: string;
  setEndTime: (endTime: string) => void;
  image: string;
  setImage: (image: string) => void;
}

export default function TrainingForm(props: Props) {
  const {
    trainingTitle, setTrainingTitle, trainingDescription, setTrainingDescription,
    trainingType, setTrainingType, trainingDifficulty, setTrainingDifficulty,
    streetName, setStreetName, streetNumber, setStreetNumber, startTime, setStartTime,
    endTime, setEndTime, image, setImage } = props;
  return (
    <VStack space={1} alignItems={"center"} style={createTrainingStyles.stack}>
      <Text 
        style={[createTrainingStyles.text, createTrainingStyles.titleText]}
      >Nombre</Text>
      <TitleInput
        trainingTitle={trainingTitle}
        setTrainingTitle={setTrainingTitle}
      />
      <Text
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Descripción</Text>
      <DescriptionInput
        trainingDescription={trainingDescription}
        setTrainingDescription={setTrainingDescription}/>
      <Text 
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Tipo</Text>
      <TypeInput
        trainingType={trainingType}
        setTrainingType={setTrainingType}/>
      <Text 
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Dificultad</Text>
      <DifficultyInput
        trainingDifficulty={trainingDifficulty}
        setTrainingDifficulty={setTrainingDifficulty}
      />
      <Text 
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Ubicación</Text>
      <LocationForm
        streetName={streetName}
        setStreetName={setStreetName}
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
        top="0%"
        streetNameWidth="3xs"
        streetNumberWidth="25"
      />
      <Text 
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Franja horaria</Text>
      <Text>
        TODO: implement
      </Text>
      <Text 
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Imagen</Text>
      <Text>
        TODO: implement
      </Text>
    </VStack>
  )
}