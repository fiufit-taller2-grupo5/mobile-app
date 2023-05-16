import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  NativeBaseProvider,
  Spacer,
  Text,
  VStack,
  extendTheme,
} from "native-base";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { rateTrainingStyles } from "../styles";
import { addTrainingReview } from "../../api";
import FiveStars from "../components/rateTraining/fiveStars";

const theme = extendTheme({
  components: {
    Box: {
      defaultProps: {
        bg: "#FFFFFF",
      },
    },
  },
});

export type trainingReview = {
  id?: number; // only for listing reviews on trainingCard
  comment: string;
  score: number;
};

export default function RateTrainingScreen({ route, navigation }: any) {
  // TODO: get training Id from route params
  const { trainingId } = route.params;
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false); // TODO: use this to show a loading indicator
  const [starClicked, setStarClicked] = useState(0);

  const handleComment = (text: string) => {
    setComment(text);
  };

  const handleRateTraining = async () => {
    setIsLoading(true);
    console.log(
      "rate training: " +
        trainingId +
        " with rating: " +
        starClicked +
        " and comment: " +
        comment
    );
    const response = await addTrainingReview(trainingId, {
      comment: comment,
      score: starClicked,
    });
    //TODO handle empty comment or rating
    setIsLoading(false);
    // if (response) {
    navigation.goBack();
    // }
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Box height="250" style={rateTrainingStyles.starRatingBox}>
        <VStack space={6} alignItems="center">
          <Heading
            fontSize="2xl"
            fontWeight="bold"
            style={rateTrainingStyles.heading}
          >
            Valorar entrenamiento
          </Heading>
          <Spacer size={"1%"} />
          <Text fontSize="xl" fontWeight="bold">
            Puntuación
          </Text>
          <HStack space={4} alignItems="center">
            <FiveStars
              starClicked={starClicked}
              setStarClicked={setStarClicked}
              areButtons={true}
            />
          </HStack>
          <Spacer/>
        </VStack>
      </Box>
      <Box height="100" style={rateTrainingStyles.commentInputBox}>
        <Text fontSize="xl" fontWeight="bold" style={{left:"5%", top:"5%"}}>
          Comentario
        </Text>
        <Input
          width="90%"
          height="300"
          backgroundColor="#FFFFFF"
          top="10%"
          alignSelf="center"
          onChangeText={handleComment}
        />
        <Button
          backgroundColor="#fff"
          size={10}
          maxW={360}
          width={320}
          top={"15%"}
          borderRadius="10px"
          alignSelf="center"
          onPress={handleRateTraining}
        >
          <HStack alignItems="center" space={3}>
            <AntDesign name="star" size={30} color="#FFD27D" />
            <Text fontWeight="400">Valorar entrenamiento</Text>
          </HStack>
        </Button>
      </Box>
    </NativeBaseProvider>
  );
}
