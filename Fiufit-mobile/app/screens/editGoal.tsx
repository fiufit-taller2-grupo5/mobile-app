import { NativeBaseProvider, VStack, Heading } from "native-base";
import { useState } from "react";
import { createGoalsStyles } from "../styles";
import { LoadableButton } from "../components/commons/buttons";
import globalUser from "../../userStorage";
import { API } from "../../api";
import GoalForm from "../components/goals/goalForm";

interface Props {
  navigation: any;
  route: any;
}

export default function EditGoalScreen(props: Props) {
  const { navigation, route } = props;
  const { goalData } = route.params;

  const [goalTitle, setGoalTitle] = useState(goalData.title);
  const [goalDescription, setGoalDescription] = useState(goalData.description);
  const [goalType, setGoalType] = useState(goalData.type);
  const [goalMetric, setGoalMetric] = useState(goalData.metric);
  const [image, setImage] = useState(null);

  const api = new API(navigation);

  return <NativeBaseProvider>
    <VStack height="full" style={createGoalsStyles.stack}>
      <Heading style={createGoalsStyles.heading}>Editar entrenamiento</Heading>
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
          await api.updateGoal({
            title: goalTitle,
            description: goalDescription,
            type: goalType,
            metric: goalMetric,
            athleteId: globalUser.user?.id || 0
          }, goalData.id);
          if (image) {
            await api.addImageGoal(goalData.id, image);
          }
          navigation.navigate("HomeScreen");
          return;
        }}
        text = "Guardar"
        customStyles = {{alignSelf: "center", top: "2%"}}
      />
    </VStack>
  </NativeBaseProvider>;
}