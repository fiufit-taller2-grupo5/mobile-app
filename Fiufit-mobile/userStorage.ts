import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "./firebase";
import { API } from "./api";
import { getUserFromStorage, storeUserOnStorage, userInfo, UserMetadata } from "./asyncStorageAPI";

export class StoredUser {
    user: userInfo | null;
    navigation: any;
    api?: API

    constructor() {
        this.user = null;
    }

    setNavigation(navigation: any) {
        this.navigation = navigation;
        this.api = new API(navigation);
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

    async getUserId() {
        await this.verifyUserExists();
        return this.user!.id;
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

    async updateUserMetadata(metadata: UserMetadata) {
        await this.verifyUserExists();
        this.user!.UserMetadata = metadata;
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
        try {
            const details = await this.api!.getUserMetadata(this.user!.id);
            this.user!.UserMetadata = details;
            console.log("details received:", details, "user stored metadata:", this.user!.UserMetadata)
        } catch (err) {
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
        }

        console.log("user metadata after verifying:", this.user!.UserMetadata);
    }

    async setWeight(weight: number) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.weight = weight;
        await storeUserOnStorage(this.user!);
        await this.api?.updateUserMetadata(this.user!.UserMetadata!);
    }

    async setHeight(height: number) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.height = height;
        await storeUserOnStorage(this.user!);
        await this.api?.updateUserMetadata(this.user!.UserMetadata!);
    }

    async setBirthdate(birthdate: string) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.birthDate = birthdate;
        await storeUserOnStorage(this.user!);
        await this.api?.updateUserMetadata(this.user!.UserMetadata!);
    }

    async setLocation(location: string) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.location = location;
        await storeUserOnStorage(this.user!);
        await this.api?.updateUserMetadata(this.user!.UserMetadata!);
    }

    async setInterests(interests: string[]) {
        await this.verifyUserMetadataExists();
        this.user!.UserMetadata!.interests = interests;
        await storeUserOnStorage(this.user!);
        await this.api?.updateUserMetadata(this.user!.UserMetadata!);
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
        await auth.signOut();
        await AsyncStorage.removeItem('@userInfo');
    }

    async refreshToken() {
        await this.verifyUserExists();
        console.log("refreshing token", this.user!.googleUser);
        console.log("current firebase auth user:", auth.currentUser);
        const newToken = await auth.currentUser?.getIdToken(true);
        console.log("new token:", newToken);
        (this.user!.googleUser as any).stsTokenManager.accessToken = newToken;
        await storeUserOnStorage(this.user!);
    }
}

const globalUser = new StoredUser();

export default globalUser;