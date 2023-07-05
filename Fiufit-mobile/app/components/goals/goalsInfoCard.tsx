import React, { useState } from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, Icon, useToast, View } from 'native-base';
import { goalsStyles } from "../../styles";
import { API } from '../../../api';
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { authorizeAndGetGoogleFitStepsCaloriesAndDistance } from '../../screens/profile';

export const goalMainImage = (goalType: any) => {
  if (goalType === "Distancia")
    return "https://wallpaperaccess.com/thumb/2604779.jpg";
  else if (goalType === "Pasos")
    return "https://wallpaperaccess.com/thumb/8657563.jpg";
  else if (goalType === "Calorias")
    return "https://wallpaperaccess.com/thumb/2443634.jpg";
};

export const GoalsInfoCard = ({
  goalData,
  navigation,
  navigateToScreen,
  updateList,
}: any) => {

  const toast = useToast();
  const api = new API(navigation);

  const handleDelete = async () => {
    try {
      await api.deleteGoal(goalData.id);
      updateList();
    } catch (e: any) {
      toast.show({
        description: e.message,
        backgroundColor: "red.700",
        duration: 3000,
      });
    }
  }

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


  return (<>
    <View
      height={120}
      paddingTop={2}
      px="8"
      onTouchEnd={async () => {
        navigation.navigate(navigateToScreen, { goalData });
      }}
      flexDirection="row"
    >

      <Image
        source={{ uri: (goalData.multimedia && goalData.multimedia.length >= 1) ? goalData.multimedia?.at(0) : goalMainImage(goalData.type) }}
        alt="Alternate Text"
        size="lg"
        borderRadius={10}
      />
      <VStack width={200} height={10} mr={0} ml={1}>
        <Text
          style={goalsStyles.textTitle}
          color="#000000"
          text-align="left"
          bold
        >
          {goalData.title}
        </Text>
        <Text paddingLeft={15} fontSize="sm" color="#000000">
          {goalData.description}
        </Text>
        <Text paddingLeft={15} fontSize="sm" color="#000000">
          Métrica: {goalData.type}
        </Text>
        <Text paddingLeft={15} fontSize="sm" color="#000000">
          Objetivo a cumplir: {goalData.metric}
        </Text>
        <View flexDirection={"row"} paddingLeft={15}>
          <View marginRight={2} justifyContent="center">
            <Progress.Bar progress={currentValue() / goalData.metric} color="#ff6060" width={90} height={10} borderRadius={6} />
          </View>
          <Text fontWeight={"bold"}> {currentValue()} / {goalData.metric} </Text>
        </View>
      </VStack>
      <View justifyContent="center" height={"100%"}>
        <Button onPress={handleDelete} backgroundColor="red.100">
          <Icon
            as={<AntDesign name="delete" />}
            size={5}
            color="#FF0000"
            alignSelf="center"
          />
        </Button>
      </View>
    </View>
    <Divider my={1} mx={1} />
  </>
  );
};

