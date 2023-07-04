import { VStack, Heading, NativeBaseProvider } from "native-base";
import { createGoalsStyles } from "../styles";
import { useState } from "react";
import GoalForm from "../components/goals/goalForm";
import { API } from "../../api";
import { LoadableButton } from "../components/commons/buttons";
import globalUser from "../../userStorage";

export type Goal = {
  title: string,
  description: string,
  type: string,
  metric: number,
}

export default function CreateGoalScreen({ navigation }: any) {
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalType, setGoalType] = useState("");
  const [goalMetric, setGoalMetric] = useState(0);
  const [image, setImage] = useState(null);

  const api = new API(navigation);

  return <NativeBaseProvider>
    <VStack height="full" style={createGoalsStyles.stack}>
      <Heading style={createGoalsStyles.heading}>Nueva meta</Heading>
      <GoalForm
        goalTitle={goalTitle}
        setGoalTitle={setGoalTitle}
        goalDescription={goalDescription}
        setGoalDescription={setGoalDescription}
        goalType={goalType}
        setGoalType={setGoalType}
        goalMetric={goalMetric}
        setGoalMetric={setGoalMetric}
        image={image}
        setImage={setImage}
      />
      <LoadableButton
        onPress={async () => {
          const goalId = await api.addGoal({
            title: goalTitle,
            description: goalDescription,
            metric: goalMetric,
            type: goalType,
            athleteId: globalUser.user?.id || 0
          });
          if (image) {
            await api.addImageGoal(goalId, image);
          }
          navigation.navigate("HomeScreen");
          return;
        }}
        text="Crear"
        customStyles={{ alignSelf: "center", top: "2%" }}
      />
    </VStack>
  </NativeBaseProvider>;
}