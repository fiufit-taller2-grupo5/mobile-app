import { Box, HStack, Pressable, VStack, Text, Spacer, Badge } from "native-base";
import { API, Notification } from '../../../api';
import { Avatar } from "react-native-gifted-chat";

interface NotificationProps {
    notification: Notification;
}

export const NotificationInfoCard = ({
    notification,
}: NotificationProps) => {

    return (
        <Box>
            <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                    {/* <Avatar currentMessage={notification as any} /> */}
                    <VStack>
                        <Text
                            color="coolGray.800"
                            bold
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ maxWidth: 200 }} // you may adjust this as needed
                        >
                            {notification.title}
                        </Text>
                        <Text
                            color="coolGray.600"
                            numberOfLines={2} // change this to limit the number of lines
                            style={{ width: 200 }} // setting the width to 100
                        >
                            {notification.body}
                        </Text>
                    </VStack>
                    <Spacer />
                    {/* {
                        <VStack>

                            <Badge
                                colorScheme="danger" rounded="full" variant="solid" alignSelf="flex-end" _text={{
                                    fontSize: 8
                                }}
                                marginRight={2}
                            > </Badge>
                        </VStack>
                    } */}
                    <VStack>
                        <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start"> {new Date(notification.date).toLocaleDateString('es-ES')} </Text>

                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
};
