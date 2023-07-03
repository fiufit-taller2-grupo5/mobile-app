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
import { RefreshControl, ActivityIndicator } from "react-native";
import { trainingReview } from "../../screens/rateTraining";
import FiveStars from "../rateTraining/fiveStars";
import globalUser from '../../../userStorage';
import { LoadableButton } from "../commons/buttons";
import { ShareButton } from "./shareButton";


interface Props {
  navigation: any;
  trainingData: Training;
  userLatitude: number;
  userLongitude: number;
}

export default function TrainingCard(props: Props) {
  const { navigation, trainingData, userLatitude, userLongitude } = props;

  const api = new API(navigation);

  const [reviews, setReviews] = useState<trainingReview[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [distance, setDistance] = useState("No disponible");
  const [userLatitudeSet, setUserLatitude] = useState(0);
  const [userLongitudeSet, setUserLongitude] = useState(0);

  const shareTitle = "Entrenamiento: " + trainingData.title;
  const shareMessage =
    "¡Hola! Te comparto este entrenamiento de Fiufit: *" + trainingData.title + "*\n\n" +
    "*Descripción*: " +
    trainingData.description + "\n\n" +
    "*Horarios*: " + trainingData.days + " a las " + trainingData.start + "-" + trainingData.end +
    "\n\n*Ubicación*: " + trainingData.location
    + "\n\n¡Descarga Fiufit y entrena conmigo!";

  const retrieveTrainingReviews = async () => {
    const trainingReviews = await api.getTrainingReviews(trainingData.id);
    // map the training reviews to add an index to each review
    const trainingReviewsWithIndex = trainingReviews.map(
      async (review: any, index: number) => {
        const user = await api.getUserInfoById(review.userId);
        return { ...review, index: index, user: user };
      }
    );
    const trainingReviewsWithIndexResolved = await Promise.all(
      trainingReviewsWithIndex
    );
    setReviews(trainingReviewsWithIndexResolved);
  };


  const getUserLocation = async () => {
    if (userLatitude && userLatitude !== 0 || userLongitude && userLongitude !== 0) {
      return [userLatitude, userLongitude];
    }
    if (!globalUser.user) {
      return;
    }
    try {
      const user = await api.getUserInfoById(globalUser.user.id);
      console.log("USER is: ", user);
      if (user) {
        const userLocation = user.location;
        if (userLocation) {
          const coordinates = await api.getCoordinates(userLocation);
          console.log("USER COORS: ", coordinates);
          setUserLatitude(coordinates[0]);
          setUserLongitude(coordinates[1]);
          return coordinates;
        }
      }
    }
    catch (e) {
      console.log("Error getting user location: ", e);
    }
  }

  const deg2rad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = async (lat: number, lon: number) => {
    if (userLatitude === 0 || userLongitude === 0) {
      const coordinates = await getUserLocation();
      setUserLatitude(coordinates[0]);
      setUserLongitude(coordinates[1]);
      if (!coordinates) {
        return "No disponible";
      }
    } else {
      setUserLatitude(userLatitude);
      setUserLongitude(userLongitude);
    }
    if (lat === 0 || lon === 0) {
      return "No disponible";
    }
    const R = 6371;
    const dLat = deg2rad(lat - userLatitude);
    const dLon = deg2rad(lon - userLongitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userLatitude)) * Math.cos(deg2rad(lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceCalc = (R * c) / 1000;
    setDistance(distanceCalc.toPrecision(5).toString());
    return distanceCalc.toPrecision(5).toString();
  }

  useEffect(() => {
    if (trainingData.latitude && trainingData.longitude) {
      const coordinates = [parseFloat(trainingData.latitude), parseFloat(trainingData.longitude)];
      const distance = getDistanceFromLatLonInKm(coordinates[0], coordinates[1]);
      distance.then((distance) => {
        setDistance(distance);
      });
    }
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
  const isTrainer = role === 'Entrenador';

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
                source={(trainingData.multimedia && trainingData.multimedia.length >= 1) ? { uri: trainingData.multimedia.at(0).fileUrl } : require("../../../assets/images/logo-color.jpg")}
                alt="image"
                size={238}
                width="100%"
              />
            </AspectRatio>
          </View>
          <Stack p="4" space={3}>
            <HStack space={2}>
              <Heading size="md" ml="-1">
                {trainingData.title}
              </Heading>
              <Link
                style={{ top: "3%" }}
                onPress={async () => {
                  let coordinates = [];
                  if (!trainingData.latitude || !trainingData.longitude) {
                    coordinates = await api.getCoordinates(trainingData.location);
                  } else {
                    coordinates = [parseFloat(trainingData.latitude), parseFloat(trainingData.longitude)];
                  }
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
            <HStack alignItems="center">
              <Text fontWeight={"bold"}>Distance in km: </Text>
              <Text>{distance}</Text>
            </HStack>
            <Text fontWeight={"bold"}>Descripción: </Text>
            <Text>{trainingData.description}</Text>
            <Text fontWeight={"bold"}>Horarios: </Text>
            <HStack>
              <Text>{trainingData.days} a las </Text>
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
              height: 45,
              marginBottom: 10,
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
        <Divider my={1} />
        <HStack flex={1} flexDirection="row" justifyContent={"space-between"}>
          <Heading marginTop={5} size="sm" color={"gray.500"} marginLeft={3}>
            Valoraciones
          </Heading>
        </HStack>
        {isRefreshing && <ActivityIndicator
          size="large"
          color="#FF6060"
        />}
        {!isRefreshing && reviews.map(review => (
          <Box
            key={review.id}
            rounded="sm"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            marginLeft={3}
            marginRight={3}
            margin={2}
            paddingX={2}
            paddingY={2}
          >
            <Stack p="4" space={0}>
              <Link
                _text={{ fontWeight: "bold" }}
                isUnderlined={false}
                onPress={() => navigation.navigate("ProfileScreen", { userId: review.userId })}
              >
                {(review as any).user.name}
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
      {isTrainer && <Button style={{
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
      {isTrainer && <Button style={{
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
      {isAthlete && <LoadableButton customStyles={{
        right: -185,
        bottom: 20,
        width: 210,
        // add shadows
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,

      }}

        text="Agregar valoración"
        onPress={() => navigation.navigate("RateTrainingScreen", { trainingId: trainingData.id })}
      />}

    </View>
  );
}
