import { useEffect, useState } from "react";
import { LoadableButton } from "../commons/buttons";
import { API } from "../../../api";
import globalUser from "../../../userStorage";

type FollowButtonProps = {
  userId: number;
  following: boolean;
  onFollow: (userId: number) => Promise<void>;
  onUnfollow: (userId: number) => Promise<void>;
  customStyles?: any;
  forceLoading?: boolean;
  navigation: any;
};

export const FollowButton = ({ userId, following, customStyles, forceLoading, onFollow, onUnfollow, navigation }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const api = new API(navigation);
  useEffect(() => {
    setIsFollowing(following);
  }, [following]);

  const follow = async () => {
    await onFollow(userId);
    setIsFollowing(true);
    const selfUser = await globalUser.getUser();
    api.sendPushNotification(userId, "Tienes un nuevo seguidor!", selfUser!.name + "te ha seguido");
  };

  const unfollow = async () => {
    await onUnfollow(userId);
    setIsFollowing(false);
  };


  return (
    <LoadableButton
      overrideLoading={forceLoading}
      hideTextWhileLoading={forceLoading !== undefined}
      onPress={isFollowing ? unfollow : follow}
      text={isFollowing ? "Dejar de seguir" : "Seguir"}
      textColor={isFollowing ? "#c2c0c0" : "#FF6060"}
      customStyles={{
        width: isFollowing ? 160 : 130,
        backgroundColor: "#FFFFFF",
        borderColor: "#FF6060",
        borderWidth: 1,
        ...customStyles,
      }}
    />
  );
};
