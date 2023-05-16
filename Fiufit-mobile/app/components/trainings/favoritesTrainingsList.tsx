import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, NativeBaseProvider, Button, Divider, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { trainingStyles } from "../../styles"
import { getFavoriteTrainings, Training } from "../../../api";
import { RefreshControl } from 'react-native';
import { TrainingInfoCard } from "./trainingInfoCard";

interface Props {
  navigation: any;
};

// interface FavoriteTrainingInfoProps {
//   navigation: any;
//   favoriteTraining: Training;
// };

// const mainImage = (training_type: any) => {
//   if (training_type === 'Running') return "https://wallpaperaccess.com/thumb/2604922.jpg";
//   else if (training_type === 'Swimming') return "https://wallpaperaccess.com/thumb/1634055.jpg";
//   else if (training_type === 'Walking') return "https://wallpaperaccess.com/thumb/654835.jpg";
//   else if (training_type === 'Biking') return "https://wallpaperaccess.com/thumb/4431599.jpg";
//   else if (training_type === 'Yoga') return "https://wallpaperaccess.com/thumb/2532294.jpg";
//   else if (training_type === 'Basketball') return "https://wallpaperaccess.com/thumb/798750.jpg";
//   else if (training_type === 'Football') return "https://wallpaperaccess.com/thumb/1813065.jpg";
//   else if (training_type === 'Gymnastics') return "https://wallpaperaccess.com/thumb/2236559.jpg";
//   else if (training_type === 'Dancing') return "https://wallpaperaccess.com/thumb/1315981.jpg";
//   else if (training_type === 'Hiking') return "https://wallpaperaccess.com/thumb/7309738.jpg";
// };

// const FavoriteTrainingsInfo = (props: FavoriteTrainingInfoProps) => {
//   const { navigation, favoriteTraining } = props;
//   return <Box backgroundColor="#fff" >
//     <Button height={150} px="10" py="10" backgroundColor="#fff" onPress={async () => { navigation.navigate('FavoriteTrainingInfoScreen', { trainingData: favoriteTraining }); }}>
//       <HStack space={[2, 3]} height={70} width={380}>
//         <Image source={{ uri: mainImage(favoriteTraining.type) }} alt="Alternate Text" size="lg" borderRadius={10} />
//         <VStack my={1} width={220} height={10} mr={0} ml={1}>
//           <Text style={trainingStyles.textTitle} color="#000000" text-align="left" bold>
//             {favoriteTraining.title}
//           </Text>
//           <Text fontSize="sm" color="#000000">
//             {favoriteTraining.description}
//           </Text>
//           <Text fontSize="xs" color="#000000">
//             Dificultad: {favoriteTraining.difficulty}
//           </Text>
//         </VStack>
//       </HStack>
//       <Divider my={10} mx={1} />
//     </Button>
//   </Box>;
// };

export default function FavoriteTrainingsList(props: Props) {
  const { navigation } = props;
  const [favoriteTrainingsList, setFavoriteTrainingsList] = useState<Training[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<Training[]>([]);
  const [refreshing, setRefreshing] = useState(true);

  const filterDataByDifficultyOrType = (text: string) => {
    if (text) {
      const filtered = favoriteTrainingsList.filter(
        (item) =>
          item.difficulty === parseInt(text) ||
          item.type.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
    else {
      setFilteredData(favoriteTrainingsList);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterDataByDifficultyOrType(text);
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
    setFilteredData(favoritesTrainings);
  }

  useEffect(() => {
    getTrainingsList();
  }, [])

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
            placeholder="Search trainings by difficulty or type"
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
