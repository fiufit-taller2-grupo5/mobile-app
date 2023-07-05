import * as React from "react";
import {
  Image,
  Text,
  AspectRatio,
  Box,
  Stack,
  Heading,
  HStack,
  Button,
  View,
  ScrollView,
} from "native-base";
import { API, Goal } from "../../../api";
import { useState } from "react";
import { RefreshControl } from "react-native";

interface Props {
  navigation: any;
  goalData: Goal;
}

export default function GoalCard(props: Props) {
  const { navigation, goalData } = props;

  const api = new API(navigation);

  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <View flexGrow={1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} />
        }
      >
        <Box
          rounded="2xl"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          margin={3}
        >
          <View>
            <AspectRatio w="100%" ratio={16 / 10}>
              <Image
                source={(goalData.multimedia && goalData.multimedia.length >= 1) ? { uri: goalData.multimedia.at(0) } : require("../../../assets/images/logo-color.jpg")}
                alt="image"
                size={238}
                width="100%"
              />
            </AspectRatio>
          </View>
          <Stack p="4" space={3}>
            <HStack space={2}>
              <Heading size="md" ml="-1">
                {goalData.title}
              </Heading>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Tipo: </Text>
                <Text>{goalData.type}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Metrica: </Text>
                <Text>{goalData.metric}</Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontWeight={"bold"}>Descripción: </Text>
                <Text>{goalData.description}</Text>
                </HStack>
            </HStack>
          </Stack>
            <Button style={{
              backgroundColor: "#FF6060",
              width: "50%",
              borderRadius: 30,
              left: "22%",
              bottom: "2%"
            }}
              onPress={() => navigation.navigate("EditGoalScreen", { goalData: goalData })}
            >
              Editar meta
          </Button>
        </Box>
      </ScrollView>
    </View>
  );
}
