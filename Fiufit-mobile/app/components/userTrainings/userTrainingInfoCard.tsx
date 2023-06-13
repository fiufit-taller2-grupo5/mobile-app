import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Image,
  Divider,
  Icon,
  View,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { trainingStyles } from "../../styles";
import { API, CompleteUserTraining } from "../../../api";

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

interface Props {
  userTraining: CompleteUserTraining;
  navigation: any;
  navigateToScreen: String;
}

export const UserTrainingInfoCard = (props: Props) => {
  const { userTraining, navigation, navigateToScreen } = props;

  const api = new API(navigation);

  return (
    <View backgroundColor="#fff">
      <Button
        height={170}
        px="10"
        py="10"
        justifyContent={"center"}
        backgroundColor="#fff"
        onPress={async () => {
          navigation.navigate(navigateToScreen, {
            trainingData: userTraining.trainingData,
          });
        }}
      >
        <View
          height={40}
          flexDirection="row"
          paddingTop={10}
          justifyContent={"space-evenly"}
        >
          <Image
            source={{ uri: trainingMainImage(userTraining.trainingData.type) }}
            alt="Alternate Text"
            size="lg"
            borderRadius={10}
          />
          <View
            width={80}
            flexDirection="column"
            alignItems="center"
            // justifyContent="space-evenly"
          >
            <Text
              style={trainingStyles.textTitle}
              color="#000000"
              text-align="left"
              bold
            >
              {userTraining.trainingData.title}
            </Text>
            <Text fontSize="xs" color="#000000">
              Duración de la sesión: {userTraining.duration} min
            </Text>
            <Text fontSize="xs" color="#000000">
              Pasos: {userTraining.steps}
            </Text>
            <Text fontSize="xs" color="#000000">
              Calorías: {userTraining.calories} kcal
            </Text>
            <Text fontSize="xs" color="#000000">
              Fecha: {"fechafehcafehcafehca"}
            </Text>
            <Text fontSize="xs" color="#000000">
              Distancia: {userTraining.distance} m
            </Text>
          </View>
        </View>
        <Divider my={10} mx={1} />
      </Button>
    </View>
  );
};
