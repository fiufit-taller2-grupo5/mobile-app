import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { updateUserDetails } from "../../../userStorage";


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
        disabled={date === null || weight === null || height === null || interests.length === 0}
        onPress={() => {
          updateUserDetails({ location: streetName+streetNumber.toString(10), birthDate: date.toISOString(), weight: weight, height: height, interests: interests });
          navigation.navigate('HomeScreen');
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Continuar
      </Button>
    </View>
  );
}