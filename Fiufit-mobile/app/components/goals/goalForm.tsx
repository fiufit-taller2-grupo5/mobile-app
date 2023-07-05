import { VStack, Text } from "native-base"
import { createGoalsStyles } from "../../styles"
import GoalTitleInput from "./goalTitleInput";
import GoalDescriptionInput from "./goalDescriptionInput";
import GoalTypeInput from "./goalTypeInput";
import GoalMetricInput from "./goalMetricInput";
import ImageInput from "../trainingInfo/inputImage";

interface Props {
  goalTitle: string;
  setGoalTitle: (title: string) => void;
  goalDescription: string;
  setGoalDescription: (description: string) => void;
  goalType: string;
  setGoalType: (type: string) => void;
  goalMetric: number;
  setGoalMetric: (metric: number) => void;
  image: any;
  setImage: (image: any) => void;
}

export default function GoalForm(props: Props) {
  const {
    goalTitle, setGoalTitle, goalDescription, setGoalDescription,
    goalType, setGoalType, goalMetric, setGoalMetric, image, setImage } = props;

  return (
    <VStack space={1} alignItems={"center"} style={createGoalsStyles.stack}>
      <Text
        style={[createGoalsStyles.text, createGoalsStyles.titleText]}
      >Nombre</Text>
      <GoalTitleInput
        goalTitle={goalTitle}
        setGoalTitle={setGoalTitle}
      />
      <Text
        style={[createGoalsStyles.text, createGoalsStyles.descriptionText]}
      >Descripción</Text>
      <GoalDescriptionInput
        goalDescription={goalDescription}
        setGoalDescription={setGoalDescription} />
      <Text
        style={[createGoalsStyles.text, createGoalsStyles.descriptionText]}
      >Métrica</Text>
      <GoalTypeInput
        goalType={goalType}
        setGoalType={setGoalType} />
      <Text
        style={[createGoalsStyles.text, createGoalsStyles.descriptionText]}
      >Objetivo</Text>
      <GoalMetricInput
        goalMetric={goalMetric}
        setGoalMetric={setGoalMetric}
      />
      <Text
        style={[createGoalsStyles.text, createGoalsStyles.descriptionText]}
      >Imagen</Text>
      <ImageInput image={image} setImage={setImage} />
    </VStack>
  )
}