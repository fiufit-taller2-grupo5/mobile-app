import { Avatar, Box, HStack, Pressable, VStack, Text, Spacer } from "native-base";
import { API } from '../../../api';

export const InboxInfoCard = ({
    messageData,
    navigation,
    navigateToScreen
  }: any) => {
    const api = new API(navigation);
    return (
    <Box>
        <Pressable onPress={async () => {
            navigation.navigate(navigateToScreen, { messageData });
            }} bg= 'white'>
            <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
                <Avatar size="48px" source={{ uri: messageData.avatarUrl }} />
                <VStack>
                <Text color="coolGray.800" bold> {messageData.fullName} </Text>
                <Text color="coolGray.600"> {messageData.recentText} </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start"> {messageData.timeStamp} </Text>
            </HStack>
            </Box>
        </Pressable>
    </Box>
    );
};