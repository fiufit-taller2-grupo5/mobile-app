import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, NativeBaseProvider, Button, Divider } from "native-base";
import SearchBar from './searchBar';
import { trainingStyles } from "../../styles"
import { getFavoriteTrainings, Training } from "../../../api";  // cambiarlo por getTrainerTrainings

interface Props {
  navigation: any;
};

interface TrainerTrainingInfoProps {
  navigation: any;
  trainerTraining: Training;
};

const mainImage = (training_type: any) => {
  if(training_type === 'Running') return "https://wallpaperaccess.com/thumb/2604922.jpg";
  else if(training_type === 'Swimming') return "https://wallpaperaccess.com/thumb/1634055.jpg";
  else if(training_type === 'Walking') return "https://wallpaperaccess.com/thumb/654835.jpg";
  else if(training_type === 'Cycling') return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else return "https://wallpaperaccess.com/thumb/654835.jpg";
};

const TrainerTrainingsInfo = (props: TrainerTrainingInfoProps) => {
  const { navigation, trainerTraining} = props;
  return <Box backgroundColor="#fff" >
    <Button
      height={150}
      px="10" py="10"
      backgroundColor="#fff"
      onPress={async () => 
        {navigation.navigate(
          'TrainerTrainingInfoScreen',
          { trainingData: trainerTraining });}
      }
    >
      <HStack space={[2, 3]} height={70} width={380}>
        <Image source={{uri: mainImage(trainerTraining.type)}} alt="Alternate Text" size="lg" borderRadius={10}/>
        <VStack my={1} width={220} height={10} mr={0} ml={1}>
          <Text style={trainingStyles.textTitle} color="#000000" text-align="left" bold>
            {trainerTraining.title}
          </Text>
          <Text fontSize="sm" color="#000000">
            {trainerTraining.description}
          </Text>
          <Text fontSize="xs" color="#000000">
            Dificultad: {trainerTraining.difficulty}
          </Text>
        </VStack>
      </HStack>
      <Divider my={10} mx={1} />
    </Button>
  </Box>;
};

export default function TrainerTrainingsList(props: Props) {
  const { navigation } = props;
  const [trainerTrainingsList, setTrainerTrainingsList] = useState<Training[]>([]);
  useEffect(() => {
    const getTrainingsList = async () => {
      const trainersTrainingsResponse  = await getFavoriteTrainings();  // camiarlo por getTrainerTrainings
      setTrainerTrainingsList(trainersTrainingsResponse);
    }
    getTrainingsList();
  }, []) //agregar trainerTrainingsList entre los [] para notar que se renderiza cuando se agregan nuevos trainings favs

  return (
    <NativeBaseProvider>
      <SearchBar/>
      <Button
        style={{backgroundColor: "#FF6060"}}
        _text={{fontFamily: "Roboto", fontWeight: "bold", color: "#fff"}}
        onPress={() => {navigation.navigate('CreateTrainingScreen');}}
      >
        Crear nuevo
      </Button>
      <FlatList
        data={trainerTrainingsList}
        marginBottom={65}
        marginTop={2}
        renderItem = {(trainerTraining) => 
          <TrainerTrainingsInfo 
            trainerTraining={trainerTraining.item}
            navigation={navigation}
          />
        }
      >
      </FlatList> 
    </NativeBaseProvider>
  );
};
