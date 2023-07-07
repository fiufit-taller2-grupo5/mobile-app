import { Box, HStack, Pressable, VStack, Text, Spacer, Badge } from "native-base";
import { API } from '../../../api';
import { ChatMetadata } from "./inboxList";
import { Avatar } from "react-native-gifted-chat";
import globalUser from "../../../userStorage";
import { useEffect, useState } from "react";

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

    const [shouldShowUnreadBadge, setShouldShowUnreadBadge] = useState(false);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            try {
                const lastMessageIsFromOtherUser = chatMetadata.lastMessage.user._id !== globalUser!.user!.id;
                let [day, month, year] = chatMetadata.lastMessage.createdAt.split("/").map(Number);
                let date = new Date(year, month - 1, day);
                const lastMessageIsNotRead = (chatMetadata.participants[globalUser!.user!.id].lastRead as any).toDate() < date;
                if (lastMessageIsFromOtherUser && lastMessageIsNotRead) {
                    setShouldShowUnreadBadge(true);
                } else {
                    setShouldShowUnreadBadge(false);
                }
            } catch (error) {
                console.log(error);
            }
        });
        return unsubscribe;

    }, [navigation]);

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
                        {shouldShowUnreadBadge
                            &&
                            <VStack>

                                <Badge
                                    colorScheme="danger" rounded="full" variant="solid" alignSelf="flex-end" _text={{
                                        fontSize: 8
                                    }}
                                    marginRight={2}
                                > </Badge>
                            </VStack>
                        }
                        <VStack>
                            <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start"> {chatMetadata.lastMessage.createdAt} </Text>

                        </VStack>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    );
};