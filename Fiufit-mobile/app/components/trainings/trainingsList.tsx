import React from "react";
import { Image, Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Button, Divider } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SearchBar from './searchBar';
import { trainingStyles } from "../../styles"

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
  
  return <Box backgroundColor="#fff" >
    <SearchBar />
    <FlatList data={data} marginBottom={10} marginTop={2} renderItem={({item}) => 
    <Button height={150} px="10" py="10" backgroundColor="#fff" onPress={async () => { navigation.navigate('TrainingInfoScreen', { trainingData: item });}}>
            <HStack space={[2, 3]} justifyContent="space-between" height={70} width={380}>
            <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg"}} alt="Alternate Text" size="lg" borderRadius={10}/>
              <VStack my={1} width={220} height={10} mr={0} ml={1}>
                <Text style={trainingStyles.textTitle} color="#00000" text-align="left" bold>
                  {item.name}
                </Text>
                <Text color="#000000">
                  {item.description}
                </Text>
                <Text fontSize="sm" color="#000000">
                Dificultad: {item.difficulty}
                </Text>
              </VStack>
              <AntDesign name="arrowright" size={20} color="#000000" alignSelf="center"/>
            </HStack>
            <Divider my={10} mx={1} />
          </Button>
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
