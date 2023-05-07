import { VStack, Text, Button } from "native-base";
import { welcomeStyles } from "../../styles";
import Paragraph from "./paragraph";
import WelcomeImage from "./image";
import Buttons from "./buttons"
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'

export default function Body({ navigation }: any) {

  const testGoogleFit = async () => {
    await GoogleFit.checkIsAuthorized();
    console.log(GoogleFit.isAuthorized);

    if (!GoogleFit.isAuthorized) {
      const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ,
          Scopes.FITNESS_ACTIVITY_WRITE,
          Scopes.FITNESS_BODY_READ,
          Scopes.FITNESS_BODY_WRITE,
        ],
      }
      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            console.log("AUTH_SUCCESS");
          } else {
            console.log("AUTH_DENIED", authResult.message);
          }
        })
        .catch(() => {
          console.log("AUTH_ERROR");
        })
    } else {
      const opt = {
        startDate: "2023-01-01T00:00:00.000Z", // required ISO8601Timestamp
        endDate: new Date().toISOString(), // required ISO8601Timestamp
        bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1. 
      };

      try {
        let res = await GoogleFit.getDailySteps(new Date())
        console.log(res[0].steps);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <VStack
      space={5}
      style={welcomeStyles.verticalStack}
      width="full"
      alignItems="center"
      top="-3%"
    >
      <Button onTouchEnd={testGoogleFit}>hola</Button>
      <Paragraph />
      <WelcomeImage />
      <Buttons navigation={navigation} />
    </VStack>
  );
}