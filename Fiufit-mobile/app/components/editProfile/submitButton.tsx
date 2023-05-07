import { View, Button } from "native-base";
import { editProfileStyles } from "../../styles";


interface Props {
  navigation: any;
  optionName: string;
  newValue: string | number | Array<string> | Date | null;
  setter: any;
  emptyValue: string | number | Array<string> | Date | null;
}

export default function SubmitButton(props: Props) {
  const { navigation, optionName, newValue, setter, emptyValue } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={editProfileStyles.button}
        onPress={() => {
          console.log("mandar el nombre al backend: ", newValue);
          // TODO:
          // pedirle al back la lista de la metadata y mandarsela de nuevo con el nuevo valor
          // de newValue actualizado
          // si el optionName es "role" no hacer esto sino que cambiarlo en el contexto
          setter(emptyValue);
          navigation.navigate('HomeScreen');
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Guardar
      </Button>
    </View>
  );
}