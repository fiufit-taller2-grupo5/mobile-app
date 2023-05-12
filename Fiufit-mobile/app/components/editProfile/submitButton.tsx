import { View, Button } from "native-base";
import { editProfileStyles } from "../../styles";


interface Props {
  navigation: any;
  optionName: string;
  newValue: string | number | Array<string> | Date | null;
  setter: any;
  emptyValue: string | number | Array<string> | Date | null;
  setErrorMessage: (errorMessage: string) => void;
}

export default function SubmitButton(props: Props) {
  const { navigation, optionName, newValue, setter, emptyValue } = props;

  const getErrorDescription = (optionName: string) => {
    switch (optionName) {
      case "weight":
        return "Por favor ingrese un peso válido";
      case "height":
        return "Por favor ingrese una altura válida";
      case "birthdate":
        return "Por favor ingrese una fecha válida";
      case "location":
        return "Por favor ingrese una dirección válida";
      case "interests":
        return "Por favor ingrese al menos un interés";
      default:
        return "Por favor ingrese un valor válido";
    }
  };
      

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={editProfileStyles.button}
        onPress={() => {
          if (newValue === emptyValue) {
            props.setErrorMessage(getErrorDescription(optionName));
            return;
          }
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