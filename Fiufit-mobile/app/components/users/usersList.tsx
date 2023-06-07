import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Divider,
  Icon,
  Input,
  View,
  CheckIcon,
  Select,
} from "native-base";
import {
  API
} from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from 'react-native';
import { userInfo } from "../../../userStorage";
import { UserInfoCard } from "./userInfoCard";


interface Props {
  navigation: any;
}

export default function UsersList(props: Props) {
  const { navigation } = props;
  const [users, setUsers] = useState<userInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userInfo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const api = new API(navigation);

  const getUsersList = async () => {
    setRefreshing(true);
    let allUsers = await api.getUsers();
    setUsers(allUsers);
    setFilteredUsers(allUsers);
    setRefreshing(false);
  }

  useEffect(() => {
    const filtered = users.filter(
      (item) =>
        (nameInput === '' || item.name.toLowerCase().includes(nameInput.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [nameInput])


  useEffect(() => {
    try {
      getUsersList();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (<View flex={1} backgroundColor="#fff">
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
          placeholder="Search Users by title"
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
      </VStack>
      <View>
      </View>
    </VStack>
    <View flex={1}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={filteredUsers}
        marginBottom={0}
        marginTop={0}
        renderItem={(user) => (
          <UserInfoCard
            userData={user.item}
            navigation={navigation}
            navigateToScreen="UserInfoScreen"
          />
        )}
        keyExtractor={(user) => user.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getUsersList} />}
      ></FlatList></View>
  </View>
  );
}
