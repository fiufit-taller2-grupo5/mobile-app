import { Alert, HStack, IconButton, Stack, Text, VStack, CloseIcon } from "native-base";



interface Props {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

export default function ErrorMessage( props: Props ) {
  const { errorMessage, setErrorMessage } = props;
  if (props.errorMessage === "") return null;
  
  return (
    <Stack space={3} w="100%" maxW="400">
      <Alert w="100%" status={"error"}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {errorMessage}
                </Text>
            </HStack>
            <IconButton variant="unstyled" _focus={{borderWidth: 0}}
              icon={<CloseIcon size="3"/>} _icon={{color: "coolGray.600"}}
              onPress={() => {setErrorMessage("");}}
            />
          </HStack>
        </VStack>
      </Alert>
    </Stack>
  );
}