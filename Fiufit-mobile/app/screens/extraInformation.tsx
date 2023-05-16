import { NativeBaseProvider, VStack, Heading, extendTheme } from "native-base";
import { loginAndRegisterStyles } from "../styles";
import { useState } from "react";
import ExtraInformationForm from "../components/extraInformation/extraInfomationForm";
import SubmitButton from "../components/extraInformation/submitButton";
import MoveToApp from "../components/extraInformation/moveToApp";



export default function ExtraInformationScreen({ navigation, route }: any) {
  const { streetName, streetNumber } = route.params ?? {};

  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          background: "#FF6060",
        }
      },
      Heading: {
        defaultProps: {
          color: '#FF6060',
        }
      }
    }
  });

  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(150);
  const [interests, setInterests] = useState<string[]>([]);

  const clearFields = () => {
    setDate(new Date());
    setWeight(50);
    setHeight(150);
    setInterests([]);
  }
  console.log('info:', streetName, streetNumber, date, weight, height, interests);
  return <NativeBaseProvider theme={theme}>
    <VStack
      space={6}
      style={loginAndRegisterStyles.stack}
      height={"full"}
      width={"full"}
      top="-10%"
    >
      <Heading
        mt={"10"}
        mb={"10"}
        style={[loginAndRegisterStyles.heading, loginAndRegisterStyles.extraInfoHeading]}
      >
        Brindanos más información!
      </Heading>
      <ExtraInformationForm
        date={date}
        setDate={setDate}
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        interests={interests}
        setInterests={setInterests}
      />
      <SubmitButton
        navigation={navigation}
        streetName={streetName}
        streetNumber={streetNumber}
        date={date}
        weight={weight}
        height={height}
        interests={interests}
      />
      <MoveToApp
        navigation={navigation}
        streetName={streetName}
        streetNumber={streetNumber}
        clearFields={clearFields}
      />
    </VStack>
  </NativeBaseProvider>;
}
