import { User } from "firebase/auth";
import { getUserFromStorage, storeUserOnStorage, userInfo } from "./app/utils/storageController";
import { auth } from "./firebase";

type userDetails = {
    userId?: number;
    weight: number;
    height: number;
    birthDate: string;
    location: string;
    interests: string[];
  }

const getInternalIdFromResponse = (response: any): string => {
    // receives a response from the backend like "{"status": "User Jdjde with id 10 created"}"
    // returns a string similar to "10"
    console.log("internal id receiving response", response.status);
    const res = response.status.split("with id ")[1].split(" ")[0];
    console.log(res);
    return res;
}

export const createUser = async (user: User, emailRegisterName : string = "default name" ) : Promise<void | Response>  => {
    const data = {
      name: user.displayName? user.displayName as string : emailRegisterName,
      uid: user.uid,
      email: user.email as string
    };
    const token = (user as any).stsTokenManager.accessToken;
    console.log("DATA:", data, "token:", token);
    try {
      const response = await fetch("https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "connection": "keep-alive",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        try {
          const responseData = await response.json();
          const internal_id = getInternalIdFromResponse(responseData);
          const userInfo = await getUserInfoById(internal_id);

          if (userInfo instanceof Error) {
            throw userInfo;
          }
          userInfo.googleUser = user;
          await storeUserOnStorage(userInfo);
          console.log("user created");
        } catch (err: any) {
          console.error(err);
        }
      } else {
        console.warn("ERROR CREATING USER:", await response.json());
      }
      return response;
    } catch (err: any) {
      console.error(err);
      alert("CREATE USER ERROR:" + err.message);
      return err;
    }
  }

// const response = await fetch('https://jsonplaceholder.typicode.com/comments?' + new URLSearchParams({
// postId: 1
// }))

export const updateUserDetails = async (data: userDetails) => {
    const userInfo = await getUserFromStorage();
    const internal_id = userInfo?.id;
    data.userId = internal_id;
    const accessToken = (userInfo?.googleUser as any).stsTokenManager.accessToken;
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
      console.log("RESPONSE:", response);
      if (response.ok) {
        console.log("user details updated");
      } else {
        alert("Error al iniciar sesión");
        // console.error(await response.json());
      }
    } catch (err: any) {
      // console.error("errorsito: ",err);
      alert("user details error:" + err.message);
    }
  }

export async function getInterests(url:string) : Promise<string[] | null> {
  console.log("getting interests at url: ", url);
  const userInfo = await getUserFromStorage();
  const accessToken = (userInfo?.googleUser as any).stsTokenManager.accessToken;
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
        const interests = await response.json() ;
        console.log("possible interests:", interests);
        return interests;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.error("error getting interests response: ",await response.json());
    }
  } catch (err: any) {
    console.error("error fetching interests: ",err);
  }
  return null;
}

export async function getResetPasswordUrl(email:string) : Promise<string | null> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/changepassword";
  console.log("getting reset password url: ", url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "dev": "a",
        // "Authorization": "Bearer " + accessToken,
      },
      body: JSON.stringify({email: email}),
    });
    if (response.ok) {
      try {
        const url_response = await response.json() ;
        console.log("reset password url:", url_response);
        return url_response;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.error("error getting password reset url: ",await response.json());
    }
  } catch (err: any) {
    console.error("error fetching password reset url: ",err);
  }
  return null;
}

export async function getTrainings(url:string) : Promise<string[] | null> {
  console.log("getting trainings at url: ", url);
  console.log("estoy en getTrainings");
  //const user = await getUser();
  //const token = (user as any).stsTokenManager.accessToken;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "dev": "a",
        //"Authorization": "Bearer " + token,
      },
    });
    if (response.ok) {
      try {
        const trainings = await response.json() ;
        console.log("Training plans:", trainings);
        return trainings;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.error("error getting trainings response: ",await response.json());
    }
  } catch (err: any) {
    console.error("error fetching trainings: ",err);
  }
  return null;
}

export async function getUserInfoByEmail(email:string) : Promise<userInfo | Error> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/?email=" + email;
  console.log("getting user info by email: ", url);
  const accessToken = (auth.currentUser as any).stsTokenManager.accessToken;
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
    // console.log("getUserInfoByEmail->RESPONSE:", response);
    if (response.ok) {
      try {
        const user : userInfo = await response.json();
        console.log("user info:", user);
        return user;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.warn("error getting user info: ",await response.json());
    }
  } catch (err: any) {
    console.error("error fetching user info: ",err);
  }
  return Error("User not found");
}

// TODO refactor methods to reduce code redundancy
export async function getUserInfoById(id:string) : Promise<userInfo | Error> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/?id=" + id;
  console.log("getting user info by id: ", url);
  const accessToken = (auth.currentUser as any).stsTokenManager.accessToken;
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
        const user : userInfo = await response.json();
        console.log("user info:", user);
        return user;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.warn("error getting user info: ",await response.json());
    }
  } catch (err: any) {
    console.error("error fetching user info: ",err);
  }
  return Error("User not found");
}