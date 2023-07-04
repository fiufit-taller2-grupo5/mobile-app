import { Text, View, Spacer, Image } from 'native-base';
import { trainingStyles } from "../../styles";
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
          source={(userData.UserMetadata && userData.UserMetadata.multimedia && userData.UserMetadata.multimedia.length >= 1) ? { uri: userData.UserMetadata.multimedia.at(-1).url } : require("../../../assets/images/user_logo.jpg")}
          alt="image"
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
      <View flex={1} justifyContent="center" alignItems={"center"} style={{ marginRight: 45 }}>

        <FollowButton
          userId={userData.id}
          following={isFollowed}
          onFollow={() => onFollow()}
          onUnfollow={() => onUnfollow()}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

