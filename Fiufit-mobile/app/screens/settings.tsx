import { Box, Text, extendTheme, FlatList, HStack, Spacer, Button, View, NativeBaseProvider } from 'native-base';
import { editProfileStyles } from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { BarChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';

const screens = ['ChangeNameScreen', 'ChangeHeightScreen', 'ChangeWeightScreen', 'ChangeDateScreen', 'ChangeInterestsScreen', 'ChangeLocationScreen', 'ChangeRoleScreen']

const fields = [
  { name: "Nombre completo", id: 0 },
  { name: "Altura", id: 1 },
  { name: "Peso", id: 2 },
  { name: "Fecha de nacimiento", id: 3 },
  { name: "Intereses", id: 4 },
  { name: "Dirección", id: 5 },
  { name: "Rol", id: 6 }, // se guarda en el contexto
];

interface Props {
  navigation: any;
}

export default function SettingsScreen(props: Props) {
  const { navigation } = props;

  const [userInformation, setUserInformation] = useState(["", "", "", "", "", "", ""]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getUserInfo = async () => {
        const userInfoStored = await globalUser.getUser();

        if (userInfoStored === null) {
          return;
        }

        console.log('ABOUT TO ASK FOR DETAILS');
        const details = await globalUser.getUserMetadata();

        console.log("DETAILS:", details, "userInfoStored:", userInfoStored);
        if (details === null || details === undefined) { // if the user has skipped the registration form
          setUserInformation([userInfoStored?.name || "", "", "", "", "", "", userInfoStored!.role]);
          console.log("NO INFO");
          return;
        }

        const interests = details!.interests

        let birthdate = details!.birthDate; // from "2000-09-22T17:43:38.879Z" to "22/09/2000"
        if (birthdate !== null) {
          birthdate = birthdate?.split('T')[0].split('-').reverse().join('/');
        }

        console.log("there is user info stored:", userInfoStored, "details:", details, "interests:", interests);
        if (userInfoStored && details && interests) {
          setUserInformation([userInfoStored.name, details.height?.toString() ?? "", details.weight?.toString() ?? "", birthdate ?? "", interests.join(', '), details.location ?? "", userInfoStored.role]);
        }
      }
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);



  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
    <View flex={1} style={{ borderTopWidth: 1, borderTopColor: '#e06666', padding: 5 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={fields} renderItem={({ item }) =>
          <Box
            borderBottomWidth="1"
            borderColor="#eaeaea"
            px="6"
            py="6"
            borderTopRadius="30px"
            onTouchEnd={async () => {
              const value = userInformation[item.id];
              navigation.navigate(screens[item.id], { value });
            }}>

            <HStack>
              <Text _dark={{ color: "warmGray.50" }} color="#FF6060" bold>
                {item.name}
              </Text>
              <Spacer />
              <HStack space={2}>
                <Text fontSize="md" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                  {userInformation[item.id] ? userInformation[item.id] : "No especificado"}
                </Text>
                <Button backgroundColor="#ffffff" size={5} alignSelf="center">
                  <AntDesign name="arrowright" size={15} color="#707070" />
                </Button>
              </HStack>
            </HStack>
          </Box>}
        keyExtractor={item => item.name}
      />

    </View>
    <View
      style={{
        borderTopWidth: 1, borderTopColor: '#e06666', paddingTop: 10,
        marginVertical: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <LoadableButton
        customStyles={{ width: 200 }}
        onPress={async () => {
          await globalUser.logout();
          navigation.navigate('LoginScreen');
        }}
        text={"Cerrar sesión"}
      />
    </View>
  </View></NativeBaseProvider>;
}
