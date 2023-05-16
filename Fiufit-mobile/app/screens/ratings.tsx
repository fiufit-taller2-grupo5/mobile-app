import { Box, FlatList, HStack, NativeBaseProvider, Text, Heading, Button } from "native-base";
import FiveStars from "../components/rateTraining/fiveStars";
import { trainingReview } from "./rateTraining";
import { useState, useEffect } from "react";
import { getTrainingReviews } from "../../api";
import { rateTrainingStyles } from "../styles";


interface Props {
  route: any;
  navigation: any;
}

export default function RatingsScreen(props: Props) {
  const { route, navigation } = props;
  const { trainingData } = route.params;

  const [reviews, setReviews] = useState<trainingReview[]>([]);

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

  return <NativeBaseProvider>
    <Box height="100%" backgroundColor="#fff">
      <Heading style={rateTrainingStyles.heading}>
        Valoraciones
      </Heading>
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
      <Button style={{
        backgroundColor: "#FF6060",
        width: "50%",
        borderRadius:30,
        left: "22%",
        bottom:"5%"
        }}
        onPress={() => navigation.navigate("RateTrainingScreen", { trainingId: trainingData.id })}
      >
        Agregar valoración
      </Button>
    </Box>
  </NativeBaseProvider>; 
}