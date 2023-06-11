import {
  Box,
  HStack,
  Heading,
  NativeBaseProvider,
  Spacer,
  Text,
  VStack,
  View,
  extendTheme,
  TextArea,
  Modal
} from "native-base";
import { useState } from "react";
import { rateTrainingStyles } from "../styles";
import { API } from "../../api";
import ErrorMessage from '../components/form/errorMessage';
import FiveStars from "../components/rateTraining/fiveStars";
import { LoadableButton } from "../components/commons/buttons";

const theme = extendTheme({
  components: {
    Box: {
      defaultProps: {
      },
    },
  },
});

export type trainingReview = {
  id?: number; // only for listing reviews on trainingCard
  userId?: number;
  comment: string;
  score: number;
};

export default function RateTrainingScreen({ route, navigation }: any) {
  const { trainingId } = route.params;
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false); // TODO: use this to show a loading indicator
  const [starClicked, setStarClicked] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const api = new API(navigation);

  const handleComment = (text: string) => {
    setComment(text);
  };

  const handleRateTraining = async () => {
    if (starClicked === 0) {
      throw Error("Debe seleccionar una puntuación");
    }

    if (comment === "") {
      throw Error("Debe ingresar un comentario");
    }

    await api.addTrainingReview(trainingId, {
      comment: comment,
      score: starClicked,
    });
    navigation.goBack();

  };

  return (
    <NativeBaseProvider theme={theme}>
      <View flex={1} backgroundColor="#ffffff">
        <Box height="200" style={rateTrainingStyles.starRatingBox}>
          <VStack space={6} alignItems="center">
            {errorMessage &&
              <Modal
                style={{ maxHeight: "18%", height: "18%", width: "100%", top: "-1.3%" }}
                _backdrop={{ backgroundColor: "transparent" }}
                closeOnOverlayClick={true}
                onClose={() => {
                  setErrorMessage("");
                  navigation.goBack();
                }}
                isOpen={errorMessage !== ""}
              >
                <View backgroundColor={"red.200"} maxHeight="20%" width="100%">
                  <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                </View>
              </Modal>
            }
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
            <Spacer />
          </VStack>
        </Box>
        <View flex={1} flexGrow={1} justifyContent="flex-start" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Comentario
          </Text>
          <TextArea
            autoCompleteType={"off"}
            width="90%"
            backgroundColor="#FFFFFF"
            top="10%"
            alignSelf="center"
            onChangeText={handleComment}
            marginBottom="60"
          />
          <LoadableButton
            customStyles={{ backgroundColor: "#FF6060" }}
            text="Agregar Valoración"
            onPress={handleRateTraining}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
}
