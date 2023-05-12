import { User } from "firebase/auth";
import { getUserDetails, updateUserDetails } from "../../api";
import { UserMetadata } from "./storageController";


export async function getUserDetailsWrapper(id:number, user:User) {
    let userDetails = await getUserDetails(id, user);
    return userDetails;
}

export async function updateUserDetailsWrapper(userDetails:UserMetadata) {
    await updateUserDetails(userDetails);
}