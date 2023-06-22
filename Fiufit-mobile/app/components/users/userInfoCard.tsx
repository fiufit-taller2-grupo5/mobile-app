import { HStack, Text, View, Spacer, Image } from 'native-base';
import { trainingStyles } from "../../styles";
import { API } from '../../../api';
import { userInfo } from '../../../asyncStorageAPI';
import { FollowButton } from './followButton';


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

  return (
    <View

      style={{ width: "100%", paddingHorizontal: 15, paddingVertical: 10 }} flexDirection="row" >

      <View
        alignItems={"center"}
        justifyContent="space-between"
        onTouchEnd={async () => {
          navigation.navigate(navigateToScreen, { userId: userData.id, isFollowed: isFollowed });
        }}
      >
        <Image
          source={{ uri: "https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg" }}
          alt="Alternate Text"
          size="sm"
          borderRadius={10}
        />
      </View>
      <View
        onTouchEnd={async () => {
          navigation.navigate(navigateToScreen, { userId: userData.id, isFollowed: isFollowed });
        }}
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
          54 Trainings
        </Text>
      </View>
      <Spacer />
      <FollowButton
        userId={userData.id}
        following={isFollowed}
        onFollow={() => onFollow()}
        onUnfollow={() => onUnfollow()}
      />
    </View>
  );
};

