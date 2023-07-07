import { Text, View, Spacer, Image } from 'native-base';
import { trainingStyles } from "../../styles";
import { userInfo } from '../../../asyncStorageAPI';
import { FollowButton } from './followButton';
import { useEffect, useState } from 'react';
import { API } from '../../../api';
import { TouchableOpacity } from 'react-native';


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
  const [trainingsQuantity, setTrainingsQuantity] = useState(0);
  const api = new API(navigation);
  useEffect(() => {
    const getTrainingsQuantity = async () => {
      const quantity = await api.getTrainingSessionsQuantity(userData.id);
      setTrainingsQuantity(quantity);
    };
    getTrainingsQuantity();
  }, []);

  return (
    <TouchableOpacity

      onPress={async () => {
        navigation.navigate(navigateToScreen, { userId: userData.id, isFollowed: isFollowed });
      }}
      style={{ width: "100%", paddingHorizontal: 15, paddingVertical: 1, flexDirection: "row" }} >

      <View
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Image
          source={(userData.UserMetadata && userData.UserMetadata.multimedia && userData.UserMetadata.multimedia.length >= 1) ? { uri: userData.UserMetadata.multimedia.at(-1).url } : require("../../../assets/images/user_logo.jpg")}
          alt="image"
          size="sm"
          borderRadius={10}
        />
      </View>
      <View
        flex={4}
        backgroundColor="gray.50"
        flexDirection="column" justifyItems={"flex-start"} justifyContent="flex-start" alignItems="flex-start" marginTop={-2}>
        <Text
          style={trainingStyles.textTitle}
          bold
          height={8}
        >
          {userData.name}
        </Text>
        <Text
          height={8}
          style={trainingStyles.textDescription}
        >
          {trainingsQuantity} Trainings
        </Text>
      </View>
      <View flex={4} backgroundColor="red.100" justifyContent="center" alignItems={"center"} style={{ paddingRight: 5 }}>
        <FollowButton
          userId={userData.id}
          following={isFollowed}
          onFollow={() => onFollow()}
          onUnfollow={() => onUnfollow()}
          navigation={navigation}
        />
      </View>
    </TouchableOpacity>
  );
};

