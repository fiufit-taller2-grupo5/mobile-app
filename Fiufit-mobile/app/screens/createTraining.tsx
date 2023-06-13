import { VStack, Heading, NativeBaseProvider } from "native-base";
import { createTrainingStyles } from "../styles";
import { useState } from "react";
import TrainingForm from "../components/trainingInfo/trainingForm";
import { API } from "../../api";
import { LoadableButton } from "../components/commons/buttons";
import globalUser from "../../userStorage";


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
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // TODO: agregar este al button
  const [image, setImage] = useState(null);

  const api = new API(navigation);

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
          console.log("start time", startTime);
          console.log("end time", endTime);
          console.log("week days", weekDays);
          console.log("street name", streetName);
          console.log("street number", streetNumber);
          console.log("training title", trainingTitle);
          console.log("training description", trainingDescription);
          console.log("training type", trainingType);
          console.log("training difficulty", trainingDifficulty);
          console.log("image", image);
          console.log("trainer id", globalUser.user?.id);


          await api.addTraining({
            title: trainingTitle,
            description: trainingDescription,
            state: "active",
            difficulty: trainingDifficulty,
            type: trainingType,
            location: streetName + " " + streetNumber.toString(10),
            start: startTime,
            end: endTime,
            days: weekDays.join(", "),
            trainerId: globalUser.user?.id || 0
          });
          navigation.navigate("HomeScreen");
          return;
        }}
        text="Crear"
        customStyles={{ alignSelf: "center", top: "2%" }}
      />
    </VStack>
  </NativeBaseProvider>;
}