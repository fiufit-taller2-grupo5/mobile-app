import { useEffect, useState } from "react";
import { LoadableButton } from "../commons/buttons";

type FollowButtonProps = {
  userId: number;
  following: boolean;
  onFollow: (userId: number) => Promise<void>;
  onUnfollow: (userId: number) => Promise<void>;
  customStyles?: any;
  forceLoading?: boolean;
};

export const FollowButton = ({ userId, following, customStyles, forceLoading, onFollow, onUnfollow }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(following);
  }, [following]);

  const follow = async () => {
    await onFollow(userId);
    setIsFollowing(true);
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
