import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";


interface Props {
  navigation: any;
  location: string;
  age: string;
  weight: string;
  height: string;
  interests: string;
}

export default function SubmitButton(props: Props) {
  const { navigation, location, age, weight, height, interests } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.extraInfoButton]}
        onPress={() => {
          console.log("pass the extra information to backend");
          navigation.navigate('HomeScreen');
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Continuar
      </Button>
    </View>
  );
}