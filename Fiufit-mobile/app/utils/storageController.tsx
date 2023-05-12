import { User } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetailsWrapper, updateUserDetailsWrapper } from './userMetadataController';

export type UserMetadata = {
    id: number,
    weight: number,
    height: number,
    birthDate: string,
    location: string,
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
    googleUser: User,
    UserMetadata: UserMetadata | null
}

export class StoredUser {
    user: userInfo | null;

    constructor() {
        this.user = null;
    }

    async setUser(user: userInfo) {
        this.user = user;
        await storeUserOnStorage(user);
    }

    async getUser() {
        await this.verifyUserExists();
        console.log("user stored:", this.user);
        return this.user;
    }

    async getUserMetadata() {
        await this.verifyUserMetadataExists();
        console.log("user metadata:", this.user!.UserMetadata);
        return this.user!.UserMetadata;
    }
    
    async updateDetails() {
        await this.verifyUserMetadataExists();
        await storeUserOnStorage(this.user!);
    }
    
    async verifyUserExists() {
        if (this.user === null) {
            this.user = await getUserFromStorage();
            if (this.user === null) {
                throw new Error("User is not logged in");
            }
        }
    }

    async verifyUserMetadataExists() {
        await this.verifyUserExists();
        if (this.user!.UserMetadata === null) {
            const details = await getUserDetailsWrapper(this.user!.id, this.user!.googleUser);
            if (details === null) {
                this.user!.UserMetadata = {
                    id: this.user!.id,
                    weight: 0,
                    height: 0,
                    birthDate: "",
                    location: "",
                    interests: []
                }
            } else {
                this.user!.UserMetadata = details;
            }
        }
    }

    async setWeight(weight: number) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.weight = weight;
        await storeUserOnStorage(this.user!);
        await updateUserDetailsWrapper(this.user!.UserMetadata!);
    }

    async setHeight(height: number) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.height = height;
        await storeUserOnStorage(this.user!);
        await updateUserDetailsWrapper(this.user!.UserMetadata!);
    }

    async setBirthdate(birthdate: string) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.birthDate = birthdate;
        await storeUserOnStorage(this.user!);
        await updateUserDetailsWrapper(this.user!.UserMetadata!);
    }

    async setLocation(location: string) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.location = location;
        await storeUserOnStorage(this.user!);
        await updateUserDetailsWrapper(this.user!.UserMetadata!);
    }

    async setInterests(interests: string[]) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.interests = interests;
        await storeUserOnStorage(this.user!);
        await updateUserDetailsWrapper(this.user!.UserMetadata!);
    }

    async setRole(role: string) {
        await this.verifyUserExists();
        this.user!.role = role;
        await storeUserOnStorage(this.user!);
    }

    async setState(state: string) {
        await this.verifyUserExists();
        this.user!.state = state;
        await storeUserOnStorage(this.user!);
    }

    async getRole() {
        await this.verifyUserExists();
        return this.user!.role;
    }
    
    async logout() {
        this.user = null;
        await AsyncStorage.removeItem('@userInfo');
    }
}

async function storeUserOnStorage(user: userInfo) {
    try {
        const jsonValue = JSON.stringify(user);
        console.log("Storing user in local storage: ", jsonValue);
        await AsyncStorage.setItem('@userInfo', jsonValue);
    } catch (e) {
        console.log("Error storing user in local storage: ", e);
    }
}

async function getUserFromStorage(): Promise<userInfo | null> {
    try {
        const jsonValue = await AsyncStorage.getItem('@userInfo');
        console.log("Getting user from local storage: ", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error getting user from local storage: ", e);
        return null;
    }
}

const globalUser = new StoredUser();

export default globalUser;