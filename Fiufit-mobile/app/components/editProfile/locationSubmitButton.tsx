import { View, Button } from "native-base";
import { editProfileStyles } from "../../styles";


interface Props {
  navigation: any;
  newStreetName: string;
  newStreetNumber: number;
  setterStreetName: (streetName: string) => void;
  setterStreetNumber: (streetNumber: number) => void;
}

// TODO BORRAR

export default function SubmitButton(props: Props) {
  const { navigation, newStreetName, newStreetNumber, setterStreetName, setterStreetNumber } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={editProfileStyles.button}
        onPress={() => {
          console.log("mandar el nombre al backend: ", newStreetName, newStreetNumber);
          // TODO:
          // pedirle al back la lista de la metadata y
          // mandarsela de nuevo con el nuevo valor
          // de newStreetName y newStreetNumber actualizado
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