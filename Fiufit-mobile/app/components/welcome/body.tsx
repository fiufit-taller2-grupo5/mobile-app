import { VStack } from "native-base";
import { welcomeStyles } from "../../styles";
import Paragraph from "./paragraph";
import WelcomeImage from "./image";
import Buttons from "./buttons"


export default function Body({ navigation }: any) {
  return (
    <VStack
      space={5}
      style={welcomeStyles.verticalStack}
      width="full"
      alignItems="center"
      top="-3%"
    >
      <Paragraph />
      <WelcomeImage />
      <Buttons navigation={navigation}/>
    </VStack>
  );
}