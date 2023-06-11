import { Button } from "native-base";
import { useEffect, useState } from "react";

type FollowButtonProps = {
  userId: number;
  following: boolean;
  onFollow: (userId: number) => Promise<void>;
  onUnfollow: (userId: number) => Promise<void>;
};

export const FollowButton = ({ userId, following, onFollow, onUnfollow }:FollowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(following);
  }, [following]);

  const follow = async () => {
    setLoading(true);
    setIsFollowing(true);
    await onFollow(userId);
    setLoading(false);
  };

  const unfollow = async () => {
    setLoading(true);
    setIsFollowing(false);
    await onUnfollow(userId);
    setLoading(false);
  };


  return (
    <Button
      onPress={isFollowing ? unfollow : follow}
      isLoading={loading}
      variant="outline"
      colorScheme={isFollowing ? "secondary" : "primary"}
      size="sm"
      _text={{
        color: isFollowing ? "secondary.500" : "primary.500",
        fontWeight: "bold",
      }}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
