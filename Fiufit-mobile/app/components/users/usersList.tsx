import { useEffect, useRef, useState } from "react";
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
import { ActivityIndicator, RefreshControl } from "react-native";
import { userInfo } from "../../../asyncStorageAPI";
import { UserInfoCard } from "./userInfoCard";
import globalUser from "../../../userStorage";

interface Props {
  navigation: any;
  useSelectedUsers?: boolean;
  selectedUsers?: userInfo[];
}

export default function UsersList(props: Props) {
  const { navigation, selectedUsers, useSelectedUsers } = props;
  const [users, setUsers] = useState<userInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userInfo[]>([]);
  const [followedUsers, setFollowedUsers] = useState<userInfo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [inputLoading, setInputLoading] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const api = new API(navigation);

  const getUsersList = async () => {
    setRefreshing(true);
    const user = await globalUser.getUser();
    if (useSelectedUsers && selectedUsers) {
      console.log("SHOWING ONLY SELECTED USERS", selectedUsers);
      console.log("china", user?.id);
      let followedUsers = await api.getFollowedUsers(user!.id);
      setUsers(selectedUsers);
      setFollowedUsers(followedUsers);
      setFilteredUsers(selectedUsers);
      setRefreshing(false);
    } else if (!useSelectedUsers) {
      let allUsers = await api.getUsers();
      allUsers = allUsers.filter((item) => item.id !== user?.id);
      let followedUsers = await api.getFollowedUsers(user!.id);
      console.log("SHOWING ALL USERS", allUsers)
      setUsers(allUsers);
      setFollowedUsers(followedUsers);
      setFilteredUsers(allUsers);
      setRefreshing(false);
    }
  };

  useEffect(() => {

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      const filtered = users.filter(
        (item) =>
          nameInput === "" ||
          item.name.toLowerCase().includes(nameInput.toLowerCase())
      );
      setFilteredUsers(filtered);
      setInputLoading(false);
    }, 500);

  }, [nameInput]);

  useEffect(() => {
    try {
      getUsersList();
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [props]);

  const onFollow = async (userId: number) => {
    await api.followUser(userId);
  };

  const onUnfollow = async (userId: number) => {
    await api.unfollowUser(userId);
  };

  console.log("users", users);
  console.log("selected", selectedUsers);
  console.log("filteredUsers", filteredUsers);

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
            placeholder="Buscar por nombre"
            onChangeText={(text) => {
              setInputLoading(true);
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
            InputRightElement={
              inputLoading ? <ActivityIndicator color={"#c2c0c0"} size="small" style={{
                paddingRight: 10
              }} /> : undefined
            }
          />
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
                navigateToScreen="ProfileScreen"
                isFollowed={followedUsers.some(
                  (followedUser) => followedUser.id === user.item.id
                )
                }
                onFollow={() => onFollow(user.item.id)}
                onUnfollow={() => onUnfollow(user.item.id)}
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
