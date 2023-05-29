import { NativeBaseProvider, VStack, Heading } from "native-base";
import TrainingForm from "../components/trainingInfo/trainingForm";
import { useState } from "react";
import { createTrainingStyles } from "../styles";
import { LoadableButton } from "../components/commons/buttons";


interface Props {
  navigation: any;
  route: any;
}

export default function EditTrainingScreen(props: Props) {
  const { navigation, route } = props;
  const { trainingData } = route.params;

  const [trainingTitle, setTrainingTitle] = useState(trainingData.title);
  const [trainingDescription, setTrainingDescription] = useState(trainingData.description);
  const [trainingType, setTrainingType] = useState(trainingData.type);
  const [trainingDifficulty, setTrainingDifficulty] = useState(trainingData.difficulty);
  // TODO agregar estos (falta back)
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");

  return <NativeBaseProvider>
    <VStack height="full" style={createTrainingStyles.stack}>
      <Heading style={createTrainingStyles.heading}>Editar entrenamiento</Heading>
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
          console.log("TODO: editar training con el backend")
          navigation.navigate("HomeScreen");
          return;
        }}
        text = "Guardar"
        customStyles = {{alignSelf: "center", top: "5%"}}
      />
    </VStack>
  </NativeBaseProvider>;
}