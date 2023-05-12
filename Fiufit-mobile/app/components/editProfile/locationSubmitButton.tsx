import { View, Button } from "native-base";
import { editProfileStyles } from "../../styles";


interface Props {
  navigation: any;
  newStreetName: string;
  newStreetNumber: number;
  setterStreetName: (streetName: string) => void;
  setterStreetNumber: (streetNumber: number) => void;
  setErrorMessage: (errorMessage: string) => void;
}

// TODO BORRAR

export default function LocationSubmitButton(props: Props) {
  const { navigation, newStreetName, newStreetNumber, setterStreetName, setterStreetNumber } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={editProfileStyles.button}
        onPress={() => {
          if (newStreetName === "" || newStreetNumber === 0) {
            props.setErrorMessage("Por favor ingrese una dirección válida");
            return;
          }
          setterStreetName("");
          setterStreetNumber(0);
          navigation.navigate('HomeScreen');
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Guardar
      </Button>
    </View>
  );
}