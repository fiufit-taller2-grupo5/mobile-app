import React, { useState } from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { trainingStyles } from "../../styles";
import { addFavoriteTraining, quitFavoriteTraining } from '../../../api';

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

export const TrainingInfoCard = ({
  trainingData,
  setFavorite = false,
  navigation,
  navigateToScreen
}: any) => {

  const [isFavorite, setTrainingFavorite] = useState<Boolean>(
    trainingData.isFavorite || false
  );
  const [isRated, setTrainingRated] = useState<Boolean>(
    true || false // training.isRated || false
  );

  const handleFavorite = async () => {
    if (!setFavorite) return;

    if (isFavorite) {
      setFavorite(false);
      const response = await quitFavoriteTraining(trainingData.id);
      if (!response) setFavorite(true);
    } else {
      setFavorite(true);
      const response = await addFavoriteTraining(trainingData.id);
      if (!response) setFavorite(false);
    }
  }

  return (
    <Box backgroundColor="#fff">
      <Button
        height={150}
        px="10"
        py="10"
        backgroundColor="#fff"
        onPress={async () => {
          navigation.navigate(navigateToScreen, { trainingData });
        }}
      >
        <HStack
          space={[2, 3]}
          justifyContent="space-between"
          height={70}
          width={380}
        >
          <Image
            source={{ uri: mainImage(trainingData.type) }}
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
            <Text fontSize="sm" color="#000000">
              {trainingData.description}
            </Text>
            <Text fontSize="xs" color="#000000">
              Dificultad: {trainingData.difficulty}
            </Text>
          </VStack>
          {setFavorite && (
            <VStack my={1} width={30} height={10} mr={0} ml={1}>
              <Button backgroundColor="#fff" onPress={handleFavorite}>
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
          )}
        </HStack>
        <Divider my={10} mx={1} />
      </Button>
    </Box>
  );
};
