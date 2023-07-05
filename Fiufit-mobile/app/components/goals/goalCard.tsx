import * as React from "react";
import {
  Image,
  Text,
  AspectRatio,
  Box,
  Stack,
  Heading,
  HStack,
  Button,
  View,
  ScrollView,
} from "native-base";
import { API, Goal } from "../../../api";
import { useState } from "react";
import { RefreshControl } from "react-native";
import { LoadableButton } from "../commons/buttons";
import { authorizeAndGetGoogleFitStepsCaloriesAndDistance } from "../../screens/profile";
import * as Progress from 'react-native-progress';

interface Props {
  navigation: any;
  goalData: Goal;
}

export default function GoalCard(props: Props) {
  const { navigation, goalData } = props;

  const api = new API(navigation);

  const [dailySteps, setDailySteps] = useState(0);
  const [dailyDistance, setDailyDistance] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log("goalData", goalData)

  const goalMainImage = (goalType: any) => {
    if (goalType === "Distancia")
      return "https://wallpaperaccess.com/thumb/2604779.jpg";
    else if (goalType === "Pasos")
      return "https://wallpaperaccess.com/thumb/8657563.jpg";
    else if (goalType === "Calorias")
      return "https://wallpaperaccess.com/thumb/2443634.jpg";
  };

  const updateActivityData = async () => {
    setIsRefreshing(true);
    const { steps, distance, calories } = await authorizeAndGetGoogleFitStepsCaloriesAndDistance();
    setDailySteps(steps);
    setDailyDistance(distance);
    setDailyCalories(calories);
    setIsRefreshing(false);

  }

  React.useEffect(() => {
    updateActivityData();
  }, []);

  const metricSuffix = (metric: string): string => {
    switch (metric) {
      case "Pasos":
        return "pasos";
      case "Distancia":
        return "m";
      case "Calorias":
        return "kcal";
    }
    return "";
  }


  const currentValue = () => {
    switch (goalData.type) {
      case "Pasos":
        return Number.parseFloat(dailySteps.toFixed(0));
      case "Distancia":
        return Number.parseFloat(dailyDistance.toFixed(1));
      case "Calorias":
        return Number.parseFloat(dailyCalories.toFixed(0));
    }
    return 0;
  }
  return (
    <View flexGrow={1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={updateActivityData} />
        }
      >
        <Box
          rounded="2xl"
          overflow="hidden"
          borderColor="coolGray.300"
          borderWidth="1"
          margin={3}
        >
          <View >
            <AspectRatio w="100%" ratio={16 / 10}>
              <Image
                source={(goalData.multimedia && goalData.multimedia.length >= 1) ? { uri: goalData.multimedia.at(0) } : { uri: goalMainImage(goalData.type) }}
                alt="image"
                size={238}
                width="100%"
              />
            </AspectRatio>
          </View>
          <Stack p="4" space={3}>
            <HStack space={2}>
              <Heading size="md" ml="-1">
                {goalData.title}
              </Heading>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Métrica: </Text>
                <Text>{goalData.type}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Objetivo: </Text>
                <Text>{goalData.metric} {metricSuffix(goalData.type)}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Descripción: </Text>
                <Text>{goalData.description}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Progreso: </Text>
                <View marginLeft={2} marginRight={2} justifyContent="center">
                  <Progress.Bar progress={currentValue() / goalData.metric} color="#ff6060" width={200} height={10} borderRadius={6} />
                </View>
                <Text fontWeight={"bold"}> {currentValue()} / {goalData.metric} </Text>
              </HStack>
            </HStack>
          </Stack>
          <LoadableButton customStyles={{
            backgroundColor: "#FF6060",
            width: "50%",
            borderRadius: 30,
            left: "22%",
            bottom: "2%",
            marginTop: 20,
          }}
            text={"Editar"}
            onPress={async () => navigation.navigate("EditGoalScreen", { goalData: goalData })}
          />
        </Box>
      </ScrollView>
    </View>
  );
}
