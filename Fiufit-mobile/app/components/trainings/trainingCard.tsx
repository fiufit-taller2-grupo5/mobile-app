import * as React from "react";
import {
  Image,
  Text,
  AspectRatio,
  Box,
  Center,
  Stack,
  Heading,
  HStack,
  Button,
  View,
  ScrollView,
  FlatList,
  Divider
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { getTrainingReviews, Training } from "../../../api";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { trainingReview } from "../../screens/rateTraining";
import FiveStars from "../rateTraining/fiveStars";

interface Props {
  navigation: any;
  trainingData: Training;
}

export default function TrainingCard(props: Props) {
  const { navigation, trainingData } = props;


  const [reviews, setReviews] = useState<trainingReview[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  useEffect(() => {
    retrieveTrainingReviews();
  }, []);

  console.log(reviews);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await retrieveTrainingReviews();
    setIsRefreshing(false);
  }


  return (
    <View flexGrow={1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Box
          rounded="2xl"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          margin={3}
        >
          <View>
            <AspectRatio w="100%" ratio={16 / 10}>
              <Image
                source={require("../../../assets/images/logo-color.jpg")}
                alt="image"
                size={238}
                // minW={400}
                width="100%"
              />
            </AspectRatio>
            <View
              style={{
                backgroundColor: "#ff6060",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Plan de Entrenamiento
              </Text>
            </View>
          </View>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {trainingData.title}
              </Heading>
            </Stack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text>Tipo: {trainingData.type}</Text>
              </HStack>
            </HStack>
            <Text>{trainingData.description}</Text>
            <Text fontWeight="400">Rutina del plan de entrenamiento</Text>
          </Stack>
        </Box>
        <Divider my={2} mx={0} />
        <Heading size="sm" color={"gray.500"} marginLeft={3} marginY={2}>
          Valoraciones
        </Heading>
        {reviews.map(review => (
          <Box
            rounded="sm"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            marginLeft={3}
            marginRight={3}
            margin={1}
            paddingX={2}
          >
            <Stack p="4" space={0}>
              <View flexDirection={"row"} style={{ justifyContent: "space-between" }}>
                <Text>{review.comment}</Text>
                <View flexDirection={"row"}>
                  <FiveStars
                    starClicked={review.score}
                    setStarClicked={undefined} // stars not clickable
                    areButtons={false}
                    size={15}
                  />
                </View>
              </View>

            </Stack>
          </Box>
        ))}

      </ScrollView>
      <Button style={{
        backgroundColor: "#FF6060",
        width: "50%",
        borderRadius: 30,
        left: "22%",
        bottom: "5%"
      }}
        onPress={() => navigation.navigate("RateTrainingScreen", { trainingId: trainingData.id })}
      >
        Agregar valoración
      </Button>
    </View>
  );
}
