import { VStack, Heading, Text, NativeBaseProvider, Input, HStack, Checkbox, Select, Button, View, Modal, Icon } from "native-base";
import { createTrainingStyles } from "../styles";
import { useState } from "react";
import { MaterialCommunityIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';


const useCalendarModal = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const closeCalendar = () => setIsCalendarOpen(false);
  const openCalendar = () => setIsCalendarOpen(true);
  return { isCalendarOpen, openCalendar, closeCalendar};
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
  const [trainingType, setTrainingType] = useState("");
  const [trainingDifficulty, setTrainingDifficulty] = useState("");
  const [trainingDistance, setTrainingDistance] = useState(0);
  const [trainingDays, setTrainingDays] = useState(Array<string>());

  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  let daysSelected = Array<string>();

  const handleDaySelection = (day: string) => {
    if (daysSelected.includes(day)) {
      const index = daysSelected.indexOf(day);
      if (index > -1) {
        daysSelected.splice(index, 1);
      }
      setTrainingDays(daysSelected);
    }
    else {
      daysSelected.push(day);
      setTrainingDays(daysSelected);
    }
  }

  const renderDays = () => {
    return days.map((day, index) => (
      <Checkbox
        accessibilityLabel={day}
        key={index}
        value={day}
        colorScheme="rose"
        onChange={() => {handleDaySelection(day);}}
        style={{ flexDirection: "row-reverse", alignItems: "center",  marginTop:10 }}
      >
        <Text style={{fontSize:20, top:"3%"}}>{day}</Text>
      </Checkbox>
    ));
  };

  const { isCalendarOpen, openCalendar, closeCalendar } = useCalendarModal();
  const { isTypeOpen, openType, closeType } = useTypeModal();
  const { isDifficultyOpen, openDifficulty, closeDifficulty } = useDifficultyModal();
  const { isDistanceOpen, openDistance, closeDistance } = useDistanceModal();

  const handleSave = () => {
    // TODO: pasarle la info al back
    console.log("TODO: save training and send to backend");
  }

  return <NativeBaseProvider>
    <VStack style={createTrainingStyles.stack}>
      <Heading style={createTrainingStyles.heading}>Crear nuevo entenamiento</Heading>
      <Text style={createTrainingStyles.text}>Detalles:</Text>
      <Button
        style={createTrainingStyles.buttonForm}
        top="45%" onPress={() => openType()}
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
        top="50%" onPress={() => openDifficulty()}
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
        top="55%" onPress={() => openDistance()}
      >
        <HStack>
          <Icon as={Entypo} size={6} name='gauge' color="#707070" style={{ left: "-390%" }}/>
          <Text color="#000000" left="-340%">
            Distancia
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "390%" }}/>  
        </HStack>
      </Button>
      <Button
        style={createTrainingStyles.buttonForm}
        top="60%" onPress={() => openCalendar()}
      >
        <HStack>
          <Icon as={Entypo} size={6} name='calendar' color="#707070" style={{ left: "-450%" }}/>
          <Text color="#000000" left="-400%">
            Dias
          </Text>
          <Icon as={AntDesign} name="right" size={6} color="#707070" style={{ left: "450%" }}/>  
        </HStack>
      </Button>

      {isCalendarOpen && (
        <Modal isOpen={isCalendarOpen} backgroundColor={"#F0F0F0"}>
          <View style={{height:"10%", top:"-5%", left: "15%"}}>
            {renderDays()}
            <Button
              style={createTrainingStyles.calendarButton}
              onPress={() => closeCalendar()}
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
                <Select.Item label="Correr" value="Correr"/>
                <Select.Item label="Caminar" value="Caminar"/>
                <Select.Item label="Escalar" value="Escalar"/>
                <Select.Item label="Bicicleta" value="Bicicleta"/>
                <Select.Item label="Nadar" value="Nadar"/>
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
              selectedValue={trainingDifficulty}
              minWidth="200"
              accessibilityLabel="Elige un tipo"
              placeholder="Elige un tipo" 
              _selectedItem={{bg: "#FF6060"}}
              variant="underlined"
              placeholderTextColor={"#707070"}
              size={"lg"}
              onValueChange={newDifficulty => setTrainingDifficulty(newDifficulty)}>
                <Select.Item label="Principiante" value="Principiante"/>
                <Select.Item label="Intermedio" value="Intermedio"/>
                <Select.Item label="Avanzado" value="Avanzado"/>
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
        disabled={trainingDays.length === 0 && trainingDistance === 0 && trainingDifficulty === "" && trainingType === ""}
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