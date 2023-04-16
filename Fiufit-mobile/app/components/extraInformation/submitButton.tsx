import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { updateUserDetails } from "../../../firebase";


interface Props {
  navigation: any;
  streetName: string;
  streetNumber: number;
  dateOfBirth: Date;
  weight: number;
  height: number;
  interests: string;
}

export default function SubmitButton(props: Props) {
  const { navigation, streetName, streetNumber, dateOfBirth, weight, height, interests } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.extraInfoButton]}
        onPress={() => {
          console.log("pass the extra information to backend y hacer chequeo de tipos");
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