import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, NativeBaseProvider, Button, Divider, Input, Icon} from "native-base";
import { trainingStyles } from "../../styles"
import { getTrainerTrainings, Training } from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";


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
  else if(training_type === 'Biking') return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else if(training_type === 'Yoga') return "https://wallpaperaccess.com/thumb/2532294.jpg";
  else if(training_type === 'Basketball') return "https://wallpaperaccess.com/thumb/798750.jpg";
  else if(training_type === 'Football') return "https://wallpaperaccess.com/thumb/1813065.jpg";
  else if(training_type === 'Gymnastics') return "https://wallpaperaccess.com/thumb/2236559.jpg";
  else if(training_type === 'Dancing') return "https://wallpaperaccess.com/thumb/1315981.jpg";
  else if(training_type === 'Hiking') return "https://wallpaperaccess.com/thumb/7309738.jpg";
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
          { trainingData: trainerTraining });
        }
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
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<Training[]>([]);

  // useEffect(() => {
  //   if (searchText) {
  //     const getFilteredTrainingsList = async (filterRule: string, filterValue: string) => {
  //       const trainersTrainingsResponse  = await getTrainerTrainings(filterRule, filterValue);
  //       setTrainerTrainingsList(trainersTrainingsResponse);
  //       setFilteredData(trainersTrainingsResponse);
  //     }
  //     if (parseInt(searchText)) {
  //       getFilteredTrainingsList("difficulty", searchText);
  //     } else {
  //       getFilteredTrainingsList("training_type", searchText);
  //     }
  //   }
  //   else {
  //     setFilteredData(trainerTrainingsList);
  //   }
  // }, [searchText])

  const filterDataByDifficultyOrType = (text: string) => {
    if(text) {
      const filtered = trainerTrainingsList.filter(
        (item) =>
          item.difficulty === parseInt(text) ||
          item.type.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
    else {
      setFilteredData(trainerTrainingsList);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterDataByDifficultyOrType(text);
  };

  useEffect(() => {
    const getTrainingsList = async () => {
      const trainersTrainingsResponse  = await getTrainerTrainings();
      setTrainerTrainingsList(trainersTrainingsResponse);
      setFilteredData(trainersTrainingsResponse);
    }
    getTrainingsList();
  }, [])

  return (
    <NativeBaseProvider>
      <Input
        placeholder="Search trainings by difficulty or type"
        onChangeText={handleSearch}
        value={searchText}
        width="100%"
        borderRadius="4"
        py="3" px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2" ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />} 
          />
        }
      />
      <Button
        style={{backgroundColor: "#FF6060"}}
        _text={{fontFamily: "Roboto", fontWeight: "bold", color: "#fff"}}
        onPress={() => {navigation.navigate('CreateTrainingScreen');}}
      >
        Crear nuevo
      </Button>
      <FlatList
        data={filteredData}
        marginBottom={65}
        marginTop={2}
        renderItem = {(trainerTraining) => 
          <TrainerTrainingsInfo 
            trainerTraining={trainerTraining.item}
            navigation={navigation}
          />
        }
        keyExtractor={(training) => training.id.toString()}
      >
      </FlatList> 
    </NativeBaseProvider>
  );
};
