import { User } from "firebase/auth";
import { getUser, storeUser } from "./app/utils/storageController";

type userDetails = {
    userId?: string;
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

export const createUser = async (user: User, emailRegisterName : string = "" ) : Promise<void | Response>  => {
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
          storeUser({
            user: user,
            internal_id: internal_id,
            is_trainer: false
          });
          console.log("BACKEND RESPONSE:", responseData);
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
  
export const updateUserDetails = async (data: userDetails) => {
    const userInfo = await getUser();
    const internal_id = userInfo?.internal_id;
    data.userId = internal_id;
    const accessToken = (userInfo?.user as any).stsTokenManager.accessToken;
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
          // "dev": "a",
          "Authorization": "Bearer " + accessToken,
        },
        body: JSON.stringify(data),
      });
      console.log("RESPONSE:", response);
      if (response.ok) {
        try {
          console.log("BACKEND RESPONSE:", response);
          const data = await response.json();
        } catch (err: any) {
          console.error(err);
        }
      } else {
        alert("Error al iniciar sesión");
        console.error(await response.json());
      }
    } catch (err: any) {
      console.error("errorsito: ",err);
      alert("user details error:" + err.message);
    }
}

export async function getInterests(url:string) : Promise<string[] | null> {
  console.log("getting interests at url: ", url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "dev": "a",
        // "Authorization": "Bearer " + accessToken,
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