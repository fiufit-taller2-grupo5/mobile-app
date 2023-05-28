import React, { useEffect, useState } from "react";
import { Box, FlatList, VStack, NativeBaseProvider, Divider, Input, Icon, HStack, Select, CheckIcon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { getFavoriteTrainings, Training } from "../../../api";
import { RefreshControl } from 'react-native';
import { TrainingInfoCard } from "./trainingInfoCard";

interface Props {
  navigation: any;
};

export default function FavoriteTrainingsList(props: Props) {
  const { navigation } = props;
  const [favoriteTrainingsList, setFavoriteTrainingsList] = useState<Training[]>([]);
  const [filteredData, setFilteredData] = useState<Training[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [selectedTitle, setTitle] = useState("");
  const [selectedType, setType] = React.useState("");
  const [selectedDifficulty, setDifficulty] = React.useState("");

  const filterData = () => {
      const filtered = favoriteTrainingsList.filter(
        (item) =>
          (selectedDifficulty === '' || item.difficulty === parseInt(selectedDifficulty)) &&
          (selectedType === '' || item.type.toLowerCase().includes(selectedType.toLowerCase())) &&
          (selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase()))
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

  const getTrainingsList = async () => {
    setRefreshing(true);
    const favoritesTrainingsResponse = await getFavoriteTrainings();
    const favoritesTrainings = favoritesTrainingsResponse.map((training) => ({
      ...training,
      isFavorite: true
    }));
    setFavoriteTrainingsList(favoritesTrainings);
    setRefreshing(false);
    filterData();
  }

  useEffect(() => {
    getTrainingsList();
  }, [selectedTitle, selectedType, selectedDifficulty])

  console.log("favoriteTrainingsList:", filteredData)

  return (
    <NativeBaseProvider>
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
        <Select selectedValue={selectedType} minWidth="180" maxWidth="190" accessibilityLabel="Choose Type" placeholder="Choose Type" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
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
        <Select selectedValue={selectedDifficulty} minWidth="180" maxWidth="190" accessibilityLabel="Choose Difficulty" placeholder="Choose Difficulty" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
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
    </HStack>
      </VStack>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        marginBottom={0}
        marginTop={0}
        data={filteredData}
        renderItem={(favoriteTraining) => <TrainingInfoCard
          canSetFavorite
          onRemoveFavorite={getTrainingsList}
          trainingData={favoriteTraining.item}
          navigation={navigation}
          navigateToScreen="TrainingInfoScreen"
        />} keyExtractor={(training) => training.id.toString()} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTrainingsList} />}></FlatList>
    </NativeBaseProvider>
  );
};
