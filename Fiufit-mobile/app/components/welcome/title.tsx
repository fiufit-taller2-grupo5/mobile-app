import { HStack, VStack, Text } from "native-base";
import { welcomeStyles } from "../../styles";

export default function Title() {
  return (
    <VStack style={welcomeStyles.verticalStack} width="full">
      <Text
        style={[welcomeStyles.text, welcomeStyles.heading1]}
        variant="heading1"
      > DESAFIA </Text>
      <HStack
        space={2}
        style={[welcomeStyles.horizontalStack, welcomeStyles.titleHorizontalStack]}
      >
        <Text
          style={[welcomeStyles.text, welcomeStyles.heading2]}
          variant="heading2"
        > TUS </Text>
        <Text
          style={[welcomeStyles.text, welcomeStyles.heading3]}
          variant="heading3"
        > LIMITES </Text>
      </HStack>
    </VStack>
  );
}
