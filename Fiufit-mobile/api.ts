import { User } from "firebase/auth";
import globalUser, { userInfo } from "./userStorage";
import { trainingReview } from "./app/screens/rateTraining";
import { trainingSession } from "./app/screens/trainingSession";

class ApiError {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

};

type Result<T> = T | ApiError;


const fetchFromApi = async <T>(path: string, fetchConfig: RequestInit, onSuccess: (response: any) => T): Promise<Result<T>> => {
  try {
    const user = await globalUser.getUser();
    const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
    fetchConfig.headers = {
      ...fetchConfig.headers,
      "Content-Type": "application/json",
      "accept": "*/*",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
      "Authorization": "Bearer " + accessToken,
    }
    const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/" + path;
    console.log("fetching from api: ", url, fetchConfig);
    const response = await fetch(url, fetchConfig);
    const responseJson = await response.json();
    if (response.ok) {
      return onSuccess(responseJson);
    } else {
      if (responseJson?.error?.code === "auth/id-token-expired") {
        console.log("token expired:", responseJson.error.message);
        await globalUser.refreshToken();
        return await fetchFromApi(url, fetchConfig, onSuccess);
      } else {
        console.error("error in request: ", responseJson);
        return new ApiError(responseJson.message, response.status);
      }
    }
  } catch (err: any) {
    console.error("error fetching from api: ", err);
    return new ApiError(err.message, err.code);
  }
}


const getInternalIdFromResponse = (response: any): string => {
  // receives a response from the backend like "{"status": "User Jdjde with id 10 created"}"
  // returns a string similar to "10"
  console.log("internal id receiving response", response.status);
  const res = response.status.split("with id ")[1].split(" ")[0];
  console.log(res);
  return res;
}

export const apiGatewayHealthCheck = async (timestamp: string): Promise<boolean> => {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/health/" + timestamp;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      console.log("api gateway health check ok");
      return true;
    } else {
      console.error("api gateway health check error: ", await response.json());
      return false;
    }
  } catch (err: any) {
    console.error("api gateway health check error: ", err);
  }
  return false;
}

export const createUser = async (user: User, emailRegisterName: string = "default name"): Promise<void | Response> => {
  const data = {
    name: user.displayName ? user.displayName as string : emailRegisterName,
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
        "login-mobile-app": "true"
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      try {
        const userInfo = await response.json();

        // if (userInfo instanceof Error) {
        //   throw userInfo;
        // }

        userInfo.googleUser = user;
        userInfo.role = "Atleta";
        await globalUser.setUser(userInfo);
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

export async function getInterests(url: string): Promise<string[] | null> {
  console.log("getting interests at url: ", url);
  await globalUser.verifyUserMetadataExists();
  const user = await globalUser.getUser();
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
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
        const interests = await response.json();
        console.log("possible interests:", interests);
        return interests;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.error("error getting interests response: ", await response.json());
    }
  } catch (err: any) {
    console.error("error fetching interests: ", err);
  }
  return null;
}


export async function getResetPasswordEmail(email: string): Promise<any> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/resetPasswordEmail";
  console.log("getting reset password url: ", url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
      "password-reset": "true"
    },
    body: JSON.stringify({ email: email }),
  });

  if (!response.ok) {
    console.log("the response", (await response.json()).error.message);
    throw Error('No se pudo mandar el mail de reseteo de contraseña');
  }

  return response;
}

export async function getUserInfoByEmail(email: string, user: User): Promise<userInfo> {
  console.log("getting user info by email of user ", user);
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/by_email/" + email;
  const accessToken = (user as any).stsTokenManager.accessToken;
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
    const user: userInfo = await response.json();
    return user;
  } else {
    throw Error("error getting user info: " + (await response.json()).message);
  }

}

// TODO refactor methods to reduce code redundancy
export async function getUserInfoById(id: number, user: User, userDetails: Boolean): Promise<userInfo | Error> {
  /// userDetails indicates if the user details are returned or only the essential info

  console.log("getting user info by id of user ", user);
  let url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/";
  if (userDetails) {
    url += id; // return user details
  } else {
    url += "?id=" + id; // return only essential info
  }
  const accessToken = (user as any).stsTokenManager.accessToken;
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
        const user: userInfo = await response.json();
        return user;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.warn("error getting user info: ", await response.json());
    }
  } catch (err: any) {
    console.error("error fetching user info: ", err);
  }
  return Error("User not found");
}

export interface Training {
  id: number,
  title: string,
  description?: string,
  state: string,
  difficulty?: number,
  type: string,
  trainer_id: number,
  isFavorite?: boolean,
  meanRating?: number,
}

export interface TrainerTraining {
  title: string,
  description?: string,
  state: string,
  difficulty: number,
  type: string,
  trainerId?: number,
}

export async function getTrainings(navigation: any): Promise<Training[]> {
  try {
    const result = await fetchFromApi("training-service/api/trainings", {
      method: "GET",
    }, (response: Training[]) => response);
    if (result instanceof ApiError) {
      console.error("error fetching trainings: ", result);
      if (result.code === 403) {
        navigation.navigate("WelcomeScreen");
      }
      return [];
    } else {
      return result;
    }
  } catch (err: any) {
    console.error("error fetching trainings: ", err);
    return [];
  }
}

export async function getTrainerTrainings(filterRule: string | null = null, filterValue: string | null = null): Promise<Training[]> {
  let url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings?"
  const user = await globalUser.getUser();
  const userId = user!.id;
  if (filterRule !== null && filterValue !== null) {
    url += new URLSearchParams({ trainer_id: userId.toString(), filterRule: filterValue });
  } else {
    url += new URLSearchParams({ trainer_id: userId.toString() });
  }
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
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
        const trainings = await response.json();
        // console.log("Trainer training plans:", trainings);
        return trainings;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.error("error getting trainings response: ", await response.json());
    }
  } catch (err: any) {
    console.error("error fetching trainings: ", err);
  }
  return [];
}

export async function getFavoriteTrainings(): Promise<Training[]> {
  try {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await fetchFromApi("training-service/api/trainings/favorites/" + userId, {
      method: "GET",
    }, (response) => {
      if (response instanceof ApiError) {
        console.error("error fetching trainings: ", response.message);
        return [];
      } else {
        return response;
      }
    });
  } catch (err: any) {
    console.error("error fetching trainings: ", err);
    return [];
  }
}

export async function addFavoriteTraining(trainingPlanId: number): Promise<boolean> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/";
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  try {
    const response = await fetch(url + trainingPlanId + '/favorite/' + userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + accessToken,
      }
    });
    if (response.ok) {
      console.log("favorite training added");
      return true;
    } else {
      console.error("error adding favorite training response: ", await response.json());
      return false;
    }
  } catch (err: any) {
    console.error("error adding favorite training: ", err);
  }
  return false
}

export async function quitFavoriteTraining(trainingPlanId: number): Promise<boolean> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/";
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  try {
    const response = await fetch(url + trainingPlanId + '/favorite/' + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + accessToken,
      }
    });
    if (response.ok) {
      console.log("favorite training deleted");
      return true;
    } else {
      console.error("error deleting favorite training response: ", await response.json());
      return false;
    }
  } catch (err: any) {
    console.error("error adding favorite training: ", err);
  }
  return false
}


export async function addTraining(training: TrainerTraining): Promise<boolean> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/";
  const user = await globalUser.getUser();
  const userId = user?.id;
  training.trainerId = userId;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + accessToken,
      },
      body: JSON.stringify(training),
    });
    if (response.ok) {
      console.log("training added");
      return true;
    } else {
      console.error("error adding trainings response: ", await response.json());
      return false;
    }
  } catch (err: any) {
    console.error("error adding training: ", err);
  }
  return false
}

// receives a list of ids and returns a map with the id and a list of ratings for each training
// export async function getTrainingsRatings(ids:number[]) : Promise<Map<number, number>> {


export async function addTrainingReview(trainingId: number, review: trainingReview): Promise<void> {
  const user = await globalUser.getUser();
  const userId = user?.id;
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/" + trainingId + "/review/" + userId;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
      "Authorization": "Bearer " + accessToken,
    },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw Error("error adding training review")
  }

}

export async function getTrainingReviews(trainingId: number): Promise<trainingReview[]> {
  const user = await globalUser.getUser();
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/" + trainingId + "/reviews";
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
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
      console.log("getting reviews");
      return await response.json();
    } else {
      console.error("error getting training reviews, response: ", await response.json());
      return [];
    }
  } catch (err: any) {
    console.error("error getting training reviews: ", err);
  }
  return []
}

export async function addTrainingSession(trainingId: number, trainingSession: trainingSession): Promise<void> {
  const user = await globalUser.getUser();
  const userId = user?.id;
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/" + trainingId + "/user_training/" + userId;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + accessToken,
      },
      body: JSON.stringify(trainingSession),
    });
    if (response.ok) {
      console.log("adding training session");
    } else {
      console.error("error adding training session, response: ", await response.json());
    }
  } catch (err: any) {
    console.error("error adding training session: ", err);
  }
}

export class API {
  navigation: any;
  constructor(navigation: any) {
    this.navigation = navigation;
  }

  async fetchFromApi<T, V>(path: string, fetchConfig: RequestInit, onSuccess: (response: any) => T, onError: (error: ApiError) => V): Promise<T | V> {
    try {
      const user = await globalUser.getUser();
      const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
      fetchConfig.headers = {
        ...fetchConfig.headers,
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + accessToken,
      }
      const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/" + path;
      console.log("fetching from api: ", url, fetchConfig);
      const response = await fetch(url, fetchConfig);
      const responseJson = await response.json();
      if (response.ok) {
        return onSuccess(responseJson);
      } else {
        if (responseJson?.error?.code === "auth/id-token-expired") {
          console.log("token expired:", responseJson.error.message);
          await globalUser.refreshToken();
          return await this.fetchFromApi(url, fetchConfig, onSuccess, onError);
        } else {
          console.error("error in request: ", responseJson);
          if (response.status === 403) {
            this.navigation.navigate("WelcomeScreen");
          }
          const error = new ApiError(responseJson.message, response.status);
          return onError(error);
        }
      }
    } catch (err: any) {
      console.error("error fetching from api: ", err);
      const error = new ApiError(err.message, err.code);
      return onError(error);
    }
  }

  async createUser(user: User, emailRegisterName: string = "default name"): Promise<void | Response> {
    return await this.fetchFromApi("user-service/api/users",
      {
        method: "POST",
        headers: {
          "login-mobile-app": "true"
        },
      },
      async (response: any) => {
        try {
          const userInfo = await response.json();
          userInfo.googleUser = user;
          userInfo.role = "Atleta";
          await globalUser.setUser(userInfo);
        } catch (err: any) {
          console.error(err);
        }
      },
      (error: ApiError) => {
        console.error("error creating user:", error);
      }
    );
  }

  async getInterests(url: string): Promise<string[]> {
    return await this.fetchFromApi(
      "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/interests",
      { method: "GET" },
      (response: string[]) => response,
      (error: ApiError) => {
        console.log("error getting interests:", error);
        return [];
      }
    );
  }

  async getResetPasswordEmail(email: string): Promise<void> {
    return await this.fetchFromApi(
      "user-service/api/users/resetPasswordEmail",
      {
        method: "POST",
        headers: {
          "password-reset": "true"
        },
        body: JSON.stringify({ email: email }),
      },
      (response: any) => {
        console.log("reset password email sent");
      }
      ,
      (error: ApiError) => {
        console.log("error sending reset password email:", error);
        throw error;
      }
    );
  }

  async getUserInfoByEmail(email: string, user: User): Promise<userInfo> {
    return await this.fetchFromApi(
      "user-service/api/users/by_email/" + email,
      { method: "GET" },
      (response: userInfo) => response,
      (error: ApiError) => {
        console.log("error getting user info by email:", error);
        throw error;
      }
    );
  }

  async getUserInfoById(id: number, user: User, userDetails: Boolean): Promise<userInfo> {
    return await this.fetchFromApi(
      "user-service/api/users/" + id + "?userDetails=" + userDetails,
      { method: "GET" },
      (response: userInfo) => response,
      (error: ApiError) => {
        console.log("error getting user info by id:", error);
        throw error;
      }
    );
  }

  async getTrainingsRatings(ids: number[]): Promise<Map<number, number>> {
    return await this.fetchFromApi(
      "training-service/api/trainings/ratings?ids=" + ids,
      { method: "GET" },
      (response: Map<number, number>) => response,
      (error: ApiError) => {
        console.log("error getting trainings ratings:", error);
        return new Map<number, number>();
      }
    );
  }

  async addTraining(training: TrainerTraining): Promise<void> {
    return await this.fetchFromApi(
      "training-service/api/trainings/",
      {
        method: "POST",
        body: JSON.stringify(training),
      },
      (response: any) => {
        console.log("training added");
      },
      (error: ApiError) => {
        console.log("error adding training:", error);
        throw error;
      }
    );
  }

  async getTrainerTrainings(filterRule: string | null = null, filterValue: string | null = null): Promise<Training[]> {
    let url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings?"
    const user = await globalUser.getUser();
    const userId = user!.id;
    if (filterRule !== null && filterValue !== null) {
      url += new URLSearchParams({ trainer_id: userId.toString(), filterRule: filterValue });
    } else {
      url += new URLSearchParams({ trainer_id: userId.toString() });
    }
    return await this.fetchFromApi(
      url,
      { method: "GET" },
      (response: Training[]) => response,
      (error: ApiError) => {
        console.log("error getting trainer trainings:", error);
        return [];
      }
    );
  }

  async addTrainingReview(trainingId: number, review: trainingReview): Promise<void> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId + "/review/" + userId,
      {
        method: "POST",
        body: JSON.stringify(review),
      },
      (response: any) => {
        console.log("training review added");
      },
      (error: ApiError) => {
        console.log("error adding training review:", error);
        throw error;
      }
    );
  }

  async getTrainingReviews(trainingId: number): Promise<trainingReview[]> {
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId + "/reviews",
      { method: "GET" },
      (response: trainingReview[]) => response,
      (error: ApiError) => {
        console.log("error getting training reviews:", error);
        return [];
      }
    );
  }

  async addTrainingSession(trainingId: number, trainingSession: trainingSession): Promise<void> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId + "/user_training/" + userId,
      {
        method: "POST",
        body: JSON.stringify(trainingSession),
      },
      (response: any) => {
        console.log("training session added");
      },
      (error: ApiError) => {
        console.log("error adding training session:", error);
        throw error;
      }
    );
  }

  async getTrainingSessions(trainingId: number): Promise<trainingSession[]> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId + "/user_training/" + userId,
      { method: "GET" },
      (response: trainingSession[]) => response,
      (error: ApiError) => {
        console.log("error getting training sessions:", error);
        return [];
      }
    );
  }

  async getTrainingSession(trainingId: number, sessionId: number): Promise<trainingSession> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId + "/user_training/" + userId + "/" + sessionId,
      { method: "GET" },
      (response: trainingSession) => response,
      (error: ApiError) => {
        console.log("error getting training session:", error);
        throw error;
      }
    );
  }

  async getTrainings(): Promise<Training[]> {
    return await this.fetchFromApi(
      "training-service/api/trainings",
      { method: "GET" },
      (response: Training[]) => response,
      (error: ApiError) => {
        console.log("error getting trainings:", error);
        return [];
      }
    );
  }

  async getFavoriteTrainings(): Promise<Training[]> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/favorites/" + userId,
      { method: "GET" },
      (response: Training[]) => response,
      (error: ApiError) => {
        console.log("error getting favorite trainings:", error);
        return [];
      }
    );
  }

  async addFavoriteTraining(trainingPlanId: number): Promise<boolean> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingPlanId + '/favorite/' + userId,
      { method: "POST" },
      (response: any) => {
        console.log("favorite training added");
        return true;
      },
      (error: ApiError) => {
        console.log("error adding favorite training:", error);
        return false;
      }
    );
  }

  async quitFavoriteTraining(trainingPlanId: number): Promise<boolean> {
    const user = await globalUser.getUser();
    const userId = user?.id;
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingPlanId + '/favorite/' + userId,
      { method: "DELETE" },
      (response: any) => {
        console.log("favorite training deleted");
        return true;
      },
      (error: ApiError) => {
        console.log("error deleting favorite training:", error);
        return false;
      }
    );
  }
}