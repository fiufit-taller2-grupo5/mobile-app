import React from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, Icon, useToast } from 'native-base';
import { goalsStyles } from "../../styles";
import { API } from '../../../api';
import { AntDesign } from '@expo/vector-icons';

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

  return (
    <Box backgroundColor="#fff" style={{ height: 130 }}>
      <Button
        height={170}
        px="10"
        py="10"
        backgroundColor="#fff"
        onPress={async () => {
          navigation.navigate(navigateToScreen, { goalData });
        }}
      >
        <HStack
          space={[2, 3]}
          justifyContent="space-between"
          height={70}
        >
          <Image
            source={{ uri: (goalData.multimedia && goalData.multimedia.length >= 1) ? goalData.multimedia?.at(0) : goalMainImage(goalData.type) }}
            alt="Alternate Text"
            size="lg"
            borderRadius={10}
          />
          <VStack my={1} width={220} height={10} mr={0} ml={1}>
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
          </VStack>
          <VStack my={1} width={30} height={10} mr={0} ml={1} justifyContent="flex-end" alignItems="flex-end">
            <>
              <Button backgroundColor="#fff" onPress={handleDelete} my={-60}>
                <Icon
                  as={<AntDesign name="delete" />}
                  size={5}
                  color="#FF0000"
                  alignSelf="center"
                />
              </Button>
            </>
          </VStack>
        </HStack>
        <Divider my={10} mx={1} />
      </Button>
    </Box>
  );
};

