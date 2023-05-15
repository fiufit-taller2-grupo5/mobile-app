import { Modal, VStack, TextArea, Button, Text } from "native-base";
import { createTrainingStyles } from "../../styles";


interface DescriptionModalProps {
  isDescriptionOpen: boolean;
  closeDescription: () => void;
  trainingDescription: string;
  setTrainingDescription: (description: string) => void;
}

export default function DescriptionModal(props: DescriptionModalProps) {
  const { isDescriptionOpen, closeDescription, trainingDescription, setTrainingDescription } = props;

  if (isDescriptionOpen) {
    return (
      <Modal style={{height:"100%"}} isOpen={isDescriptionOpen} backgroundColor={"#F0F0F0"}>
        <VStack space={16} height="full" style={{top:"40%"}}>
          <TextArea
            autoCompleteType="off"
            placeholder="Descripción del entrenamiento"
            width="70%"
            height="200%"
            fontSize={18}
            value={trainingDescription}
            onChangeText={(description) => setTrainingDescription(description)}
          />
          <Button
            style={createTrainingStyles.descriptionButton}
            onPress={() => closeDescription()}
          >
            <Text
              style={{fontFamily: 'Roboto', color: "#FFFFFF", fontStyle: 'normal', fontWeight: '800', fontSize: 16, left: "-140%"}}
            >
              Guardar
            </Text>
          </Button>
        </VStack>
      </Modal>
    )
  }
  return null;
}