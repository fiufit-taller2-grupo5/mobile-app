import React, { useState } from 'react';
import { Box, VStack, HStack, Button, Text, Image, Divider, View, Spacer } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { trainingStyles } from "../../styles";
import { API } from '../../../api';
import { userInfo } from '../../../asyncStorageAPI';
import { FollowButton } from './followButton';

const mainImage = (training_type: any) => {
  if (training_type === "Running")
    return "https://wallpaperaccess.com/thumb/2804922.jpg";
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
    <View style={{ height: 80, width: "100%", paddingHorizontal: 10 }} justifyContent="center" alignItems={"center"}>

      <HStack>
        <Text
          style={trainingStyles.textTitle}
          text-align="left"
          bold

          onPress={async () => {
            console.log("xd")
            navigation.navigate(navigateToScreen, { userId: userData.id });
          }}
        >
          {userData.name}
        </Text>
        <Spacer />
        <FollowButton
          userId={userData.id}
          following={isFollowed}
          onFollow={() => onFollow()}
          onUnfollow={() => onUnfollow()}
        />
      </HStack>
    </View>
  );
};

