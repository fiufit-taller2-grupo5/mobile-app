import { NativeBaseProvider, VStack, Heading } from "native-base";
import TrainingForm from "../components/trainingInfo/trainingForm";
import { useState } from "react";
import { createTrainingStyles } from "../styles";
import { LoadableButton } from "../components/commons/buttons";
import globalUser from "../../userStorage";
import { API } from "../../api";


interface Props {
  navigation: any;
  route: any;
}

export default function EditTrainingScreen(props: Props) {
  const { navigation, route } = props;
  const { trainingData } = route.params;

  const address = trainingData.location.split(" ");
  const weekDaysList = trainingData.days.split(",");
  const [trainingTitle, setTrainingTitle] = useState(trainingData.title);
  const [trainingDescription, setTrainingDescription] = useState(trainingData.description);
  const [trainingType, setTrainingType] = useState(trainingData.type);
  const [trainingDifficulty, setTrainingDifficulty] = useState(trainingData.difficulty);
  const [streetName, setStreetName] = useState(address[0]);
  const [streetNumber, setStreetNumber] = useState(parseInt(address[1]));
  const [weekDays, setWeekDays] = useState(weekDaysList);
  const [startTime, setStartTime] = useState(trainingData.start);
  const [endTime, setEndTime] = useState(trainingData.end);
    // TODO agregar estos (falta back) y usar trainingData.image
  const [image, setImage] = useState("");

  const api = new API(navigation);

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
        weekDays={weekDays}
        setWeekDays={setWeekDays}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        image={image}
        setImage={setImage}
      />

      <LoadableButton
        onPress={async () => {
          await api.updateTraining({
            title: trainingTitle,
            description: trainingDescription,
            state: "active",
            difficulty: trainingDifficulty,
            type: trainingType,
            location: streetName + " " + streetNumber.toString(10),
            start: startTime,
            end: endTime,
            days: weekDays.toString(),
            trainerId: globalUser.user?.id || 0
          }, trainingData.id);
          navigation.navigate("HomeScreen");
          return;
        }}
        text = "Guardar"
        customStyles = {{alignSelf: "center", top: "2%"}}
      />
    </VStack>
  </NativeBaseProvider>;
}