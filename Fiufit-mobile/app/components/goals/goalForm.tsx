/*import { VStack, Text, HStack } from "native-base"
import { createTrainingStyles } from "../../styles"
import TitleInput from "../titleInput";
import DescriptionInput from ".descriptionInput";
import TypeInput from "./typeInput";
import DifficultyInput from "./metricInput";
import ImageInput from "../inputImage";
*/
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
  /*const {
    goalTitle, setGoalTitle, goalDescription, setGoalDescription,
    goalType, setGoalType, goalMetric, setGoalMetric, image, setImage } = props;

  return (
    <VStack space={1} alignItems={"center"} style={createTrainingStyles.stack}>
      <Text
        style={[createTrainingStyles.text, createTrainingStyles.titleText]}
      >Nombre</Text>
      <TitleInput
        goalTitle={goalTitle}
        setGoalTitle={setGoalTitle}
      />
      <Text
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Descripción</Text>
      <DescriptionInput
        goalDescription={goalDescription}
        setGoalDescription={setGoalDescription} />
      <Text
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Tipo</Text>
      <TypeInput
        goalType={goalType}
        setGoalType={setGoalType} />
      <Text
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Metrica</Text>
      <DifficultyInput
        goalMetric={goalMetric}
        setGoalMetric={setGoalMetric}
      />
      <Text
        style={[createTrainingStyles.text, createTrainingStyles.descriptionText]}
      >Imagen</Text>
      <ImageInput image={image} setImage={setImage} />
    </VStack>
  )*/
}