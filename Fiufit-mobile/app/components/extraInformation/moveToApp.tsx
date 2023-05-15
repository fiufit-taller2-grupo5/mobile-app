import { Box, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { updateUserDetails } from "../../../userStorage";


interface Props {
  navigation: any;
  streetName: string;
  streetNumber: number;
  clearFields: () => void;
}

export default function MoveToApp(props: Props) {
  const { navigation, streetName, streetNumber, clearFields } = props;

  return (
    <Box alignItems="center">
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.extraInfoLink]}
        isUnderlined={false}
        onPress={() => {
          updateUserDetails({ location: streetName+streetNumber.toString(10), birthDate: null, weight: null, height: null, interests: [] })
          navigation.navigate('HomeScreen');
          clearFields();
        }}
        _text={{color: "#FF6060", fontSize: "20px", fontWeight: "medium"}}
      >
       Omitir
      </Link>
    </Box>
  );
}