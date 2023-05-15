import { Modal, View, Button, Text, Select } from "native-base";
import { createTrainingStyles } from "../../styles";


interface DifficultyModalProps {
  isDifficultyOpen: boolean;
  closeDifficulty: () => void;
  trainingDifficulty: number;
  setTrainingDifficulty: (difficulty: number) => void;
}

export default function DifficultyModal(props: DifficultyModalProps) {
  const { isDifficultyOpen, closeDifficulty, trainingDifficulty, setTrainingDifficulty } = props;

  if (isDifficultyOpen) {
    return (
      <Modal isOpen={isDifficultyOpen} backgroundColor={"#F0F0F0"}>
        <View style={{height:"10%", top:"-5%"}}>
          <Select
            selectedValue={trainingDifficulty.toString()}
            minWidth="200"
            accessibilityLabel="Elige una dificultad"
            placeholder="Elige una dificultad" 
            _selectedItem={{bg: "#FF6060"}}
            variant="underlined"
            placeholderTextColor={"#707070"}
            size={"lg"}
            onValueChange={newDifficulty => setTrainingDifficulty(parseInt(newDifficulty))}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((difficulty) => (
                  <Select.Item key={difficulty.toString()} label={difficulty.toString()} value={difficulty.toString()}/>
                ))
              }
          </Select>
          <Button
            style={createTrainingStyles.difficultyButton}
            onPress={() => closeDifficulty()}
          >
            <Text
              style={{fontFamily: 'Roboto', color: "#FFFFFF", fontStyle: 'normal', fontWeight: '800', fontSize: 16, left: "-140%"}}
            >
              Guardar
            </Text>
          </Button>
        </View>
      </Modal>
    )
  }
  return null;
}