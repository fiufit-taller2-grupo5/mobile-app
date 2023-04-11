import { Box, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";


interface Props {
  navigation: any;
  clearFields: () => void;
}

export default function MoveToApp(props: Props) {
  const { navigation, clearFields } = props;

  return (
    <Box alignItems="center">
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.extraInfoLink]}
        isUnderlined={false}
        onPress={() => {
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