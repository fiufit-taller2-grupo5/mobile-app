import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, NativeBaseProvider, Button, Divider, Icon } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from './searchBar';
import { trainingStyles } from "../../styles"
import { addFavoriteTraining, getFavoriteTrainings, getTrainings, Training } from "../../../api";

interface Props {
  navigation: any;
};

interface TrainingInfoProps {
  navigation: any;
  training: Training;
};

const mainImage = (training_type: any) => {
  if(training_type === 'Running') return "https://wallpaperaccess.com/thumb/2604922.jpg";
  else if(training_type === 'Swimming') return "https://wallpaperaccess.com/thumb/1634055.jpg";
  else if(training_type === 'Walking') return "https://wallpaperaccess.com/thumb/654835.jpg";
  else if(training_type === 'Cycling') return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else return "https://wallpaperaccess.com/thumb/654835.jpg";
};

const TrainingsInfo = (props: TrainingInfoProps) => {
  const { navigation, training} = props;
  const [isFavorite, setTrainingFavorite] = useState<Boolean>(training.isFavorite || false);
  //data.filter((item) => item.state == 'New York')
  /*const [value, setValue] = React.useState("");
  const handleChange = (text: React.SetStateAction<string>) => {
    setValue(text);
    trainingsData.filter((item) => item.difficulty == value);
  };*/
  return <Box backgroundColor="#fff" >
    <Button height={150} px="10" py="10" backgroundColor="#fff" onPress={async () => { navigation.navigate('TrainingInfoScreen', { trainingData: training });}}>
            <HStack space={[2, 3]} justifyContent="space-between" height={70} width={380}>
            <Image source={{uri: mainImage(training.type)}} alt="Alternate Text" size="lg" borderRadius={10}/>
              <VStack my={1} width={220} height={10} mr={0} ml={1}>
                <Text style={trainingStyles.textTitle} color="#000000" text-align="left" bold>
                  {training.title}
                </Text>
                <Text fontSize="sm" color="#000000">
                  {training.description}
                </Text>
                <Text fontSize="xs" color="#000000">
                Dificultad: {training.difficulty}
                </Text>
              </VStack>
              <Button backgroundColor="#fff" onPress={async () => {
                if(isFavorite) {
                  /*setTrainingFavorite(false);
                  const response = await quitFavoriteTraining(training.id);
                  if(!response) setTrainingFavorite(true);*/
                }
                else {
                  setTrainingFavorite(true);
                  const response = await addFavoriteTraining(training.id);
                  if(!response) setTrainingFavorite(false);
                }
              }}>
              <Icon as={<MaterialCommunityIcons name={isFavorite? 'heart' : 'heart-outline'} />} size={6} color="#FF6060" alignSelf="center"/>
              </Button>
            </HStack>
            <Divider my={10} mx={1} />
          </Button>
    </Box>;
};

export default function TrainingsList(props: Props) {
  const { navigation } = props;
  const [trainingsList, setTrainingsList] = useState<Training[]>([]);
  useEffect(() => {
    console.log("useEffect called");
    function updateFavoriteStatus(trainingResponse: Training[], favoriteTrainingResponse: Training[]): Training[] {
      const favoriteTrainingIds = new Set(favoriteTrainingResponse.map(training => training.id));
      return trainingResponse.map(training => ({
        ...training, 
        isFavorite: favoriteTrainingIds.has(training.id)
      }));
    }
    const getTrainingsList = async () => {
      const trainingsResponse  = await getTrainings();
      const favoritesTrainingsResponse  = await getFavoriteTrainings();
      let trainings = updateFavoriteStatus(trainingsResponse, favoritesTrainingsResponse);
      setTrainingsList(trainings);
    }
    getTrainingsList();
  }, []) //agregar trainingsList entre los [] para notar que se renderiza cuando se agregan nuevos trainings

  return (
    <NativeBaseProvider>
      <SearchBar/>
      <FlatList data={trainingsList} marginBottom={65} marginTop={2} renderItem = {(training) => <TrainingsInfo training={training.item} navigation={navigation}/> }></FlatList> 
    </NativeBaseProvider>
  );
};
