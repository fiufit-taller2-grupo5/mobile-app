import React, { useState } from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { trainingStyles } from "../../styles";
import { API } from '../../../api';

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
  onRemoveFavorite = () => { },
  navigation,
  navigateToScreen,
  userTrainingData = null
}: any) => {

  const api = new API(navigation);


  const [isFavorite, setTrainingFavorite] = useState<Boolean>(
    trainingData.isFavorite || false
  );
  const [isRated, setTrainingRated] = useState<Boolean>(
    true || false
  );

  const handleFavorite = async () => {
    if (!canSetFavorite) return;

    if (isFavorite) {
      setTrainingFavorite(false);
      await api.quitFavoriteTraining(trainingData.id);
      onRemoveFavorite();
    } else {
      setTrainingFavorite(true);
      await api.addFavoriteTraining(trainingData.id);
    }
  }

  return (
    <Box backgroundColor="#fff" style={{ height: 130 }}>
      <Button
        height={170}
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
        >
          <Image
            source={{ uri: trainingMainImage(trainingData.type) }}
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
            {userTrainingData && (
              <Text fontSize="xs" color="#000000">
                Completado el 
                {/* {(userTrainingData.date as Date).toISOString().split('T')[0]} */}
                {/* 2023-06-10T22:46:18.808000 */}
              </Text>
            )}
          </VStack>
          <VStack my={1} width={30} height={10} mr={0} ml={1}>
            {canSetFavorite && (
              <>
                <Button backgroundColor="#fff" onPress={handleFavorite}>
                  <Icon
                    as={<MaterialCommunityIcons name={isFavorite ? "heart" : "heart-outline"} />}
                    size={6}
                    color="#FF6060"
                    alignSelf="center"
                  />
                </Button>
                <Button backgroundColor="#fff" onPress={async () => { console.log("click"); }}>
                  <Icon
                    as={<MaterialCommunityIcons name={isRated ? "star" : "star-outline"} />}
                    size={6}
                    color="#FFD27D"
                    alignSelf="center"
                  />
                </Button>
              </>
            )}
          </VStack>
        </HStack>
        <Divider my={10} mx={1} />
      </Button>
    </Box>
  );
};

