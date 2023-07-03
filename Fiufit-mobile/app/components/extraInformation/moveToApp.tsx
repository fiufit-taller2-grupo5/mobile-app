import { Box, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import globalUser from "../../../userStorage";
import { API } from "../../../api";


interface Props {
  navigation: any;
  streetName: string;
  streetNumber: number;
  clearFields: () => void;
}

export default function MoveToApp(props: Props) {
  const { navigation, streetName, streetNumber, clearFields } = props;
  const api = new API(navigation);

  return (
    <Box alignItems="center">
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.extraInfoLink]}
        isUnderlined={false}
        onPress={async () => {
          await api.updateUserMetadata({ location: streetName + ' ' + streetNumber.toString(10), interests: [] });
          navigation.navigate('HomeScreen');
          clearFields();
        }}
        _text={{ color: "#FF6060", fontSize: "20px", fontWeight: "medium" }}
      >
        Omitir
      </Link>
    </Box>
  );
}