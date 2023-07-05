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

  return <View onTouchEnd={async () => {
    navigation.navigate(navigateToScreen, { trainingData: userTraining.trainingData, });
  }}>
    <View flexDirection={"row"} marginY={2} marginX={2}>
      <Image
        source={{ uri: userTraining.trainingData.multimedia?.at(0).fileUrl || trainingMainImage(userTraining.trainingData.type) }}
        alt="Alternate Text"
        size="lg"
        style={{ marginTop: 0 }}
        borderRadius={10}
      />
      <View width={230} >
        <Text
          style={trainingStyles.textTitle}
          color="#000000"
          text-align="left"
          bold
        >
          {new Date(userTraining.date).toLocaleDateString('es-ES')}
        </Text>
        <Text paddingLeft={15} fontSize="md" color="#000000">
          {userTraining.trainingData.title}
        </Text>
        <View flexDirection={"row"} alignItems="center">
          <View flexDirection={"row"} alignItems="center" flex={1}>
            <Text paddingLeft={15} fontSize="sm" color="#000000" bold marginRight={1}>
              {userTraining.calories} calorías
            </Text>
            <Icon
              as={<MaterialCommunityIcons name="fire-circle" />}
              size={5}
              color="#ff6060"
              alignSelf="center"
            />
          </View>
          <View flexDirection={"row"} alignItems="center" flex={1}>
            <Text paddingLeft={15} fontSize="sm" color="#000000" bold marginRight={1}>
              {userTraining.steps} pasos
            </Text>
            <Icon
              as={<MaterialCommunityIcons name="run-fast" />}
              size={5}
              color="#ff6060"
              alignSelf="center"
            />
          </View>
        </View>
        <View flexDirection={"row"} alignItems="center">
          <View flexDirection={"row"} alignItems="center" flex={1}>
            <Text paddingLeft={15} fontSize="sm" color="#000000" bold marginRight={1}>
              {userTraining.steps} m
            </Text>
            <Icon
              as={<MaterialCommunityIcons name="navigation-variant-outline" />}
              size={5}
              color="#ff6060"
              alignSelf="center"
            />
          </View>
          <View flexDirection={"row"} alignItems="center" flex={1}>
            <Text paddingLeft={15} fontSize="sm" color="#000000" bold marginRight={1}>
              {userTraining.duration}
            </Text>
            <Icon
              as={<MaterialCommunityIcons name="clock-outline" />}
              size={5}
              color="#ff6060"
              alignSelf="center"
            />
          </View>
        </View>
      </View>
    </View>

    <Divider my={2} mx={1} />
  </View>
};
