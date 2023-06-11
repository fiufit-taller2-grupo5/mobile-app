import { Button } from "native-base";
import { useEffect, useState } from "react";

interface OnlyFollowedButtonProps {
  onPress: () => void;
  onlyFollowed: boolean;
}

export const OnlyFollowedButton = ({
  onPress,
  onlyFollowed,
}: OnlyFollowedButtonProps) => {
  const [onlyFollowedState, setOnlyFollowedState] = useState(false);

  useEffect(() => {
    setOnlyFollowedState(onlyFollowed);
  }, [onlyFollowed]);
  
  console.log("onlyFollowedState", onlyFollowedState);
  return (
    <Button
      variant="outline"
      colorScheme={onlyFollowedState ? "primary" : "secondary"}
      size="sm"
      _text={{
        color: onlyFollowedState ? "primary.500" : "secondary.500",
        fontWeight: "bold",
      }}
      onPress={() => {
        // setOnlyFollowedState(!onlyFollowedState);
        onPress();
      }}
    >
      {onlyFollowedState ? "Show all users" : "Show only followed" }
    </Button>
  );
};
