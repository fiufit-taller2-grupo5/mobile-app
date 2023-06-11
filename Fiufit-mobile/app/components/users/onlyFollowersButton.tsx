import { Button } from "native-base";
import { useEffect, useState } from "react";

interface OnlyFollowersButtonProps {
  onPress: () => void;
  onlyFollowers: boolean;
}

export const OnlyFollowersButton = ({
  onPress,
  onlyFollowers,
}: OnlyFollowersButtonProps) => {
  const [onlyFollowersState, setOnlyFollowersState] = useState(false);

  useEffect(() => {
    setOnlyFollowersState(onlyFollowers);
  }, [onlyFollowers]);

  return (
    <Button
      variant="outline"
      colorScheme={onlyFollowersState ? "secondary" : "primary"}
      size="sm"
      _text={{
        color: onlyFollowersState ? "secondary.500" : "primary.500",
        fontWeight: "bold",
      }}
      onPress={() => {
        setOnlyFollowersState(!onlyFollowersState);
        onPress();
      }}
    >
      {onlyFollowersState ? "Only followers" : "All users"}
    </Button>
  );
};
