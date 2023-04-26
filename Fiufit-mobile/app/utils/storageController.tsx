import { User } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


type userInfo = {
    user: User;
    internal_id: string;
    is_trainer: boolean;
}

// stores an User object in the local storage
export async function storeUser(user: userInfo) {
    try {
        const jsonValue = JSON.stringify(user);
        console.log("Storing user in local storage: ", jsonValue);
        await AsyncStorage.setItem('@userInfo', jsonValue);
    } catch (e) {
        console.log("Error storing user in local storage: ", e);
    }
}

// gets the User object from the local storage
export async function getUser(): Promise<userInfo | null> {
    try {
        const jsonValue = await AsyncStorage.getItem('@userInfo');
        console.log("Getting user from local storage: ", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error getting user from local storage: ", e);
        return null;
    }
}
