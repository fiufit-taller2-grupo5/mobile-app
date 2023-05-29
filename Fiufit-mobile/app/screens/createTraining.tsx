import { VStack, Heading, NativeBaseProvider } from "native-base";
import { createTrainingStyles } from "../styles";
import { useState } from "react";
import TrainingForm from "../components/trainingInfo/trainingForm";
import { addTraining } from "../../api";
import { LoadableButton } from "../components/commons/buttons";


export type Training = {
  name: string,
  description: string,
  type: string,
  difficulty: number,
}

export default function CreateTrainingScreen({ navigation }: any) {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingDescription, setTrainingDescription] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [trainingDifficulty, setTrainingDifficulty] = useState(0);
  // TODO: agregar estos al button
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");

  return <NativeBaseProvider>
    <VStack height="full" style={createTrainingStyles.stack}>
      <Heading style={createTrainingStyles.heading}>Nuevo entrenamiento</Heading>
      <TrainingForm
        trainingTitle={trainingTitle}
        setTrainingTitle={setTrainingTitle}
        trainingDescription={trainingDescription}
        setTrainingDescription={setTrainingDescription}
        trainingType={trainingType}
        setTrainingType={setTrainingType}
        trainingDifficulty={trainingDifficulty}
        setTrainingDifficulty={setTrainingDifficulty}
        streetName={streetName}
        setStreetName={setStreetName}
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        image={image}
        setImage={setImage}
      />

      <LoadableButton
        onPress={async () => {
          addTraining({title: trainingTitle,
            description: trainingDescription,
            state: "active",
            difficulty: trainingDifficulty, 
            type: trainingType});
          navigation.navigate("HomeScreen");
          return;
        }}
        text = "Crear"
        customStyles = {{alignSelf: "center", top: "5%"}}
      />
    </VStack>
  </NativeBaseProvider>;
}