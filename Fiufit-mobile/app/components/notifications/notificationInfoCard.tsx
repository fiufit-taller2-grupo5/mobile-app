import { Box, HStack, VStack, Text, Spacer, View, Image } from "native-base";
import { Notification } from "../../../api";

interface NotificationProps {
  notification: Notification;
}

export const NotificationInfoCard = ({ notification }: NotificationProps) => {
  console.log("notification", notification.fromUserId, notification.userId)
  return (
    <Box>
      <Box pl="4" pr="5" py="2">
        <HStack alignItems="center" space={3}>
          {notification.userId !== notification.fromUserId && (
            <View
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Image
                source={
                  notification.sender?.UserMetadata &&
                    notification.sender?.UserMetadata.multimedia &&
                    notification.sender?.UserMetadata.multimedia.length >= 1
                    ? { uri: notification.sender?.UserMetadata.multimedia.at(-1)?.url }
                    : require("../../../assets/images/user_logo.jpg")
                }
                alt="image"
                size="sm"
                borderRadius={10}
              />
            </View>
          )}
          {notification.userId === notification.fromUserId && (
            <View
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Image
                source={require("../../../assets/images/logo.png")
                }
                alt="image"
                size="sm"
                borderRadius={10}
              />
            </View>
          )}
          <VStack>
            <Text
              color="coolGray.800"
              bold
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: 230 }} // you may adjust this as needed
            >
              {notification.title}
            </Text>
            <Text
              color="coolGray.600"
              numberOfLines={2} // change this to limit the number of lines
              style={{ width: 230 }} // setting the width to 100
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
            <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
              {" "}
              {new Date(notification.date).toLocaleDateString("es-ES")}{" "}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};
