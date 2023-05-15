import { Button, Text } from "native-base";
import { createTrainingStyles } from "../../styles";
import { addTraining } from "../../../api";


const handleSave = (trainingTitle: string,
                    trainingDescription: string,
                    trainingDifficulty: number,
                    trainingType: string,
                    navigation: any
                    ) => {
  addTraining({title: trainingTitle,
              description: trainingDescription,
              state: "active",
              difficulty: trainingDifficulty, 
              type: trainingType})
  console.log("Saving training...");
  navigation.navigate("HomeScreen");
}

interface SubmitButtonProps {
  trainingTitle: string;
  trainingDescription: string;
  trainingType: string;
  trainingDifficulty: number;
  navigation: any;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { trainingTitle, trainingDescription, trainingType, trainingDifficulty, navigation } = props;

  return <Button
        onPress={() => handleSave(trainingTitle, trainingDescription, trainingDifficulty, trainingType, navigation)}
        style={createTrainingStyles.button}
        disabled={trainingTitle === "" || trainingDifficulty === 0 || trainingType === ""}
      >
        <Text
          style={{fontFamily: 'Roboto', color: "#FFFFFF", fontStyle: 'normal', fontWeight: '800', fontSize: 16}}
        >
          Crear
        </Text>
      </Button>
}