import { NativeBaseProvider, extendTheme, View } from 'native-base';
import UsersList from '../components/users/usersList';
import { userInfo } from '../../asyncStorageAPI';
import { useEffect, useState } from 'react';
import { API } from '../../api';
import globalUser from '../../userStorage';


export default function SelectedUsersScreen({ route, navigation }: any) {
    // used to show either the followed users or the followers list
    const theme = extendTheme({
        components: {
            Text: {
                defaultProps: {
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '800',
                    fontSize: '30px',
                }
            }
        }
    });
    const { isFollowers, userId} = route.params; // isFollowers is true if the list is for followers, false if it is for followed users
    const [users, setUsers] = useState<userInfo[]>([]);
    const api = new API(navigation);
    
    const getUsersList = async () => {
        let users: userInfo[] = [];
        if (isFollowers) {
            users = await api.getFollowers(parseInt(userId));
        } else {
            users = await api.getFollowedUsers(parseInt(userId));
        }
        setUsers(users);
      };

    useEffect(() => {
        try {
          getUsersList();
        } catch (error) {
          console.log(error);
        }
    }, []);



    return <NativeBaseProvider theme={theme}>
        <View flex={1} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <UsersList
                navigation={navigation}
                selectedUsers={users}
            />
        </View>
    </NativeBaseProvider>;
}