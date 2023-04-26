import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { updateUserDetails } from "../../../api";


interface Props {
  navigation: any;
  streetName: string;
  streetNumber: number;
  date: Date;
  weight: number;
  height: number;
  interests: string[];
}

export default function SubmitButton(props: Props) {
  const { navigation, streetName, streetNumber, date, weight, height, interests } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.extraInfoButton]}
        onPress={() => {
          console.log("userDetails:", { location: streetName+streetNumber.toString(10), birthDate: date.toString(), weight: weight, height: height, interests: interests });
          updateUserDetails({ location: streetName+streetNumber.toString(10), birthDate: date.toISOString(), weight: weight, height: height, interests: interests })
          navigation.navigate('HomeScreen');
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Continuar
      </Button>
    </View>
  );
}