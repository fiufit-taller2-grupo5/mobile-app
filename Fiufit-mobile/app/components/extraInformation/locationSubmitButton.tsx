import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";


interface Props {
  navigation: any;
  streetName: string;
  streetNumber: number;
}

export default function SubmitButton(props: Props) {
  const { navigation, streetName, streetNumber } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.button2]}
        disabled={streetName === "" || streetNumber === null}
        onPress={() => {
          navigation.navigate('ExtraInfoScreen', { streetName: streetName, streetNumber: streetNumber });
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Continuar
      </Button>
    </View>
  );
}