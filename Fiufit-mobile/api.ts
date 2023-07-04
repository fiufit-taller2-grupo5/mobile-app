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
  location: string,
  start: string,
  end: string,
  days: string,
  latitude?: string,
  longitude?: string,
  trainerId: number,
  trainer_id: number,
  multimedia?: Array<any>,
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
  start: string,
  end: string,
  days: string,
  latitude?: string,
  longitude?: string,
  multimedia?: Array<any>,
  trainerId: number,
}

export interface CompleteUserTraining extends trainingSession {
  trainingData: Training,
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
      const localUrl = "https://dec6-190-18-10-180.ngrok-free.app/" + path;
      const prod = "https://api-gateway-prod2-szwtomas.cloud.okteto.net/" + path;
      const url = process.env.NODE_ENV === "development" ? localUrl : prod;
      // const url = prod;
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
      (response: userInfo) => {
        if (response === null) {
          throw new ApiError("Usuario con ese mail no encontrado", 404);
        }
        return response
      },
      (error: ApiError) => {
        console.log("error getting user info by email:", error);
        throw error;
      }
    );
  }

  async getUserInfoById(id: number): Promise<userInfo & UserMetadata> {
    return await this.fetchFromApi(
      "user-service/api/users/" + id,
      { method: "GET" },
      (response: userInfo & UserMetadata) => response,
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

  async addTraining(training: TrainerTraining): Promise<number> {
    const coordinates = await this.getCoordinates(training.location);
    training.latitude = coordinates[0].toString();
    training.longitude = coordinates[1].toString();

    return await this.fetchFromApi(
      "training-service/api/trainings/",
      {
        method: "POST",
        body: JSON.stringify(training),
      },
      (response: any) => {
        console.log("training added");
        return response.id;
      },
      (error: ApiError) => {
        console.log("error adding training:", error);
        throw error;
      }
    );
  }

  async addImageTraining(trainingId: number, image: any): Promise<void> {
    const name = image.split('/').pop();
    let type = image.split('.').pop();
    if (type === "jpg") {
      type = "jpeg";
    }
    const formData = new FormData();
    formData.append('file', {
      uri: image,
      type: 'image/' + type,
      name: name,
    } as any);
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId + "/image",
      {
        method: "PUT",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },
      (response: any) => {
        console.log("image added");
      },
      (error: ApiError) => {
        console.log("error adding image:", error);
        throw error;
      }
    );
  }

  async getCoordinates(location: string): Promise<any> {
    const location_split = location.split(' ');
    const streetName = location_split[0];
    const streetNumber = location_split[1];
    const address = streetNumber.toString() + ' ' + streetName + ", Buenos Aires" + ", Argentina";

    const key = process.env.GOOGLE_MAPS_API_KEY;
    console.log("envío api:", key);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${key}`
      );
      if (response.ok) {
        const data = await response.json();
        const coords = data.results[0].geometry.location;
        return [coords.lat, coords.lng];
      }
    } catch (err: any) {
      console.error("error fetching coordinates from google maps: ", err);
      const error = new ApiError(err.message, err.code);
      throw error;
    }
  }

  async updateTraining(training: TrainerTraining, trainingId: number): Promise<void> {
    return await this.fetchFromApi(
      "training-service/api/trainings/" + trainingId,
      {
        method: "PUT",
        body: JSON.stringify(training),
      },
      (response: any) => {
        console.log("training updated");
      },
      (error: ApiError) => {
        console.log("error updating training:", error);
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

  async getUserTrainingSessions(userId: number): Promise<trainingSession[]> {
    return await this.fetchFromApi(
      "training-service/api/trainings/user_training/" + userId,
      { method: "GET" },
      (response: trainingSession[]) => response,
      (error: ApiError) => {
        console.log("error getting training sessions:", error);
        return [];
      }
    );
  }

  async getCompleteUserTrainingSessions(userId: number): Promise<CompleteUserTraining[]> {
    // get user training sessions and then for each session get training data
    const sessions = await this.getUserTrainingSessions(userId);
    const trainings = await this.getTrainings();

    const trainingsMap = new Map<number, Training>();
    trainings.forEach(training => {
      trainingsMap.set(training.id, training);
    });
    console.log("1")
    const completeUserTrainings: CompleteUserTraining[] = [];
    sessions.forEach(session => {
      const training = trainingsMap.get(session.trainingPlanId);
      if (training !== undefined) {
        completeUserTrainings.push({
          ...session,
          trainingData: training,
        });
      }
    });
    console.log("2")
    return completeUserTrainings;
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

  async getFavoriteTrainings(userId?: number): Promise<Training[]> {
    const user = await getUserFromStorage();
    if (!userId) {
      userId = user?.id;
    }
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
        throw error;
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

  async addImageUser(image: any): Promise<void> {
    const user = await getUserFromStorage();
    const userId = user?.id;
    const name = image.split('/').pop();
    let type = image.split('.').pop();
    if (type === "jpg") {
      type = "jpeg";
    }
    const formData = new FormData();
    formData.append('file', {
      uri: image,
      type: 'image/' + type,
      name: name,
    } as any);
    return await this.fetchFromApi(
      "user-service/api/users/" + userId + "/profilePicture",
      {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },
      (response: any) => {
        console.log("image added");
      },
      (error: ApiError) => {
        console.log("error adding image:", error);
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
        throw error;
      }
    );
  }

  async followUser(followedUserId: number): Promise<boolean> {
    const user = await getUserFromStorage();
    const userId = user?.id;
    return await this.fetchFromApi(
      "user-service/api/users/follow",
      {
        method: "POST",
        body: JSON.stringify({ id: userId, followedId: followedUserId })
      },
      (response: any) => {
        console.log("user followed");
        // user.
        return true;
      },
      (error: ApiError) => {
        console.log("error following user:", error);
        return false;
      }
    );
  }

  async unfollowUser(followedUserId: number): Promise<boolean> {
    const user = await getUserFromStorage();
    const userId = user?.id;
    return await this.fetchFromApi(
      "user-service/api/users/unfollow",
      {
        method: "POST",
        body: JSON.stringify({ id: userId, followedId: followedUserId })
      },
      (response: any) => {
        console.log("user unfollowed");
        return true;
      },
      (error: ApiError) => {
        console.log("error unfollowing user:", error);
        return false;
      }
    );
  }

  async getFollowedUsers(userId: number): Promise<userInfo[]> {
    return await this.fetchFromApi(
      "user-service/api/users/" + userId + "/following",
      { method: "GET" },
      (response: userInfo[]) => {
        return response
      },
      (error: ApiError) => {
        console.log("error getting followed users:", error);
        return [];
      }
    );
  }

  async getFollowers(userId: number): Promise<userInfo[]> {
    return await this.fetchFromApi(
      "user-service/api/users/" + userId + "/followers",
      { method: "GET" },
      (response: userInfo[]) => {
        console.log("followers:", response);
        return response
      },
      (error: ApiError) => {
        console.log("error getting followers:", error);
        return [];
      }
    );
  }

  async setPushToken(pushToken: string): Promise<void> {
    const user = await getUserFromStorage();
    const userId = user?.id;
    await this.fetchFromApi(
      "user-service/api/users/" + userId + "/set-push-token",
      {
        method: "POST",
        body: JSON.stringify({ token: pushToken })
      },
      (response: any) => {
        console.log("push token set");
      },
      (error: ApiError) => {
        console.error("error setting push token:", error);
      }
    );
  }

  async getPushToken(userId: number): Promise<string> {
    return await this.fetchFromApi(
      "user-service/api/users/" + userId + "/get-push-token",
      { method: "GET" },
      (response: string) => {
        console.log("push token:", response, " for user:", userId);
        return response
      },
      (error: ApiError) => {
        console.log("error getting push token:", error);
        return "";
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
