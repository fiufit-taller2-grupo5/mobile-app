import * as React from 'react';
import { Image, Text, AspectRatio, Box, Center, Stack, Heading, HStack, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  navigation: any;
  trainingData: any;
}

export default function FavoriteTrainingCard(props: Props) {
  const { navigation, trainingData } = props;
  return <Box alignItems="center" backgroundColor="#fff" >
    <Box maxW="1000" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
      <Box>
        <Button
          backgroundColor="#fff"
          size={10} maxW={50}
          borderRadius="10px"
          alignSelf="stretch"
          onPress={async () => { navigation.navigate('HomeScreen'); }}
        >
          <AntDesign name="arrowleft" size={25} color="#000000" />
        </Button>
        <AspectRatio w="100%" ratio={16 / 10}>
          <Image source={require('../../../assets/images/logo-color.jpg')} alt="image" size={200} minW={400} />
        </AspectRatio>
        <Center bg="#f6685e" _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
          <Text>
            TRAINING PLAN
          </Text>
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            <Text>{trainingData.title}</Text>
          </Heading>
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <Text>
            Tipo de entrenamiento: {trainingData.type}
          </Text>
        </HStack>
        <Text fontWeight="400">
          Rutina del plan de entrenamiento
        </Text>
      </Stack>
    </Box>
  </Box>
};
