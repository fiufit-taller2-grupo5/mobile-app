import React from "react";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Button } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SearchBar from './searchBar';

const TrainingsInfo = () => {
  const data = [{
    id: "1",
    name: "Cardio Power",
    difficulty: "5",
    description: "Entrenamiento full cardio",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    id: "2",
    name: "Funcional",
    difficulty: "10",
    description: "Combina cardio con pesas",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  }, {
    id: "3",
    name: "Abs",
    difficulty: "3",
    description: "Entrenamiento full abdominales",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  }, {
    id: "4",
    name: "Superior",
    difficulty: "8",
    description: "Brazos con mucho peso",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  }, {
    id: "5",
    name: "Yoga",
    difficulty: "4",
    description: "Chill para arrancar la semana",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }, {
    id: "6",
    name: "Inferior",
    difficulty: "9",
    description: "Rutina de piernas",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }];
  
  return <Box>
    <SearchBar />
    <FlatList data={data} renderItem={({item}) => 
    <Box borderBottomWidth="10" borderColor="#fff" px="6" py="10" borderRadius="30px" backgroundColor="#f6685e">
            <HStack space={[5, 3]} justifyContent="space-between">
              <MaterialCommunityIcons name='dumbbell' color="#ffffff" size={26} alignSelf="center"/>
              <VStack>
                <Text fontSize="md" color="#000000" bold>
                  {item.name}
                </Text>
                <Text color="#000000">
                  {item.description}
                </Text>
                <Text fontSize="sm" color="#000000">
                Difficulty: {item.difficulty}
                </Text>
              </VStack>
              <Spacer />
              <Button backgroundColor="#ffffff" size={10} borderRadius="10px" alignSelf="center"
              onPress={async () => { alert("Training info")}}>
                <AntDesign name="arrowright" size={20} color="#000000" />
              </Button>
            </HStack>
          </Box>
        } keyExtractor={item => item.id} />
    </Box>;
};

export default function TrainingsList() {
  return (
    <NativeBaseProvider>
      <TrainingsInfo />
    </NativeBaseProvider>
  );
};