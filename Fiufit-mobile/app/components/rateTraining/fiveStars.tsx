import { Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

interface RatingStarsProps {
  starClicked: number;
  setStarClicked: undefined | ((star: number) => void);
  areButtons: boolean;
  size?: number;
}

export default function FiveStars(props: RatingStarsProps) {
  const { areButtons, starClicked, setStarClicked, size } = props;

  const updateStarFilling = (star: number) => {
    // depending on the star clicked (out of 5), we update the color of the stars
    // if the star is clicked again, we reset the color of the stars
    if (starClicked === star) {
      setStarClicked!(0);
    } else {
      setStarClicked!(star);
    }
  };

  return <>
    <AntDesign
      key={1}
      name="star"
      size={size ? size : 30}
      color={1 <= starClicked ? "#FFD27D" : "#000000"}
      onPress={() => (areButtons ? updateStarFilling(1) : null)}
    />
    <AntDesign
      key={2}
      name="star"
      size={size ? size : 30}
      color={2 <= starClicked ? "#FFD27D" : "#000000"}
      onPress={() => (areButtons ? updateStarFilling(2) : null)}
    />
    <AntDesign
      key={3}
      name="star"
      size={size ? size : 30}
      color={3 <= starClicked ? "#FFD27D" : "#000000"}
      onPress={() => (areButtons ? updateStarFilling(3) : null)}
    />
    <AntDesign
      key={4}
      name="star"
      size={size ? size : 30}
      color={4 <= starClicked ? "#FFD27D" : "#000000"}
      onPress={() => (areButtons ? updateStarFilling(4) : null)}
    />
    <AntDesign
      key={5}
      name="star"
      size={size ? size : 30}
      color={5 <= starClicked ? "#FFD27D" : "#000000"}
      onPress={() => (areButtons ? updateStarFilling(5) : null)}
    />
  </>;
}
