import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  NativeBaseProvider,
  Button,
  Divider,
  Icon,
  Input,
  View,
  CheckIcon,
  Select,
  Center
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { trainingStyles } from "../../styles";
import {
  addFavoriteTraining,
  getFavoriteTrainings,
  getTrainings,
  quitFavoriteTraining,
  Training,
} from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from 'react-native';
import { TrainingInfoCard } from "./trainingInfoCard";

interface Props {
  navigation: any;
}

interface TrainingInfoProps {
  navigation: any;
  training: Training;
}

const mainImage = (training_type: any) => {
  if (training_type === "Running")
    return "https://wallpaperaccess.com/thumb/2604922.jpg";
  else if (training_type === "Swimming")
    return "https://wallpaperaccess.com/thumb/1634055.jpg";
  else if (training_type === "Walking")
    return "https://wallpaperaccess.com/thumb/654835.jpg";
  else if (training_type === "Biking")
    return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else if (training_type === "Yoga")
    return "https://wallpaperaccess.com/thumb/2532294.jpg";
  else if (training_type === "Basketball")
    return "https://wallpaperaccess.com/thumb/798750.jpg";
  else if (training_type === "Football")
    return "https://wallpaperaccess.com/thumb/1813065.jpg";
  else if (training_type === "Gymnastics")
    return "https://wallpaperaccess.com/thumb/2236559.jpg";
  else if (training_type === "Dancing")
    return "https://wallpaperaccess.com/thumb/1315981.jpg";
  else if (training_type === "Hiking")
    return "https://wallpaperaccess.com/thumb/7309738.jpg";
};

const TrainingsInfo = (props: TrainingInfoProps) => {
  const { navigation, training } = props;
  const [isFavorite, setTrainingFavorite] = useState<Boolean>(
    training.isFavorite || false
  );
  const [isRated, setTrainingRated] = useState<Boolean>(
    true || false // training.isRated || false
  );

  return (
    <Box backgroundColor="#fff">
      <Button
        height={150}
        px="10"
        py="10"
        backgroundColor="#fff"
        onPress={async () => {
          navigation.navigate("TrainingInfoScreen", { trainingData: training });
        }}
      >
        <HStack
          space={[2, 3]}
          justifyContent="space-between"
          height={70}
          width={380}
        >
          <Image
            source={{ uri: mainImage(training.type) }}
            alt="Alternate Text"
            size="lg"
            borderRadius={10}
          />
          <VStack my={1} width={220} height={10} mr={0} ml={1}>
            <Text
              style={trainingStyles.textTitle}
              color="#000000"
              text-align="left"
              bold
            >
              {training.title}
            </Text>
            <Text fontSize="sm" color="#000000">
              {training.description}
            </Text>
            <Text fontSize="xs" color="#000000">
              Dificultad: {training.difficulty}
            </Text>
          </VStack>
          <VStack my={1} width={30} height={10} mr={0} ml={1}>
            <Button
              backgroundColor="#fff"
              onPress={async () => {
                if (isFavorite) {
                  setTrainingFavorite(false);
                  const response = await quitFavoriteTraining(training.id);
                  if (!response) setTrainingFavorite(true);
                } else {
                  setTrainingFavorite(true);
                  const response = await addFavoriteTraining(training.id);
                  if (!response) setTrainingFavorite(false);
                }
              }}
            >
              <Icon
                as={
                  <MaterialCommunityIcons
                    name={isFavorite ? "heart" : "heart-outline"}
                  />
                }
                size={6}
                color="#FF6060"
                alignSelf="center"
              />
            </Button>
            <Button
              backgroundColor="#fff"
              onPress={async () => {
                console.log("click");
              }}
            >
              <Icon
                as={
                  <MaterialCommunityIcons
                    name={isRated ? "star" : "star-outline"}
                  />
                }
                size={6}
                color="#FFD27D"
                alignSelf="center"
              />
            </Button>
          </VStack>
        </HStack>
        <Divider my={10} mx={1} />
      </Button>
    </Box>
  );
};

export default function TrainingsList(props: Props) {
  const { navigation } = props;
  const [trainingsList, setTrainingsList] = useState<Training[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<Training[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [type, setType] = React.useState("");

  /*const filterDataByDifficultyOrType = (text: string) => {
    if (text) {
      const filtered = trainingsList.filter(
        (item) =>
          item.difficulty === parseInt(text) ||
          item.type.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(trainingsList);
    }
  };*/

  const filterDataByType = (text: string) => {
    if (text) {
      const filtered = trainingsList.filter(
        (item) =>
          item.type.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(trainingsList);
    }
  };

  const filterDataByTitle = (text: string) => {
    if (text) {
      const filtered = trainingsList.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(trainingsList);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterDataByTitle(text);
  };

  const handleFilterByType = (text: string) => {
    setType(text);
    filterDataByType(text);
  };

  function updateFavoriteStatus(trainingResponse: Training[], favoriteTrainingResponse: Training[]): Training[] {
    const favoriteTrainingIds = new Set(favoriteTrainingResponse.map(training => training.id));
    return trainingResponse.map(training => ({
      ...training,
      isFavorite: favoriteTrainingIds.has(training.id)
    }));
  }

  const getTrainingsList = async () => {
    setRefreshing(true);
    const trainingsResponse = await getTrainings();
    const favoritesTrainingsResponse = await getFavoriteTrainings();
    let trainings = updateFavoriteStatus(trainingsResponse, favoritesTrainingsResponse);
    // const ratings = await getTrainingsRatings(trainings.map((training) => training.id));
    // trainings = updateMeanRating(trainings, ratings);
    setTrainingsList(trainings);
    setRefreshing(false);
    setFilteredData(trainings);
  }

  // function updateMeanRating(trainingResponse: Training[]): Training[] {
  //   return trainingResponse.map((training) => ({
  //     ...training,
  //     meanRating: training.ratings.reduce(
  //       (acc, rating) => acc + rating.value,
  //       0
  //     ),
  //   }));
  // }

  useEffect(() => {
    getTrainingsList();
  }, [])

  return (<View flex={1} backgroundColor="#fff">
    <VStack
      paddingY={2}
      paddingX={4}
      w="100%"
      backgroundColor="#fff"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      <VStack alignSelf="center">
        <Input
          placeholder="Search trainings by name"
          onChangeText={handleSearch}
          value={searchText}
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
      <VStack>
      <Box maxW="300">
        <Select selectedValue={type} maxWidth="190" accessibilityLabel="Choose Type" placeholder="Choose Type" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={handleFilterByType}>
          <Select.Item label="No filter" value="" />
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
    </VStack>
    </VStack>
    <View flex={1}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={filteredData}
        marginBottom={0}
        marginTop={5}
        renderItem={(training) => (
          <TrainingInfoCard
            trainingData={training.item}
            canSetFavorite
            navigation={navigation}
            navigateToScreen="TrainingInfoScreen"
          />
        )}
        keyExtractor={(training) => training.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTrainingsList} />}
      ></FlatList></View>
  </View>
  );
}
