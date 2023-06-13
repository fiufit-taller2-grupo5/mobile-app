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

    const otherParticipantId = Object.keys(chatMetadata.participants).find(id => id !== globalUser!.user!.id.toString());
    const currentMessageForAvatar = {
        _id: chatMetadata.lastMessage._id,
        text: chatMetadata.lastMessage.text,
        user: {
            _id: otherParticipantId,
            name: chatMetadata.participants[otherParticipantId!].name
        }
    }

    return (
        <Box>
            <Pressable onPress={async () => {
                navigation.navigate(navigateToScreen, { chatMetadata });
            }} bg='white'>
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar currentMessage={currentMessageForAvatar as any} />
                        <VStack>
                            <Text color="coolGray.800" bold> {chatMetadata.participants[otherParticipantId!].name} </Text>
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