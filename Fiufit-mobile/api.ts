import { User } from "firebase/auth";
import { trainingReview } from "./app/screens/rateTraining";
import { trainingSession } from "./app/screens/trainingSession";
import { auth } from "./firebase";
import { getUserFromStorage, storeUserOnStorage, refreshToken, userInfo, UserMetadata } from "./asyncStorageAPI";

export class ApiError {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

};

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
  location: string,
  trainerId: number,
}

export class API {
  navigation: any;
  constructor(navigation: any) {
    this.navigation = navigation;
  }

  async fetchFromApi<T, V>(path: string, fetchConfig: RequestInit, onSuccess: (response: any) => T, onError: (error: ApiError) => V): Promise<T | V> {
    try {
      let hasAuthHeader = false;
      for (const header in fetchConfig.headers) {
        if (header.toLowerCase() === "authorization") {
          hasAuthHeader = true;
          break;
        }
      }
      let accessToken = "";
      if (!hasAuthHeader) {
        const user = await getUserFromStorage();
        accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
      }
      fetchConfig.headers = {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + accessToken,
        ...fetchConfig.headers,
      }
      // use localhost if running locally, otherwise use the api gateway
      const localUrl = "https://a4f5-190-19-109-11.ngrok-free.app/" + path;
      const prod = "https://api-gateway-prod-szwtomas.cloud.okteto.net/" + path;
      const url = process.env.NODE_ENV === "development" ? localUrl : prod;
      console.log("fetching from api: ", url, fetchConfig);
      const response = await fetch(url, fetchConfig);
      const responseJson = await response.json();
      console.log("got response:", responseJson);
      if (response.ok) {
        return onSuccess(responseJson);
      } else {
        if (responseJson?.error?.code === "auth/id-token-expired") {
          console.log("token expired:", responseJson.error.message);
          await refreshToken();
          const user = await getUserFromStorage();
          accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
          // we use the same fetchConfig with the new token
          const newFetchConfig = {
            ...fetchConfig,
            headers: {
              ...fetchConfig.headers,
              "Authorization": "Bearer " + accessToken
            }
          };
          return await this.fetchFromApi(path, newFetchConfig, onSuccess, onError);
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
      console.log("error fetching from api: ", err);
      const error = new ApiError(err.message, err.code);
      return onError(error);
    }
  }

  async getUsers(): Promise<userInfo[]> {
    return await this.fetchFromApi(
      "user-service/api/users",
      { method: "GET" },
      (response: userInfo[]) => response,
      (error: ApiError) => {
        console.log("error getting users:", error);
        return [];
      }
    );
  }

  async createUser(user: User, emailRegisterName: string = "default name"): Promise<void> {
    const data = {
      name: user.displayName ? user.displayName as string : emailRegisterName,
      uid: user.uid,
      email: user.email as string
    };
    const token = (user as any).stsTokenManager.accessToken;
    const error: ApiError | undefined = await this.fetchFromApi("user-service/api/users",
      {
        method: "POST",
        headers: {
          "login-mobile-app": "true",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(data),
      },
      async (userInfo: userInfo) => {
        try {
          console.log("userInfo", userInfo);
          userInfo.googleUser = user;
          userInfo.role = "Atleta";
          await storeUserOnStorage(userInfo);
        } catch (error: any) {
          console.error("error reading response from creating user", error);
          auth.signOut();
          return error;
        }
      },
      (error: ApiError) => {
        auth.signOut();
        return error;
      }
    );

    if (error) {
      throw error;
    }
  }

  async getInterests(): Promise<string[]> {
    return await this.fetchFromApi(
      "user-service/api/users/interests",
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
      () => {
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
    const accessToken = (user as any).stsTokenManager.accessToken;
    return await this.fetchFromApi(
      "user-service/api/users/by_email/" + email,
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      },
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
    let url = "training-service/api/trainings?"
    const user = await getUserFromStorage();
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
    const user = await getUserFromStorage();
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
    const user = await getUserFromStorage();
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
        throw error;
      }
    );
  }

  async getTrainingSessions(trainingId: number): Promise<trainingSession[]> {
    const user = await getUserFromStorage();
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
    const user = await getUserFromStorage();
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
    const user = await getUserFromStorage();
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
    const user = await getUserFromStorage();
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

  async getUserMetadata(userId: number): Promise<UserMetadata> {
    const url = "user-service/api/users/" + userId + "/metadata";
    return await this.fetchFromApi(
      url,
      { method: "GET" },
      (response: UserMetadata) => response,
      (error: ApiError) => {
        console.log("error getting user metadata:", error);
        throw error;
      }
    );
  }

  async updateUserMetadata(data: UserMetadata): Promise<void> {
    const user = await getUserFromStorage();
    const userId = user?.id;
    const url = "user-service/api/users/" + userId + "/metadata";
    return await this.fetchFromApi(
      url,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      (response: any) => {
        console.log("user metadata updated");
      },
      (error: ApiError) => {
        console.log("error updating user metadata:", error);
        throw error;
      }
    );
  }

  async quitFavoriteTraining(trainingPlanId: number): Promise<boolean> {
    const user = await getUserFromStorage();
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
