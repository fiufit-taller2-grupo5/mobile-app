import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";


interface Props {
  navigation: any;
  latitude: number;
  longitude: number;
  dateOfBirth: Date;
  weight: number;
  height: number;
  interests: string;
}

export default function SubmitButton(props: Props) {
  const { navigation, latitude, longitude, dateOfBirth, weight, height, interests } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.extraInfoButton]}
        onPress={() => {
          console.log("pass the extra information to backend y hacer chequeo de tipos");
          navigation.navigate('HomeScreen');
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Continuar
      </Button>
    </View>
  );
}