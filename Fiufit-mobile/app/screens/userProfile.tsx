import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Image,
  Divider,
  Icon,
  extendTheme,
  NativeBaseProvider,
  View,
  Spacer,
  FlatList,
} from "native-base";
import { UserMetadata, userInfo } from "../../asyncStorageAPI";
import { API, CompleteUserTraining } from "../../api";
import { useEffect, useState } from "react";
import { editProfileStyles, userProfileStyles } from "../styles";
import { TrainingInfoCard } from "../components/trainings/trainingInfoCard";

export default function UserInfoScreen({ route, navigation }: any) {
  const theme = extendTheme({
    components: {
      Text: {
        defaultProps: {
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: "30px",
        },
      },
    },
  });
  const { userId, navigateToScreen } = route.params;
  const api = new API(route.navigation);
  const [userData, setUserData] = useState<userInfo & UserMetadata>();
  const [userTrainings, setUserTrainings] = useState<CompleteUserTraining[]>();

  useEffect(() => {
    const getUserData = async () => {
      const user = await api.getUserInfoById(userId);
      console.log(user);
      setUserData(user);
    };
    const getUserTrainings = async () => {
      const trainings = await api.getCompleteUserTrainingSessions(userId);
      setUserTrainings(trainings);
    };
    getUserData();
    getUserTrainings();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
        <Box
          style={userProfileStyles.mainBox}
        >
          <Text style={[editProfileStyles.text, {marginTop:'10%'}]}>{userData?.name}</Text>
          <HStack
            space={2}
            style={{ marginTop: "5%", marginRight: "10%", marginLeft: "10%" }}
          >
            <Text
              style={userProfileStyles.text}
              _dark={{ color: "warmGray.50" }}
              color="coolGray.800"
              bold
            >
              {"Intereses: "}
            </Text>
            <Spacer />
            <Text
              fontSize="md"
              color="coolGray.700"
              // alignSelf="flex-start"
              top={"2%"}
            >
              {userData?.interests?.join(", ")}
            </Text>
          </HStack>
          <Text style={[userProfileStyles.text, { marginTop: "7%" }]}>
            Sesiones de Entrenamiento
          </Text>
          <Box style={{ marginTop: "5%", height: "68%" }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1}}
            data={userTrainings}
            renderItem={(training) => (
              <TrainingInfoCard
                trainingData={training.item.trainingData}
                canSetFavorite={false}
                navigation={navigation}
                navigateToScreen="TrainingInfoScreen"
                userTrainingData={training.item}
              />
            )}
            keyExtractor={(training) => training.id?.toString() as string}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTrainingsList} />}
          ></FlatList>
          </Box>
        </Box>
    </NativeBaseProvider>
  );
}
