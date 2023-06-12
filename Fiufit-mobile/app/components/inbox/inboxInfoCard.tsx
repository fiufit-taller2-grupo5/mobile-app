import { Box, HStack, Pressable, VStack, Text, Spacer } from "native-base";
import { API } from '../../../api';
import { ChatMetadata } from "./inboxList";
import { Avatar } from "react-native-gifted-chat";
import globalUser from "../../../userStorage";

interface InboxInfoCardProps {
    chatMetadata: ChatMetadata;
    navigation: any;
    navigateToScreen: string;
}

export const InboxInfoCard = ({
    chatMetadata,
    navigation,
    navigateToScreen
}: InboxInfoCardProps) => {
    const api = new API(navigation);
    return (
        <Box>
            <Pressable onPress={async () => {
                navigation.navigate(navigateToScreen, { chatMetadata });
            }} bg='white'>
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar currentMessage={chatMetadata.lastMessage as any} />
                        <VStack>
                            <Text color="coolGray.800" bold> {chatMetadata.lastMessage.user.name} </Text>
                            <Text color="coolGray.600"> {chatMetadata.lastMessage.text} </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start"> {chatMetadata.lastMessage.createdAt} </Text>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    );
};