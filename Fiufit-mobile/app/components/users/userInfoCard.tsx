import { HStack, Text, View, Spacer } from 'native-base';
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
            navigation.navigate(navigateToScreen, { userId: userData.id, isFollowed: isFollowed });
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

