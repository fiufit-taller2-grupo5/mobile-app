import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { updateUserDetails } from "../../../firebase";


interface Props {
  navigation: any;
  streetName: string;
  streetNumber: number;
  date: Date | null;
  weight: number;
  height: number;
  interests: Array<string>;
}

export default function SubmitButton(props: Props) {
  const { navigation, streetName, streetNumber, date, weight, height, interests } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.extraInfoButton]}
        onPress={() => {
          console.log("intereses", interests);
          console.log("pass the extra information to backend");
          // TODO: pasar cosas al back
          // updateUserDetails({ streetName: streetName, streetNumber: streetNumber, birthDate: dateOfBirth.toString(), weight: weight, height: height })
          navigation.navigate('HomeScreen');
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Continuar
      </Button>
    </View>
  );
}