import { Box, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";


interface Props {
  navigation: any;
  setLocation: (location: string) => void;
  setAge: (age: string) => void;
  setWeight: (weight: string) => void;
  setHeight: (height: string) => void;
  setInterests: (interests: string) => void;
}

export default function MoveToApp(props: Props) {
  const { navigation, setLocation, setAge, setWeight, setHeight, setInterests } = props;

  return (
    <Box alignItems="center">
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.extraInfoLink]}
        isUnderlined={false}
        onPress={() => {
          navigation.navigate('HomeScreen');
          setLocation("");
          setAge("");
          setWeight("");
          setHeight("");
          setInterests("");
        }}
        _text={{color: "#FF6060", fontSize: "20px", fontWeight: "medium"}}
      >
       Omitir
      </Link>
    </Box>
  );
}