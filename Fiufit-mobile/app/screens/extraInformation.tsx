import { NativeBaseProvider, VStack, Heading, extendTheme } from "native-base";
import { loginAndRegisterStyles } from "../styles";
import { useState } from "react";
import ExtraInformationForm from "../components/extraInformation/extraInfomationForm";
import SubmitButton from "../components/extraInformation/submitButton";
import MoveToApp from "../components/extraInformation/moveToApp";



export default function ExtraInformationScreen({ navigation }: any) {
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
  
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [interests, setInterests] = useState("");

  return <NativeBaseProvider theme={theme}>
    <VStack
      space={6}
      style={loginAndRegisterStyles.stack}
      height={"full"}
      width={"full"}
    >
      <Heading
        style={[loginAndRegisterStyles.heading, loginAndRegisterStyles.extraInfoHeading]}
      >
        Queremos conocerte mas!
      </Heading>
      <ExtraInformationForm
        location={location}
        setLocation={setLocation}
        age={age}
        setAge={setAge}
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        interests={interests}
        setInterests={setInterests}
      />
      <SubmitButton
        navigation={navigation}
        location={location}
        age={age}
        weight={weight}
        height={height}
        interests={interests}
      />
      <MoveToApp
        navigation={navigation}
        setLocation={setLocation}
        setAge={setAge}
        setWeight={setWeight}
        setHeight={setHeight}
        setInterests={setInterests}
      />
    </VStack>
  </NativeBaseProvider>;
}