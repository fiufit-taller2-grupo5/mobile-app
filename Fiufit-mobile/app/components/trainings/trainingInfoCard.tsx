import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, Icon, useToast } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { trainingStyles } from "../../styles";
import { TouchableOpacity } from 'react-native';
import { API } from '../../../api';
import { trainingTypeFromEnglishToSpanish } from './trainingCard';

export const trainingMainImage = (training_type: any) => {
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

export const TrainingInfoCard = ({
  trainingData,
  canSetFavorite = false,
  userRole,
  userLatitude,
  userLongitude,
  onRemoveFavorite = () => { },
  navigation,
  navigateToScreen,
}: any) => {

  const toast = useToast();

  const api = new API(navigation);

  useEffect(() => {
    setTrainingFavorite(trainingData.isFavorite ? trainingData.isFavorite : false);
  }, [trainingData])

  const [isFavorite, setTrainingFavorite] = useState<Boolean>(
    trainingData.isFavorite || false
  );
  const [isRated, setTrainingRated] = useState<Boolean>(
    true || false
  );

  const handleFavorite = async () => {
    if (!canSetFavorite) return;

    try {

      if (isFavorite) {
        await api.quitFavoriteTraining(trainingData.id);
        setTrainingFavorite(false);
        onRemoveFavorite();
      } else {
        await api.addFavoriteTraining(trainingData.id);
        setTrainingFavorite(true);
      }
    } catch (e: any) {
      toast.show({
        description: e.message,
        backgroundColor: "red.700",
        duration: 3000,
      });
    }
  }

  return (
    <TouchableOpacity style={{ height: 130, backgroundColor: "#fff", paddingHorizontal: 15 }} onPress={async () => {
      navigation.navigate(navigateToScreen, { trainingData, userLatitude, userLongitude });
    }}>

      <HStack
        space={[2, 3]}
        justifyContent="space-between"
        height={70}
      >
        <Image
          source={{ uri: trainingData.multimedia && trainingData.multimedia.at(0) ? trainingData.multimedia?.at(0).fileUrl : trainingMainImage(trainingData.type) }}
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
            {trainingData.title}
          </Text>
          <Text paddingLeft={15} fontSize="sm" color="#000000">
            {trainingData.description}
          </Text>
          <Text paddingLeft={15} fontSize="sm" color="#000000">
            {trainingTypeFromEnglishToSpanish(trainingData.type)}
          </Text>
          <Text paddingLeft={15} fontSize="sm" color="#000000">
            Dificultad: {trainingData.difficulty}
          </Text>
        </VStack>
        <VStack my={5} width={30} height={10} mr={0} ml={1} alignItems={"center"}>
          {canSetFavorite && userRole === "Atleta" && (
            <>

              <Button backgroundColor="#fff" onPress={handleFavorite}>
                <Icon
                  as={<MaterialCommunityIcons name={isFavorite ? "heart" : "heart-outline"} />}
                  size={6}
                  color="#FF6060"
                  alignSelf="center"
                />
              </Button>
              {/* <Button backgroundColor="#fff" onPress={async () => { console.log("click"); }}>
                  <Icon
                    as={<MaterialCommunityIcons name={isRated ? "star" : "star-outline"} />}
                    size={6}
                    color="#FFD27D"
                    alignSelf="center"
                  />
                </Button> */}
            </>
          )}
        </VStack>
      </HStack>
      <Divider my={10} mx={1} />
    </TouchableOpacity>
  );
};

