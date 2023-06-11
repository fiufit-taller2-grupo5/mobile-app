import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, Button, Divider, Input, Icon, View, Select, CheckIcon } from "native-base";
import { trainingStyles } from "../../styles"
import { Training, API } from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from 'react-native';
import globalUser from '../../../userStorage';

interface Props {
  navigation: any;
};

interface TrainerTrainingInfoProps {
  navigation: any;
  trainerTraining: Training;
};

const mainImage = (training_type: any) => {
  if (training_type === 'Running') return "https://wallpaperaccess.com/thumb/2604922.jpg";
  else if (training_type === 'Swimming') return "https://wallpaperaccess.com/thumb/1634055.jpg";
  else if (training_type === 'Walking') return "https://wallpaperaccess.com/thumb/654835.jpg";
  else if (training_type === 'Biking') return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else if (training_type === 'Yoga') return "https://wallpaperaccess.com/thumb/2532294.jpg";
  else if (training_type === 'Basketball') return "https://wallpaperaccess.com/thumb/798750.jpg";
  else if (training_type === 'Football') return "https://wallpaperaccess.com/thumb/1813065.jpg";
  else if (training_type === 'Gymnastics') return "https://wallpaperaccess.com/thumb/2236559.jpg";
  else if (training_type === 'Dancing') return "https://wallpaperaccess.com/thumb/1315981.jpg";
  else if (training_type === 'Hiking') return "https://wallpaperaccess.com/thumb/7309738.jpg";
};

const TrainerTrainingsInfo = (props: TrainerTrainingInfoProps) => {
  const { navigation, trainerTraining } = props;
  return <Box backgroundColor="#fff" >
    <Button
      height={150}
      px="10" py="10"
      backgroundColor="#fff"
      onPress={async () => {
        navigation.navigate(
          'TrainingInfoScreen',
          { trainingData: trainerTraining });
      }
      }
    >
      <HStack space={[2, 3]} height={70} width={380}>
        <Image source={{ uri: mainImage(trainerTraining.type) }} alt="Alternate Text" size="lg" borderRadius={10} />
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
  const [filteredData, setFilteredData] = useState<Training[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [selectedTitle, setTitle] = useState("");
  const [selectedType, setType] = useState("");
  const [selectedDifficulty, setDifficulty] = useState("");
  const [selectedDistance, setDistance] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);


  const api = new API(navigation);

  const getUserLocation = async () => {
    if (userLatitude !== 0 || userLongitude !== 0) {
      return;
    }
    if (!globalUser.user) {
      return;
    }
    const user = await api.getUserInfoById(globalUser.user.id);
    console.log("USER: ", user);
    if (user) {
      const userLocation = user.location;
      if (userLocation) {
        const coordinates = await api.getCoordinates(userLocation);
        console.log("COORDINATES: ", coordinates);
        setUserLatitude(coordinates.latitude);
        setUserLongitude(coordinates.longitude);
      }
    }
  }

  const deg2rad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    console.log("User Lat: ", lat1, "User Lon: ", lon1);
    console.log("Training Lat: ", lat2, "Training Lon: ", lon2);
    if (lat1 === 0 || lon1 === 0 || lat2 === 0 || lon2 === 0) {
      return selectedDistance + 1;
    }
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    console.log("Distancia en km ", distance);
    return distance;
  }

  const filterData = () => {
    const filtered = trainerTrainingsList.filter(
      (item) =>
        (selectedDifficulty === '' || item.difficulty === parseInt(selectedDifficulty)) &&
        (selectedType === '' || item.type.toLowerCase().includes(selectedType.toLowerCase())) &&
        (selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase())) &&
        (selectedDistance === 0 || getDistanceFromLatLonInKm(userLatitude ? userLatitude : 0,
                                    userLongitude ? userLongitude : 0, item.latitude ? item.latitude : 0,
                                    item.longitude ? item.longitude : 0) <= selectedDistance)
    );
    setFilteredData(filtered);
  }

  const handleFilterByTitle = (text: string) => {
    setTitle(text);
  };

  const handleFilterByDifficulty = (text: string) => {
    setDifficulty(text);
  };

  const handleFilterByType = (text: string) => {
    setType(text);
  };
  
  const handleFilterByDistance = (text: string) => {
    setDistance(parseInt(text));
  };

  const getTrainingsList = async () => {
    setRefreshing(true);
    const trainersTrainingsResponse = await api.getTrainerTrainings();
    setTrainerTrainingsList(trainersTrainingsResponse);
    setRefreshing(false);
    filterData();
  }

  useEffect(() => {
    getTrainingsList();
  }, [selectedTitle, selectedType, selectedDifficulty, selectedDistance])

  return (
    <>
      <VStack
        paddingY={2}
        paddingX={4}
        w="100%"
        backgroundColor="#fff"
      >
        <VStack alignSelf="center" paddingY={2}
          paddingX={4}>
          <Input
            placeholder="Search trainings by title"
            onChangeText={handleFilterByTitle}
            value={selectedTitle}
            width="100%"
            borderRadius="4"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
          />
        </VStack>
        <HStack>
          <Box maxW="300">
            <Select selectedValue={selectedType} minWidth="120" maxWidth="190" accessibilityLabel="Choose Type" placeholder="Choose Type" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="2" />
            }} mt={1} onValueChange={handleFilterByType}>
              <Select.Item label="All types" value="" />
              <Select.Item label="Running" value="Running" />
              <Select.Item label="Swimming" value="Swimming" />
              <Select.Item label="Biking" value="Biking" />
              <Select.Item label="Yoga" value="Yoga" />
              <Select.Item label="Basketball" value="Basketball" />
              <Select.Item label="Football" value="Football" />
              <Select.Item label="Walking" value="Walking" />
              <Select.Item label="Gymnastics" value="Gymnastics" />
              <Select.Item label="Dancing" value="Dancing" />
              <Select.Item label="Hiking" value="Hiking" />
            </Select>
          </Box>
          <Box maxW="300">
            <Select selectedValue={selectedDifficulty} minWidth="120" maxWidth="190" accessibilityLabel="Choose Difficulty" placeholder="Choose Difficulty" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="2" />
            }} mt={1} onValueChange={handleFilterByDifficulty}>
              <Select.Item label="All difficulties" value="" />
              <Select.Item label="1" value="1" />
              <Select.Item label="2" value="2" />
              <Select.Item label="3" value="3" />
              <Select.Item label="4" value="4" />
              <Select.Item label="5" value="5" />
              <Select.Item label="6" value="6" />
              <Select.Item label="7" value="7" />
              <Select.Item label="8" value="8" />
              <Select.Item label="9" value="9" />
              <Select.Item label="10" value="10" />
            </Select>
          </Box>
          <Box maxW="300">
            <Select selectedValue={selectedDistance.toString()} minWidth="120" maxWidth="190" accessibilityLabel="Choose Distance" placeholder="Choose Distance" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="2" />
            }} mt={1} onValueChange={handleFilterByDistance}>
              <Select.Item label="All distances" value="0" />
              <Select.Item label="1km" value="1" />
              <Select.Item label="3km" value="3" />
              <Select.Item label="5km" value="5" />
              <Select.Item label="10km" value="10" />
              <Select.Item label="15km" value="15" />
              <Select.Item label="20km" value="20" />
            </Select>
          </Box>
        </HStack>
      </VStack>
      <View style={{ display: "flex", alignItems: 'flex-end', paddingHorizontal: 15 }}>
        <Button
          style={{ backgroundColor: "#FF6060", width: "100%" }}
          _text={{ fontFamily: "Roboto", fontWeight: "bold", color: "#fff" }}
          onPress={() => { navigation.navigate('CreateTrainingScreen'); }}
        >
          Crear nuevo
        </Button>
      </View>
      <FlatList
        data={filteredData}
        marginTop={5}
        renderItem={(trainerTraining) =>
          <TrainerTrainingsInfo
            trainerTraining={trainerTraining.item}
            navigation={navigation}
          />
        }
        keyExtractor={(training) => training.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTrainingsList} />}
      >
      </FlatList>
    </>
  );
};
