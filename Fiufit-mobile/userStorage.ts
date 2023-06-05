import { User } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "./firebase";

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
        const details = await getUserDetails(this.user!.id, this.user!.googleUser);
        console.log("details received:", details, "user stored metadata:", this.user!.UserMetadata)
        if (details === null) {
            if (this.user!.UserMetadata === null || this.user!.UserMetadata === undefined) {
                console.log("creating new empty metadata");
                this.user!.UserMetadata = {
                    id: this.user!.id,
                    weight: null,
                    height: null,
                    birthDate: null,
                    location: null,
                    interests: []
                }
            }
        } else {
            this.user!.UserMetadata = details;
        }
        console.log("user metadata after verifying:", this.user!.UserMetadata);
    }

    async setWeight(weight: number) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.weight = weight;
        await storeUserOnStorage(this.user!);
        await updateUserDetails(this.user!.UserMetadata!);
    }

    async setHeight(height: number) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.height = height;
        await storeUserOnStorage(this.user!);
        await updateUserDetails(this.user!.UserMetadata!);
    }

    async setBirthdate(birthdate: string) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.birthDate = birthdate;
        await storeUserOnStorage(this.user!);
        await updateUserDetails(this.user!.UserMetadata!);
    }

    async setLocation(location: string) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.location = location;
        await storeUserOnStorage(this.user!);
        await updateUserDetails(this.user!.UserMetadata!);
    }

    async setInterests(interests: string[]) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.interests = interests;
        await storeUserOnStorage(this.user!);
        await updateUserDetails(this.user!.UserMetadata!);
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

    async refreshToken() {
        await this.verifyUserExists();
        console.log("refreshing token", this.user!.googleUser);
        console.log("current firebase auth user:", auth.currentUser);
        const newToken = await auth.currentUser?.getIdToken(true)
        console.log("new token:", newToken);
        (this.user!.googleUser as any).stsTokenManager.accessToken = newToken;
        await storeUserOnStorage(this.user!);
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
    googleUser: User,
    UserMetadata: UserMetadata | null
}

export async function getUserDetails(userId: number, user: User): Promise<UserMetadata | null> {
    const accessToken = (user as any).stsTokenManager.accessToken;
    const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/" + userId + "/metadata";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "connection": "keep-alive",
                "Authorization": "Bearer " + accessToken,
            },
        });
        if (response.ok) {
            try {
                const userDetails = await response.json();
                console.log("userDetails:", userDetails);
                return userDetails;
            } catch (err: any) {
                console.error(err);
            }
        } else {
            console.info("error getting user details response: ", await response.json());
        }
    } catch (err: any) {
        console.error("error fetching user details: ", err);
    }
    return null;
}

export const updateUserDetails = async (data: UserMetadata) => {
    const user = await globalUser.getUser();
    const internal_id = user!.id;
    data.id = internal_id;
    const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
    console.log("data:", JSON.stringify(data), "userId:", internal_id);
    try {
        const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/" + internal_id + "/metadata";
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "connection": "keep-alive",
                "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("user details updated");
        } else {
            console.error(await response.json());
        }
    } catch (err: any) {
        alert("user details error:" + err.message);
    }
};

const globalUser = new StoredUser();

export default globalUser;