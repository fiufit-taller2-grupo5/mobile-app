import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebase';
import { User } from 'firebase/auth';


export type UserMetadata = {
  id?: number | null,
  weight: number | null,
  height: number | null,
  birthDate: string | null,
  location: string | null,
  interests: string[]
}

export type userInfo = {
  id: number,
  email: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  state: string,
  role: string,
  googleUser?: User,
  UserMetadata?: UserMetadata | null
}


export async function storeUserOnStorage(user: userInfo) {
  try {
    const jsonValue = JSON.stringify(user);
    console.log("Storing user in local storage: ", jsonValue);
    await AsyncStorage.setItem('@userInfo', jsonValue);
  } catch (e) {
    console.log("Error storing user in local storage: ", e);
  }
}

export async function getUserFromStorage(): Promise<userInfo | null> {
  try {
    const jsonValue = await AsyncStorage.getItem('@userInfo');
    console.log("Getting user from local storage: ", jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error getting user from local storage: ", e);
    return null;
  }
}

export async function refreshToken() {
  const user = await getUserFromStorage();
  console.log("refreshing token", user!.googleUser);
  console.log("current firebase auth user:", auth.currentUser);
  const newToken = await auth.currentUser?.getIdToken(true);
  console.log("new token:", newToken);
  (user!.googleUser as any).stsTokenManager.accessToken = newToken;
  await storeUserOnStorage(user!);
}