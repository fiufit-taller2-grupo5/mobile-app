import * as React from "react";
import {
  Image,
  Text,
  NativeBaseProvider,
  AspectRatio,
  Box,
  Center,
  Stack,
  Heading,
  HStack,
  Button,
  VStack,
  FlatList,
  Spacer,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Training, getTrainingReviews } from "../../../api";
import { trainingReview } from "../../screens/rateTraining";
import FiveStars from "../rateTraining/fiveStars";

interface Props {
  navigation: any;
  trainingData: Training;
}

export default function TrainingCard(props: Props) {
  const { navigation, trainingData } = props;
  const [reviews, setReviews] = React.useState<trainingReview[]>([]);

  const retrieveTrainingReviews = async () => {
    const trainingReviews = await getTrainingReviews(trainingData.id);
    // map the training reviews to add an index to each review
    const trainingReviewsWithIndex = trainingReviews.map(
      (review: any, index: number) => {
        return { ...review, index: index };
      }
    );
    setReviews(trainingReviewsWithIndex);
  };

  React.useEffect(() => {
    retrieveTrainingReviews();
  }, []);

  return (
    <Box alignItems="center" backgroundColor="#fff">
      <Box
        maxW="1000"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
      >
        <Box>
          <Button
            backgroundColor="#fff"
            size={10}
            maxW={50}
            borderRadius="10px"
            alignSelf="stretch"
            onPress={async () => {
              navigation.navigate("HomeScreen");
            }}
          >
            <AntDesign name="arrowleft" size={25} color="#000000" />
          </Button>
          <AspectRatio w="100%" ratio={16 / 10}>
            <Image
              source={require("../../../assets/images/logo-color.jpg")}
              alt="image"
              size={200}
              minW={400}
            />
          </AspectRatio>
          <Center
            bg="#f6685e"
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            TRAINING PLAN
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {trainingData.title}
            </Heading>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text>Tipo de entrenamiento: {trainingData.type}</Text>
            </HStack>
          </HStack>
          <Text fontWeight="400">Rutina del plan de entrenamiento</Text>
        </Stack>
        <VStack space={8} alignItems="center" my={4}>
          <Button
            backgroundColor="#fff"
            size={10}
            maxW={360}
            width={320}
            borderRadius="10px"
            alignSelf="center"
            onPress={async () => {
              navigation.navigate("RateTrainingScreen", {
                trainingId: trainingData.id,
              });
            }}
          >
            <HStack alignItems="center" space={3}>
              <AntDesign name="star" size={30} color="#FFD27D" />
              <Text fontWeight="400">Valorar entrenamiento</Text>
            </HStack>
          </Button>
          <Text fontWeight="400">Valoraciones</Text>
          <Box width={320} height={200} backgroundColor="#fff">
            <FlatList
              data={reviews}
              renderItem={({ item }) => (
                <Box
                  backgroundColor="#fff"
                  width={320}
                  height={100}
                  borderRadius="10px"
                  borderWidth="1"
                  borderColor="coolGray.200"
                  my={2}
                >
                  <HStack alignItems="center" space={8}>
                    <HStack alignItems="center" space={1}>
                      <FiveStars
                        starClicked={item.score}
                        setStarClicked={undefined} // stars not clickable
                        areButtons={false}
                        size={15}
                      />
                    </HStack>
                    <Text fontWeight="400">{item.comment}</Text>
                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.id!.toString()}
            ></FlatList>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
