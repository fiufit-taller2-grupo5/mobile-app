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
      const allScopes: string[] = Object.values(Scopes);
      const options = {
        scopes: allScopes as Scopes[],
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
      try {
        let res = await GoogleFit.getWeeklySteps(new Date((Date.now() - 1 * 24 * 60 * 60 * 1000)));
        let estimated = res.find(results => results.source === "com.google.android.gms:estimated_steps");
        console.log(estimated?.steps);
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