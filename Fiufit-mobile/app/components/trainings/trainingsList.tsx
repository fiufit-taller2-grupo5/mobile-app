import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Button, Divider, Icon, List } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SearchBar from './searchBar';
import { trainingStyles } from "../../styles"
import useSWR from 'swr';
import { getTrainings } from "../../../api";

interface Props {
  navigation: any;
};

const TrainingsInfo = (props: Props) => {
  const { navigation } = props;
  const [selected, setSelected] = React.useState(1);
  //aca se tiene que hacer un get a la lista de trainings y data seria data={responseData}
  /*const data = [{
    id: "1",
    name: "Cardio Power",
    difficulty: "5",
    description: "Entrenamiento full cardio",
    type: "Running",
    favorite: 1
  }, {
    id: "2",
    name: "Crossfit",
    difficulty: "10",
    description: "Combina cardio con pesas",
    type: "Crossfit",
    favorite: 0
  }, {
    id: "3",
    name: "Abs",
    difficulty: "3",
    description: "Entrenamiento full abdominales",
    type: "Calisthenics",
    favorite: 1,
  }, {
    id: "4",
    name: "Pilates",
    difficulty: "8",
    description: "Para mejorar la postura",
    type: "Pilates",
    favorite: 0
  }, {
    id: "5",
    name: "Yoga",
    difficulty: "4",
    description: "Chill para arrancar la semana",
    type: "Yoga",
    favorite: 0
  }, {
    id: "6",
    name: "Bicicleteada",
    difficulty: "9",
    description: "10 km en bici",
    type: "Cycling",
    favorite: 0
  }];*/
  const trainingsResponse  = useSWR("https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings", getTrainings);
  //const data = getTrainings("https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings");

  const [trainingsData, setTrainingsList] = useState<string[]>([]);
  useEffect(() => {
    if(trainingsResponse.data) {
      setTrainingsList(trainingsResponse.data);
    }
  }, [trainingsResponse.data]);
  
  return <Box backgroundColor="#fff" >
    <SearchBar />
    <FlatList data={trainingsData} marginBottom={5} marginTop={2} renderItem={({item}) => 
    <Button height={150} px="10" py="10" backgroundColor="#fff" onPress={async () => { navigation.navigate('TrainingInfoScreen', { trainingData: item });}}>
            <HStack space={[2, 3]} justifyContent="space-between" height={70} width={380}>
            <Image source={{uri: "https://wallpaperaccess.com/thumb/654835.jpg"}} alt="Alternate Text" size="lg" borderRadius={10}/>
              <VStack my={1} width={220} height={10} mr={0} ml={1}>
                <Text style={trainingStyles.textTitle} color="#000000" text-align="left" bold>
                  {item.title}
                </Text>
                <Text fontSize="sm" color="#000000">
                  {item.description}
                </Text>
                <Text fontSize="xs" color="#000000">
                Dificultad: {item.difficulty}
                </Text>
              </VStack>
              <Button backgroundColor="#fff" onPress={() => setSelected(0)}>
              <Icon as={<MaterialCommunityIcons name={selected === 0 ? 'heart' : 'heart-outline'} />} size={6} color="#FF6060" alignSelf="center"/>
              </Button>
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
