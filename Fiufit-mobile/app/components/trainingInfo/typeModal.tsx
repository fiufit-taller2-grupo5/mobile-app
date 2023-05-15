import { Modal, View, Button, Text, Select } from "native-base";
import { createTrainingStyles } from "../../styles";


interface TypeModalProps {
  isTypeOpen: boolean;
  closeType: () => void;
  trainingType: string;
  setTrainingType: (type: string) => void;
  }

export default function TypeModal(props: TypeModalProps) {
  const { isTypeOpen, closeType, trainingType, setTrainingType } = props;

  if (isTypeOpen) {
    return (
      <Modal isOpen={isTypeOpen} backgroundColor={"#F0F0F0"}>
        <View style={{height:"10%", top:"-5%"}}>
          <Select
            selectedValue={trainingType}
            minWidth="200"
            accessibilityLabel="Elige un tipo"
            placeholder="Elige un tipo" 
            _selectedItem={{bg: "#FF6060"}}
            variant="underlined"
            placeholderTextColor={"#707070"}
            size={"lg"}
            onValueChange={newType => setTrainingType(newType)}>
              <Select.Item label="Running" value="Running"/>
              <Select.Item label="Swimming" value="Swimming"/>
              <Select.Item label="Biking" value="Biking"/>
              <Select.Item label="Yoga" value="Yoga"/>
              <Select.Item label="Basketball" value="Basketball"/>
              <Select.Item label="Football" value="Football"/>
              <Select.Item label="Walking" value="Walking"/>
              <Select.Item label="Gymnastics" value="Gymnastics"/>
              <Select.Item label="Dancing" value="Dancing"/>
              <Select.Item label="Hiking" value="Hiking"/>
          </Select>
          <Button
            style={createTrainingStyles.typeButton}
            onPress={() => closeType()}
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