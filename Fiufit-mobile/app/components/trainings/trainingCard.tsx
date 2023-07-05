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
import { LoadableButton, LoadableLink } from "../commons/buttons";
import { ShareButton } from "./shareButton";
import { EmptyListComponent } from "./emptyListComponent";


export const trainingMainImage = (training_type: any) => {
  if (training_type === "Running")
    return "https://wallpaperaccess.com/thumb/2604922.jpg";
  else if (training_type === "Swimming")
    return "https://wallpaperaccess.com/thumb/1634055.jpg";
  else if (training_type === "Walking")
    return "https://wallpaperaccess.com/thumb/654835.jpg";
  else if (training_type === "Biking")
    return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else if (training_type === "Yoga")
    return "https://wallpaperaccess.com/thumb/2532294.jpg";
  else if (training_type === "Basketball")
    return "https://wallpaperaccess.com/thumb/798750.jpg";
  else if (training_type === "Football")
    return "https://wallpaperaccess.com/thumb/1813065.jpg";
  else if (training_type === "Gymnastics")
    return "https://wallpaperaccess.com/thumb/2236559.jpg";
  else if (training_type === "Dancing")
    return "https://wallpaperaccess.com/thumb/1315981.jpg";
  else if (training_type === "Hiking")
    return "https://wallpaperaccess.com/thumb/7309738.jpg";
};


export const trainingTypeFromEnglishToSpanish = (type: string) => {
  switch (type) {
    case "Running":
      return "Correr";
    case "Swimming":
      return "Natación";
    case "Biking":
      return "Ciclismo";
    case "Yoga":
      return "Yoga";
    case "Basketball":
      return "Basket";
    case "Football":
      return "Fútbol";
    case "Walking":
      return "Caminata";
    case "Gymnastics":
      return "Gimnasia";
    case "Dancing":
      return "Danza";
    case "Hiking":
      return "Escalar";

      return "No disponible"
  }
}


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
      let metadata;
      if (user && !user.location) {
        metadata = await api.getUserMetadata(globalUser.user.id);
      }
      if (user) {
        const userLocation = user.location ? user.location : metadata?.location;
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
    setDistance(distanceCalc.toPrecision(2).toString());
    return distanceCalc.toPrecision(2).toString();
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
                source={{ uri: trainingData.multimedia && trainingData.multimedia.at(0) && trainingData.multimedia?.at(0).fileUrl || trainingMainImage(trainingData.type) }}
                alt="image"
                size={238}
                width="100%"
              />
            </AspectRatio>
          </View>
          <Stack p="4" space={4}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Heading size="md">
                {trainingData.title}
              </Heading>
              <ShareButton title={shareTitle} message={shareMessage} />
            </View>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Ubicación: </Text>
                <Text style={{ marginRight: 10 }}>{trainingData.location}</Text>
                <LoadableLink
                  text={"Ver en mapa"}

                  onPress={async () => {
                    let coordinates = [];
                    if (!trainingData.latitude || !trainingData.longitude) {
                      coordinates = await api.getCoordinates(trainingData.location);
                    } else {
                      coordinates = [parseFloat(trainingData.latitude), parseFloat(trainingData.longitude)];
                    }
                    navigation.navigate("MapScreen", { marker_longitude: coordinates[1], marker_latitude: coordinates[0] });
                  }}

                />
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Tipo: </Text>
                <Text>{trainingTypeFromEnglishToSpanish(trainingData.type)}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Dificultad: </Text>
                <Text>{trainingData.difficulty}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center">
              <Text fontWeight={"bold"}>Distancia de tí: </Text>
              <Text>{distance}{distance !== "No disponible" ? " km" : ""}</Text>
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
              marginBottom: 15,
              borderRadius: 30,
              alignSelf: "center",
              top: "0%"
            }}
            onPress={async () => {
              navigation.navigate("CountdownTimerScreen", { trainingInfo: trainingData })
              return;
            }}
          />}
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
        {!isRefreshing && reviews.length === 0 && <EmptyListComponent text={"no hay valoraciones todavía. Agrega la tuya!"} />}
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
      {isTrainer && <LoadableButton
        textColor={"#FF6060"}
        customStyles={{
          right: 10,
          bottom: 20,
          width: 210,
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          borderColor: "#FF6060",
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5,

        }}

        text="Editar Entrenamiento"
        onPress={() => navigation.navigate("EditTrainingScreen", { trainingData: trainingData })}
      />}
      {isAthlete && <LoadableButton
        textColor={"#FF6060"}
        customStyles={{
          right: 10,
          bottom: 20,
          width: 210,
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          borderColor: "#FF6060",
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
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
