import { VStack, Heading, Text, NativeBaseProvider, Input, TextArea, HStack, Select, Button, View, Modal, Icon } from "native-base";
import { createTrainingStyles } from "../styles";
import { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';


const useTitleModal = () => {
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const closeTitle = () => setIsTitleOpen(false);
  const openTitle = () => setIsTitleOpen(true);
  return { isTitleOpen, openTitle, closeTitle};
};

const useDescriptionModal = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const closeDescription = () => setIsDescriptionOpen(false);
  const openDescription = () => setIsDescriptionOpen(true);
  return { isDescriptionOpen, openDescription, closeDescription};
};

const useTypeModal = () => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const closeType = () => setIsTypeOpen(false);
  const openType = () => setIsTypeOpen(true);
  return { isTypeOpen, openType, closeType};
};

const useDifficultyModal = () => {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const closeDifficulty = () => setIsDifficultyOpen(false);
  const openDifficulty = () => setIsDifficultyOpen(true);
  return { isDifficultyOpen, openDifficulty, closeDifficulty};
};

const useDistanceModal = () => {
  const [isDistanceOpen, setIsDistanceOpen] = useState(false);
  const closeDistance = () => setIsDistanceOpen(false);
  const openDistance = () => setIsDistanceOpen(true);
  return { isDistanceOpen, openDistance, closeDistance};
};

export default function CreateTrainingScreen({ navigation }: any) {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingDescription, setTrainingDescription] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [trainingDifficulty, setTrainingDifficulty] = useState(0);
  const [trainingDistance, setTrainingDistance] = useState(0);

  const { isTitleOpen, openTitle, closeTitle } = useTitleModal();
  const { isDescriptionOpen, openDescription, closeDescription } = useDescriptionModal();
  const { isTypeOpen, openType, closeType } = useTypeModal();
  const { isDifficultyOpen, openDifficulty, closeDifficulty } = useDifficultyModal();
  const { isDistanceOpen, openDistance, closeDistance } = useDistanceModal();

  const handleSave = () => {
    // TODO: pasarle la info al back
    console.log("save training and send to backend");
    navigation.navigate("Home");
  }

  return <NativeBaseProvider>
    <VStack style={createTrainingStyles.stack}>
      <Heading style={createTrainingStyles.heading}>Crear nuevo entenamiento</Heading>
      <Text style={createTrainingStyles.text}>Detalles:</Text>
      <Button
        style={createTrainingStyles.buttonForm}
        top="45%" onPress={() => openTitle()}
      >
        <HStack>
          <Icon as={MaterialIcons} size={6} name='drive-file-rename-outline' color="#707070" style={{ left: "-420%" }}/>
          <Text color="#000000" left="-380%">
            Nombre
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "410%" }}/>  
        </HStack>
      </Button>
      <Button
        style={createTrainingStyles.buttonForm}
        top="50%" onPress={() => openDescription()}
      >
        <HStack>
          <Icon as={MaterialIcons} size={6} name='description' color="#707070" style={{ left: "-360%" }}/>
          <Text color="#000000" left="-340%">
            Descripción
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "360%" }}/>  
        </HStack>
      </Button>
      <Button
        style={createTrainingStyles.buttonForm}
        top="55%" onPress={() => openType()}
      >
        <HStack>
          <Icon as={MaterialCommunityIcons} size={6} name='dumbbell' color="#707070" style={{ left: "-450%" }}/>
          <Text color="#000000" left="-400%">
            Tipo
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "450%" }}/>  
        </HStack>
      </Button>
      <Button
        style={createTrainingStyles.buttonForm}
        top="60%" onPress={() => openDifficulty()}
      >
        <HStack>
          <Icon as={Feather} size={6} name='activity' color="#707070" style={{ left: "-390%" }}/>
          <Text color="#000000" left="-340%">
            Dificultad
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "390%" }}/>  
        </HStack>
      </Button>
      <Button
        style={createTrainingStyles.buttonForm}
        top="65%" onPress={() => openDistance()}
      >
        <HStack>
          <Icon as={Entypo} size={6} name='gauge' color="#707070" style={{ left: "-390%" }}/>
          <Text color="#000000" left="-340%">
            Distancia
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "390%" }}/>  
        </HStack>
      </Button>


      {isTitleOpen && (
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
                style={{fontFamily: 'Roboto', color: "#FFFFFF", fontStyle: 'normal', fontWeight: '800', fontSize: 16, left: "-140%"}}
              >
                Guardar
              </Text>
            </Button>
          </View>
        </Modal>
      )}

      {isDescriptionOpen && (
        <Modal isOpen={isDescriptionOpen} backgroundColor={"#F0F0F0"}>
          <View style={{height:"100%", top:"-5%"}}>
            <TextArea
              autoCompleteType="off"
              placeholder="Descripción del entrenamiento"
              width="70%"
              height="100%"
              top="100%"
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
          </View>
        </Modal>
      )}

      {isTypeOpen && (
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
      )}

      {isDifficultyOpen && (
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
                    <Select.Item label={difficulty.toString()} value={difficulty.toString()}/>
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
      )}

      {isDistanceOpen && (
        <Modal isOpen={isDistanceOpen} backgroundColor={"#F0F0F0"}>
          <View style={{height:"10%", top:"-5%"}}>
            <Input
              width="70%"
              variant="underlined"
              accessibilityLabel="Seleccionar distancia"
              placeholder="Seleccionar distancia"
              placeholderTextColor={"#000000"}
              mt={1}
              keyboardType="numeric"
              size={"lg"}
              value={trainingDistance.toString()}
              InputRightElement={
                <Text
                  color="#000000"
                  fontSize="md"
                  mr={2}
                >
                  km
                </Text>
              }
              onChangeText={text => setTrainingDistance(parseInt(text))}
            />
            <Button
              style={createTrainingStyles.distanceButton}
              onPress={() => closeDistance()}
            >
              <Text
                style={{fontFamily: 'Roboto', color: "#FFFFFF", fontStyle: 'normal', fontWeight: '800', fontSize: 16, left: "-140%"}}
              >
                Guardar
              </Text>
            </Button>
          </View>
        </Modal>
      )}


      <Button
        onPress={handleSave}
        style={createTrainingStyles.button}
        disabled={trainingTitle === "" && trainingDistance === 0 && trainingDifficulty === 0 && trainingType === ""}
      >
        <Text
          style={{fontFamily: 'Roboto', color: "#FFFFFF", fontStyle: 'normal', fontWeight: '800', fontSize: 16}}
        >
          Crear
        </Text>
      </Button>
    </VStack>
  </NativeBaseProvider>;
}