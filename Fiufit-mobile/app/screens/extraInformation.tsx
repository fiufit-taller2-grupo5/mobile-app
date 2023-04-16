import { NativeBaseProvider, VStack, Heading, extendTheme } from "native-base";
import { loginAndRegisterStyles } from "../styles";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import ExtraInformationForm from "../components/extraInformation/extraInfomationForm";
import SubmitButton from "../components/extraInformation/submitButton";
import MoveToApp from "../components/extraInformation/moveToApp";



export default function ExtraInformationScreen({ navigation }: any) {
  const route = useRoute();
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

  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(150);
  const [interests, setInterests] = useState("");

  const clearFields = () => {
    setStreetName("");
    setStreetNumber(0);
    setDateOfBirth(new Date());
    setWeight(50);
    setHeight(150);
    setInterests("");
  }

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
        Queremos conocerte mas!
      </Heading>
      <ExtraInformationForm
        streetName={streetName}
        setStreetName={setStreetName}
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
        setDateOfBirth={setDateOfBirth}
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        interests={interests}
        setInterests={setInterests}
        navigation={navigation}
        route={route}
      />
      <SubmitButton
        navigation={navigation}
        streetName={streetName}
        streetNumber={streetNumber}
        dateOfBirth={dateOfBirth}
        weight={weight}
        height={height}
        interests={interests}
      />
      <MoveToApp
        navigation={navigation}
        clearFields={clearFields}
      />
    </VStack>
  </NativeBaseProvider>;
}