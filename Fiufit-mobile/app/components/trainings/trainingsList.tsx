import React from "react";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Button } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SearchBar from './searchBar';

interface Props {
  navigation: any;
};

const TrainingsInfo = (props: Props) => {
  const { navigation } = props;
  //aca se tiene que hacer un get a la lista de trainings y data seria data={responseData}
  const data = [{
    id: "1",
    name: "Cardio Power",
    difficulty: "5",
    description: "Entrenamiento full cardio",
    type: "Running"
  }, {
    id: "2",
    name: "Crossfit",
    difficulty: "10",
    description: "Combina cardio con pesas",
    type: "Crossfit"
  }, {
    id: "3",
    name: "Abs",
    difficulty: "3",
    description: "Entrenamiento full abdominales",
    type: "Calisthenics"
  }, {
    id: "4",
    name: "Pilates",
    difficulty: "8",
    description: "Para mejorar la postura",
    type: "Pilates"
  }, {
    id: "5",
    name: "Yoga",
    difficulty: "4",
    description: "Chill para arrancar la semana",
    type: "Yoga"
  }, {
    id: "6",
    name: "Bicicleteada",
    difficulty: "9",
    description: "10 km en bici",
    type: "Cycling"
  }];
  
  return <Box>
    <SearchBar />
    <FlatList data={data} marginBottom="15%" renderItem={({item}) => 
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
                Dificultad: {item.difficulty}
                </Text>
              </VStack>
              <Spacer />
              <Button backgroundColor="#ffffff" size={10} borderRadius="10px" alignSelf="center"
              onPress={async () => { navigation.navigate('TrainingInfoScreen', { trainingData: item });}}>
                <AntDesign name="arrowright" size={20} color="#000000" />
              </Button>
            </HStack>
          </Box>
        } keyExtractor={item => item.id} />
    </Box>;
};

export default function TrainingsList(props: Props) {
  const { navigation } = props;
  return (
    <NativeBaseProvider>
      <TrainingsInfo navigation={navigation}/>
    </NativeBaseProvider>
  );
};