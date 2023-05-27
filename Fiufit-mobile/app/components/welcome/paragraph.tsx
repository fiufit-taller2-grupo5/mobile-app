import { Center, Text } from "native-base";
import { welcomeStyles } from "../../styles";


export default function Paragraph() {
  return (
    <Center width='xs'>
      <Text style={[welcomeStyles.text, welcomeStyles.paragraph, welcomeStyles.desc]} variant="paragraph">
        Entrenar nunca fue tan fácil
      </Text>
    </Center>
  );
}