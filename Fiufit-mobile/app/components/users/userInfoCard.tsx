import React, { useState } from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, Icon, Spacer } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { trainingStyles } from "../../styles";
import { API } from '../../../api';
import { userInfo } from '../../../asyncStorageAPI';
import { FollowButton } from './followButton';

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

interface UserInfoCardProps {
  navigation: any;
  userData: userInfo;
  navigateToScreen: string;
  isFollowed: boolean;
  onFollow: () => Promise<void>;
  onUnfollow: () => Promise<void>;
}

export const UserInfoCard = ({
  userData,
  navigation,
  navigateToScreen,
  isFollowed,
  onFollow,
  onUnfollow,
}: UserInfoCardProps) => {

  const api = new API(navigation);

  return (
    <Box backgroundColor="#fff" style={{ height: 60 }}>
      <Button
        height={60}
        px="10"
        py="10"
        backgroundColor="#fff"
        onPress={async () => {
          navigation.navigate(navigateToScreen, { userId: userData.id });
        }}
      >
        <HStack
          space={'sm'}
          justifyContent="space-between"
          height={60}
        >
          {/* <Image
            source={{ uri: mainImage(userData.type) }}
            alt="Alternate Text"
            size="lg"
            borderRadius={10}
          /> */}
          <VStack width={"100%"} height={10} mr={0} ml={0}>
            <HStack>
            <Text
              style={trainingStyles.textTitle}
              color="#000000"
              text-align="left"
              bold
            >
              {userData.name}
            </Text>
            <Spacer />
            <FollowButton
                userId={userData.id}
                following={isFollowed}
                onFollow={ () => onFollow()}
                onUnfollow={ () => onUnfollow()}
              />
            </HStack>
            <Divider mx={1} />
          </VStack>
        </HStack>
      </Button>
    </Box>
  );
};

