import React, { useEffect, useState } from "react";
import {
  FlatList,
  VStack,
  Icon,
  Input,
  View,
  Select,
  ChevronDownIcon,
  Button,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  API,
  Training,
} from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, RefreshControl } from 'react-native';
import { TrainingInfoCard } from "./trainingInfoCard";
import globalUser from '../../../userStorage';
import { LoadableButton } from "../commons/buttons";


interface Props {
  navigation: any;
  onlyFavorites?: boolean;
  userId?: number;
  forceRefresh?: boolean;
  usingScrollView?: boolean;
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
  const [resetFilters, setResetFilters] = useState(false);
  const [role, setRole] = useState("Atleta");

  const updateData = async () => {
    setRefreshing(true);
    await getUserRole();
    await getTrainingsList();
    setRefreshing(false);
  }

  useEffect(() => {
    if (props.forceRefresh !== undefined) {
      updateData();
    }
  }, [props.forceRefresh])


  const api = new API(navigation);

  const getUserLocation = async () => {
    if (userLatitude && userLatitude !== 0 || userLongitude && userLongitude !== 0) {
      return [userLatitude, userLongitude];
    }
    if (!globalUser.user && !props.userId) {
      return;
    }
    let user;
    if (props.userId) {
      user = await api.getUserInfoById(props.userId);
    } else if (globalUser.user) {
      user = await api.getUserInfoById(globalUser.user.id);
    }

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
    if (lat1 == 0 || lon1 == 0) {
      getUserLocation();
    }
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
    try {
      const coordinates = await getUserLocation();
      if (coordinates !== undefined && coordinates[0] !== 0 && coordinates[1] !== 0) {
        setUserLatitude(coordinates[0]);
        setUserLongitude(coordinates[1]);
      }
      if (props.onlyFavorites) {
        const favoritesTrainingsResponse = await api.getFavoriteTrainings(props.userId);
        let trainings = updateFavoriteStatus(favoritesTrainingsResponse, favoritesTrainingsResponse);
        if (resetFilters) {
          setFilteredData(trainings);
          setResetFilters(false);
        } else {
          filterData(trainings);
        }
      } else {
        const trainingList = await api.getTrainings();
        if (trainingList.length > 0) {
          const favoritesTrainingsResponse = await api.getFavoriteTrainings(props.userId);
          let trainings = updateFavoriteStatus(trainingList, favoritesTrainingsResponse);
          if (resetFilters) {
            setFilteredData(trainings);
            setResetFilters(false);
          } else {
            filterData(trainings);
          }
        }
      }
    } catch (e: any) {
      console.error("error getting training list", e.message);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    getTrainingsList();
  }, [selectedTitle, selectedType, selectedDifficulty, selectedDistance])

  const getUserRole = async () => {
    const userRole = await globalUser.getRole();
    setRole(userRole);
  }


  useEffect(() => {
    updateData();
  }, [])

  console.log("filteredData", filteredData)

  return (
    <>
      <VStack
        paddingY={2}
        paddingX={4}
        w="100%"
      >
        <VStack alignSelf="center" paddingY={2}
          paddingX={0}>
          <Input
            placeholder="Busque por título"
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
        <View
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}>
          <View flex={0.8} paddingRight={2}>
            <Select selectedValue={selectedType} accessibilityLabel="Elija un tipo" placeholder="Tipo"
              dropdownIcon={<View paddingRight={2}><ChevronDownIcon /></View>}
              mt={1} onValueChange={handleFilterByType}>
              <Select.Item label="Tipo" value="" />
              <Select.Item label="Correr" value="Running" />
              <Select.Item label="Natación" value="Swimming" />
              <Select.Item label="Ciclismo" value="Biking" />
              <Select.Item label="Yoga" value="Yoga" />
              <Select.Item label="Basketball" value="Basketball" />
              <Select.Item label="Football" value="Football" />
              <Select.Item label="Caminata" value="Walking" />
              <Select.Item label="Gimnasia" value="Gymnastics" />
              <Select.Item label="Danza" value="Dancing" />
              <Select.Item label="Escalar" value="Hiking" />
            </Select>
          </View>
          <View flex={1} paddingRight={2}>
            <Select selectedValue={selectedDifficulty} dropdownIcon={<View paddingRight={2}><ChevronDownIcon /></View>}
              accessibilityLabel="Elija una dificultad" placeholder="Dificultad" mt={1} onValueChange={handleFilterByDifficulty}>
              <Select.Item label="Dificultad " value="" />
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
          </View>
          <View flex={1}>

            <Select selectedValue={selectedDistance.toString()} dropdownIcon={<View paddingRight={2}><ChevronDownIcon /></View>}
              accessibilityLabel="Elija distancia" placeholder="Distancia" mt={1} onValueChange={handleFilterByDistance}>
              <Select.Item label="Distancia" value="0" />
              <Select.Item label="1km" value="1" />
              <Select.Item label="3km" value="3" />
              <Select.Item label="5km" value="5" />
              <Select.Item label="10km" value="10" />
              <Select.Item label="15km" value="15" />
              <Select.Item label="20km" value="20" />
            </Select>

          </View>
          <Button
            backgroundColor="#fff"
            variant="ghost"
            size="xs"
            onPress={() => {
              setResetFilters(true);
              setType(""); // Restablecer a la etiqueta predeterminada
              setDifficulty(""); // Restablecer a la etiqueta predeterminada
              setDistance(0); // Restablecer a la etiqueta predeterminada
            }}
            ml={2}
          >
            <Icon
              as={<MaterialCommunityIcons name={"undo"} />}
              size={6}
              color="#000000"
              alignSelf="center"
            />
          </Button>
        </View>
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
      {props.usingScrollView && !refreshing && filteredData.map(training => {
        return <TrainingInfoCard
          key={training.id.toString()}
          trainingData={training}
          canSetFavorite
          userRole={role}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
          navigation={navigation}
          navigateToScreen="TrainingInfoScreen"
        />
      })}
      {props.usingScrollView && refreshing &&
        <ActivityIndicator color={"#ff6060"} size="large" style={{ marginTop: 20 }} />
      }
      {!props.usingScrollView && <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={filteredData}
        marginBottom={0}
        marginTop={0}
        renderItem={(training) => (
          <TrainingInfoCard
            trainingData={training.item}
            canSetFavorite
            userRole={role}
            userLatitude={userLatitude}
            userLongitude={userLongitude}
            navigation={navigation}
            navigateToScreen="TrainingInfoScreen"
          />
        )}
        keyExtractor={(training) => training.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateData} />}
      />}
    </>
  );
}
