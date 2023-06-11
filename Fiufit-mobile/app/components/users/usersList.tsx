import { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  VStack,
  Divider,
  Icon,
  Input,
  View,
  HStack,
} from "native-base";
import { API } from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from "react-native";
import { userInfo } from "../../../asyncStorageAPI";
import { UserInfoCard } from "./userInfoCard";
import globalUser from "../../../userStorage";
import { OnlyFollowedButton } from "./onlyFollowedButton";

interface Props {
  navigation: any;
}

export default function UsersList(props: Props) {
  const { navigation } = props;
  const [users, setUsers] = useState<userInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userInfo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [followedUsers, setFollowedUsers] = useState<userInfo[]>([]);
  const [followedUsersSet, setFollowedUsersSet] = useState<Set<number>>(
    new Set()
  );
  const [onlyFollowed, setOnlyFollowed] = useState(false);
  const api = new API(navigation);

  const getUsersList = async () => {
    setRefreshing(true);
    let allUsers = await api.getUsers();
    const userId = await globalUser.getUserId();
    let followedUsers = await api.getFollowedUsers(userId);
    console.log("FOLOWED USERS:", followedUsers);
    let followedUsersSet = new Set<number>(
      followedUsers.map((user) => user.id)
    );
    setFollowedUsers(followedUsers);
    setFollowedUsersSet(followedUsersSet);
    setUsers(allUsers);
    setFilteredUsers(allUsers);
    updateFilterOnlyFollowed();
    setRefreshing(false);
  };

  useEffect(() => {
    const filtered = users.filter(
      (item) =>
        nameInput === "" ||
        item.name.toLowerCase().includes(nameInput.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [nameInput]);

  useEffect(() => {
    try {
      getUsersList();
      updateFilterOnlyFollowed();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onFollow = async (userId: number) => {
    await api.followUser(userId);
  };

  const onUnfollow = async (userId: number) => {
    await api.unfollowUser(userId);
  };

  const onOnlyFollowed = () => {
    setRefreshing(true);
    setOnlyFollowed(!onlyFollowed);
    if (!onlyFollowed) {
      setFilteredUsers(users);
      setRefreshing(false);
    } else {
      updateFilterOnlyFollowed();
    }
    setRefreshing(false);
  };

  const updateFilterOnlyFollowed = () => {
    setRefreshing(true);
    if (!onlyFollowed) {
      return;
    }
    if (followedUsersSet.size === 0) {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter((user) =>
        followedUsersSet.has(user.id)
      );
      setFilteredUsers(filtered);
    }
    setRefreshing(false);
  };
  

  return (
    <View flex={1} backgroundColor="#fff">
      <VStack
        paddingY={2}
        paddingX={4}
        w="100%"
        backgroundColor="#fff"
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
      >
        <VStack alignSelf="center">
          <Input
            placeholder="Search Users by Name"
            onChangeText={(text) => {
              setNameInput(text);
            }}
            value={nameInput}
            width="100%"
            borderRadius="4"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
          />
          <OnlyFollowedButton onPress={() => onOnlyFollowed()} onlyFollowed={onlyFollowed}/>
        </VStack>
        <View></View>
      </VStack>
      <View flex={1}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={filteredUsers}
          marginBottom={0}
          marginTop={0}
          renderItem={(user) => (
            <HStack>
              <UserInfoCard
                userData={user.item}
                navigation={navigation}
                navigateToScreen="UserInfoScreen"
                isFollowed={followedUsersSet.has(user.item.id)}
                onFollow={ () => onFollow(user.item.id)}
                onUnfollow={ () => onUnfollow(user.item.id)}
              />
            </HStack>
          )}
          keyExtractor={(user) => user.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getUsersList} />
          }
        ></FlatList>
      </View>
    </View>
  );
}
