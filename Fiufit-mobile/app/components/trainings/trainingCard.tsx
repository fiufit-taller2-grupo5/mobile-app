import * as React from "react";
import {
  Image,
  Text,
  AspectRatio,
  Box,
  Stack,
  Heading,
  HStack,
  Button,
  View,
  ScrollView,
  Divider,
  Link
} from "native-base";
import { API, Training } from "../../../api";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { trainingReview } from "../../screens/rateTraining";
import FiveStars from "../rateTraining/fiveStars";
import globalUser from '../../../userStorage';
import { LoadableButton } from "../commons/buttons";
import { ShareButton } from "./shareButton";


interface Props {
  navigation: any;
  trainingData: Training;
}

export default function TrainingCard(props: Props) {
  const { navigation, trainingData } = props;

  const api = new API(navigation);

  const [reviews, setReviews] = useState<trainingReview[]>([]);
  const [userReview, setUserReview] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const shareTitle = "Entrenamiento: " + trainingData.title;
  const shareMessage = 
    "¡Hola! Te comparto este entrenamiento de Fiufit: " + trainingData.title + ".\n\n" + 
    trainingData.description + ".\n\n" +  
    "Horarios: " + trainingData.days + ": " + trainingData.start + "-" + trainingData.end
    + "\n\n¡Descarga Fiufit y entrena conmigo!";

  const retrieveTrainingReviews = async () => {
    const trainingReviews = await api.getTrainingReviews(trainingData.id);
    // map the training reviews to add an index to each review
    const trainingReviewsWithIndex = trainingReviews.map(
      (review: any, index: number) => {
        return { ...review, index: index };
      }
    );
    setReviews(trainingReviewsWithIndex);
    retrieveUsersFromReviews();
  };

  const retrieveUsersFromReviews = async () => {
    const users = await Promise.all(
      reviews.map(async (review) => {
        if (!review.userId) {
          return;
        }
        const user = await api.getUserInfoById(review.userId);
        return user;
      })
    );
    setUserReview(users);
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

  // To distinguish roles
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      async function getCurrentRole() {
        const role = await globalUser.getRole();
        setRole(role);
      }
      getCurrentRole();
    });
    return listener;
  }, [navigation]);
  const isAthlete = role === 'Atleta';


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
            <HStack space={2}>
              <Heading size="md" ml="-1">
                {trainingData.title}
              </Heading>
              <Link
                style={{left:"45%"}}
                onPress={async () => {
                  const coordinates = await api.getCoordinates(trainingData.location);
                  navigation.navigate("MapScreen", { marker_longitude: coordinates[1], marker_latitude: coordinates[0] });
                }}
              >
                Ver en mapa
              </Link>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Tipo: </Text>
                <Text>{trainingData.type}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Dificultad: </Text>
                <Text>{trainingData.difficulty}</Text>
              </HStack>
            </HStack>
            <Text fontWeight={"bold"}>Descripción: </Text>
            <Text>{trainingData.description}</Text>
            <Text fontWeight={"bold"}>Horarios: </Text>
            <HStack>
              <Text>{trainingData.days}</Text>
              <Text>:</Text>
              <Text>{trainingData.start}</Text>
              <Text>-</Text>
              <Text>{trainingData.end}</Text>
            </HStack>
          </Stack>
          {isAthlete && <LoadableButton
            text="Iniciar"
            customStyles={{
              backgroundColor: "#FF6060",
              width: "30%",
              height: "8%",
              borderRadius: 30,
              alignSelf: "center",
              top: "0%"
            }}
            onPress={async () => {
              navigation.navigate("CountdownTimerScreen", { trainingInfo: trainingData })
              return;
            }}
          />}
          <ShareButton title={shareTitle} message={shareMessage} />
        </Box>
        <Divider my={2} mx={0} />
        <Heading size="sm" color={"gray.500"} marginLeft={3} marginY={2}>
          Valoraciones
        </Heading>
        {reviews.map(review => (
          <Box
            key={review.id}
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
              <Link
                _text={{fontWeight: "bold"}}
                isUnderlined={false}
                onPress={() => navigation.navigate("UserInfoScreen", { userId: review.userId })}
              >
                {review.userId && userReview.length !== 0 ? userReview[review.userId] : "User id: " + review.userId }
              </Link>
              <View flexDirection={"row"} style={{ justifyContent: "space-between" }}>
                <View width="80%">
                  <Text marginRight={0}>{review.comment}</Text>
                </View>
                <View flexDirection={"column"} justifyContent="center">
                  <View flexDirection={"row"}>
                    <FiveStars
                      starClicked={review.score}
                      setStarClicked={undefined} // stars not clickable
                      areButtons={false}
                      size={15}
                    />
                  </View>
                </View>
              </View>

            </Stack>
          </Box>
        ))}

      </ScrollView>
      {isAthlete && <Button style={{
        backgroundColor: "#FF6060",
        width: "50%",
        borderRadius: 30,
        left: "22%",
        bottom: "5%"
      }}
        onPress={() => navigation.navigate("RateTrainingScreen", { trainingId: trainingData.id })}
      >
        Agregar valoración
      </Button>}
      {!isAthlete && <Button style={{
        backgroundColor: "#FF6060",
        width: "50%",
        borderRadius: 30,
        left: "22%",
        bottom: "5%"
      }}
        onPress={() => navigation.navigate("EditTrainingScreen", { trainingData: trainingData })}
      >
        Editar entrenamiento
      </Button>}
      
    </View>
  );
}
