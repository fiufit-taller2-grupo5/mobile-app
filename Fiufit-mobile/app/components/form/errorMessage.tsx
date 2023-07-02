import { Alert, HStack, IconButton, Stack, Text, VStack, CloseIcon } from "native-base";



interface Props {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

export default function ErrorMessage( props: Props ) {
  const { errorMessage, setErrorMessage } = props;
  if (props.errorMessage === "") return null;
  
  return (
    <Stack w="100%" maxW="400">
      <Alert w="100%" status={"error"}>
        <VStack flexShrink={1} w="100%">
          <HStack flexShrink={1} justifyContent="space-between" backgroundColor={"red.200"}>
            <HStack height={"80%"} backgroundColor={"red.200"}>
              <Alert.Icon backgroundColor={"red.200"} size={6} top={"3.5%"}/>
              <Text fontSize="lg" color="coolGray.800" flexWrap={"wrap"}>
                {errorMessage}
              </Text>
            </HStack>
            <IconButton variant="unstyled" backgroundColor={"red.200"}  _focus={{borderWidth: 0}}
              icon={<CloseIcon size="3"/>} _icon={{color: "coolGray.600"}}
              onPress={() => {setErrorMessage("");}}
            />
          </HStack>
        </VStack>
      </Alert>
    </Stack>
  );
}