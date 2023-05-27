import { NativeBaseProvider, VStack, Heading, extendTheme } from "native-base";
import { loginAndRegisterStyles } from "../styles";
import { useState } from "react";
import ExtraInformationForm from "../components/extraInformation/extraInfomationForm";
import SubmitButton from "../components/extraInformation/submitButton";
import MoveToApp from "../components/extraInformation/moveToApp";
import { LoadableButton } from "../components/commons/buttons";
import { updateUserDetails } from "../../userStorage";

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
    >

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
      <LoadableButton
        text="Continuar"
        onPress={async () => {
          if (!streetName) {
            throw Error("Por favor ingresa el nombre de la calle");
          }

          if (!streetNumber) {
            throw Error("Por favor ingresa el numero de la calle");
          }

          if (!date) {
            throw Error("Por favor ingresa tu fecha de nacimiento");
          }

          if (!weight) {
            throw Error("Por favor ingresa tu peso");
          }

          if (!height) {
            throw Error("Por favor ingresa tu altura");
          }

          if (interests.length === 0) {
            throw Error("Por favor ingrese al menos un interés");
          }

          if (date.getDate() > new Date().getDate()) {
            throw Error("Por favor ingrese una fecha de nacimiento válida");
          }

          if (weight < 30) {
            throw Error("Por favor ingrese un peso válido mayor a 30kg");
          }

          if (height < 30) {
            throw Error("Por favor ingrese una altura válida mayor a 30cm");
          }

          updateUserDetails({ location: streetName + streetNumber.toString(10), birthDate: date.toISOString(), weight: weight, height: height, interests: interests });
          navigation.navigate('HomeScreen');
        }}
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
