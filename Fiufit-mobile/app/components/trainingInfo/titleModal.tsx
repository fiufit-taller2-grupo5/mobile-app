import { Modal, View, Text, Button, Input } from "native-base";
import { createTrainingStyles } from "../../styles";


interface TitleModalProps {
  isTitleOpen: boolean;
  closeTitle: () => void;
  trainingTitle: string;
  setTrainingTitle: (name: string) => void;
}

export default function TitleModal(props: TitleModalProps) {
  const { isTitleOpen, closeTitle, trainingTitle, setTrainingTitle } = props;

  if (isTitleOpen) {
    return (
      <Modal isOpen={isTitleOpen} backgroundColor={"#F0F0F0"}>
        <View style={{height:"10%", top:"-5%"}}>
          <Input
            placeholder="Nombre del entrenamiento"
            width="70%"
            variant="underlined"
            py="7%"
            top="0%"
            fontSize={18}
            value={trainingTitle}
            onChangeText={(name) => setTrainingTitle(name)}
          />
          <Button
            style={createTrainingStyles.titleButton}
            onPress={() => closeTitle()}
          >
            <Text
              style={{fontFamily:'Roboto',
                      color: "#FFFFFF",
                      fontStyle: 'normal',
                      fontWeight: '800',
                      fontSize: 16,
                      left: "-140%"
                    }}
            >
              Guardar
            </Text>
          </Button>
        </View>
      </Modal>
    );
  }
  return null;
}