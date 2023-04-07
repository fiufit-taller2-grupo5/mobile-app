import { Center, Text } from "native-base";
import { welcomeStyles } from "../../styles";


export default function Paragraph() {
  return (
    <Center width='xs'>
      <Text style={[welcomeStyles.text, welcomeStyles.paragraph]} variant="paragraph">
        Realizá un seguimiento de tus entrenamientos, obtén mejores resultados y sé la mejor versión de ti mismo.
      </Text>
    </Center>
  );
}