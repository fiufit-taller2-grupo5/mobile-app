import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  VStack,
  Divider,
  Icon,
  Input,
  View,
  CheckIcon,
  Select,
  HStack,
} from "native-base";
import {
  API,
  Training,
} from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from 'react-native';
import { TrainingInfoCard } from "./trainingInfoCard";
import globalUser from '../../../userStorage';
import { LoadableButton } from "../commons/buttons";


interface Props {
  navigation: any;
  onlyFavorites?: boolean;
}

export default function TrainingsList(props: Props) {
  const { navigation } = props;
  const [filteredData, setFilteredData] = useState<Training[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTitle, setTitle] = useState("");
  const [selectedType, setType] = useState("");
  const [selectedDifficulty, setDifficulty] = useState("");
  const [selectedDistance, setDistance] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [role, setRole] = useState("Atleta");


  const api = new API(navigation);

  const getUserLocation = async () => {
    if (userLatitude && userLatitude !== 0 || userLongitude && userLongitude !== 0) {
      return [userLatitude, userLongitude];
    }
    if (!globalUser.user) {
      return;
    }
    const user = await api.getUserInfoById(globalUser.user.id);
    if (user) {
      const userLocation = user.location;
      if (userLocation) {
        const coordinates = await api.getCoordinates(userLocation);
        setUserLatitude(coordinates[0]);
        setUserLongitude(coordinates[1]);
        return coordinates;
      }
    }
  }

  const deg2rad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
    return distance;
  }


  const filterData = (unfilteredTrainingsList: Training[]) => {
    const filtered = unfilteredTrainingsList.filter(
      (item) =>
        (selectedDifficulty === '' || item.difficulty === parseInt(selectedDifficulty)) &&
        (selectedType === '' || item.type.toLowerCase().includes(selectedType.toLowerCase())) &&
        (selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase())) &&
        (selectedDistance === 0 || getDistanceFromLatLonInKm(userLatitude ? userLatitude : 0,
          userLongitude ? userLongitude : 0,
          item.latitude ? parseFloat(item.latitude) : 0,
          item.longitude ? parseFloat(item.longitude) : 0) <= selectedDistance) &&
        (!props.onlyFavorites || item.isFavorite)
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

  function updateFavoriteStatus(trainingResponse: Training[], favoriteTrainingResponse: Training[]): Training[] {
    const favoriteTrainingIds = new Set(favoriteTrainingResponse.map(training => training.id));
    return trainingResponse.map(training => ({
      ...training,
      isFavorite: favoriteTrainingIds.has(training.id)
    }));
  }

  const getTrainingsList = async () => {
    console.log("trying to fetch training list");
    setRefreshing(true);

    try {
      const coordinates = await getUserLocation();
      if (props.onlyFavorites) {
        const favoritesTrainingsResponse = await api.getFavoriteTrainings();
        let trainings = updateFavoriteStatus(favoritesTrainingsResponse, favoritesTrainingsResponse);
        filterData(trainings);
      } else {
        const trainingList = await api.getTrainings();
        if (trainingList.length > 0) {
          const favoritesTrainingsResponse = await api.getFavoriteTrainings();
          let trainings = updateFavoriteStatus(trainingList, favoritesTrainingsResponse);
          filterData(trainings);
        }
      }
    } catch (e: any) {
      console.error(e.message);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    getTrainingsList();
  }, [selectedTitle, selectedType, selectedDifficulty, selectedDistance])

  const getUserRule = async () => {
    const userRole = await globalUser.getRole();
    setRole(userRole);
  }


  useEffect(() => {
    getUserRule();
    getTrainingsList();
  }, [])


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
      {
        role === "Entrenador" &&
        <View style={{ display: "flex", alignItems: 'flex-end', paddingHorizontal: 15 }}>
          <LoadableButton
            customStyles={{ width: "100%" }}
            text="Crear nuevo"
            onPress={async () => { navigation.navigate('CreateTrainingScreen'); }}
          />
        </View>
      }
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={filteredData}
        marginBottom={0}
        marginTop={0}
        renderItem={(training) => (
          <TrainingInfoCard
            trainingData={training.item}
            canSetFavorite
            navigation={navigation}
            navigateToScreen="TrainingInfoScreen"
          />
        )}
        keyExtractor={(training) => training.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { getTrainingsList() }} />}
      >
      </FlatList>
    </>
  );
}
