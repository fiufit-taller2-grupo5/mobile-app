import { User } from "firebase/auth";
import globalUser, { userInfo } from "./userStorage";
import { trainingReview } from "./app/screens/rateTraining";


const getInternalIdFromResponse = (response: any): string => {
  // receives a response from the backend like "{"status": "User Jdjde with id 10 created"}"
  // returns a string similar to "10"
  console.log("internal id receiving response", response.status);
  const res = response.status.split("with id ")[1].split(" ")[0];
  console.log(res);
  return res;
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiBaseUrl = 'https://api-gateway-prod-szwtomas.cloud.okteto.net/';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'connection': 'keep-alive',
  },
});

// try {
//   // do what you want with axios
//   // axios.get('https://example.com/some-api');
// } catch (error) {
//   // check if the error was thrown from axios
//   if (axios.isAxiosError(error)) {
//     // do something
//     // or just re-throw the error
//     throw error;
//   } else {
//     // do something else
//     // or creating a new error
//     throw new Error('different error than axios');
//   }
// }

export const createUser = async (user: User, emailRegisterName: string = 'default name'): Promise<void | AxiosResponse> => {
  const data = {
    name: user.displayName ? user.displayName as string : emailRegisterName,
    uid: user.uid,
    email: user.email as string,
  };
  const token = (user as any).stsTokenManager.accessToken;
  console.log('DATA:', data, 'token:', token);

  try {
    const response = await axiosInstance.post('/user-service/api/users', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'login-mobile-app': 'true',
      },
    });
    const userInfo = response.data;
    userInfo.googleUser = user;
    userInfo.role = 'Atleta';
    await globalUser.setUser(userInfo);
    console.log('user created');
    return response;

  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      console.warn('ERROR CREATING USER:', error.message, error.response?.data);
      return error.response;
    } else {
      console.error(error);
      alert('CREATE USER ERROR:' + error.message);
      return error;
    }
  }
};

// Reusable function for making API requests
const makeRequest = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response = await axiosInstance(config);
    return response.data as T;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error('Request error:', err.message, err.response);
    } else {
      console.error(err);
    }
  }
  
  return null;
};

export async function getInterests(url: string): Promise<string[] | null> {
  console.log('getting interests at url: ', url);
  await globalUser.verifyUserMetadataExists();
  const user = await globalUser.getUser();
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;

  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    url,
  };

  const interests = await makeRequest<string[]>(config);
  if (interests) {
    console.log('possible interests:', interests);
    return interests;
  }
  return null;
}

export async function getResetPasswordUrl(email: string): Promise<string | null> {
  const url = `${apiBaseUrl}/user-service/api/users/changepassword`;
  console.log('getting reset password url: ', url);

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
    },
    data: JSON.stringify({ email: email }),
    url,
  };

  const urlResponse = await makeRequest<string>(config);
  if (urlResponse) {
    console.log('reset password url:', urlResponse);
    return urlResponse;
  }
  return null;
}

export async function getUserInfoByEmail(email: string, user: User) : Promise<userInfo | Error> {
  const url = `${apiBaseUrl}/user-service/api/users/email/${email}`;
  console.log('getting user info by email: ', url);

  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${(user as any).stsTokenManager.accessToken}`,
    },
    url,
  };

  const userInfo = await makeRequest<userInfo>(config);
  if (userInfo) {
    console.log('user info:', userInfo);
    return userInfo;
  }
  return Error("User not found");
}

export async function getUserInfoById(id: number, user: User, userDetails: Boolean): Promise<userInfo | Error> {
  let url = `${apiBaseUrl}/user-service/api/users/`;
  console.log('getting user info by email: ', url);

  // if userDetails is true add id to path params, else add id to query params
  if (userDetails) {
    url = `${url}/${id}`;
  } else {
    url = `${url}?id=${id}`;
  }
  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${(user as any).stsTokenManager.accessToken}`,
    },
    url,
  };

  const userInfo = await makeRequest<userInfo>(config);
  if (userInfo) {
    console.log('user info:', userInfo);
    return userInfo;
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

export async function getTrainings(isTrainer: boolean = false, filterRule: string | null = null, filterValue: string | null = null): Promise<Training[]> {
  let url = `${apiBaseUrl}/training-service/api/trainings?`;
  const user = await globalUser.getUser();
  const userId = user!.id;
  
  if (isTrainer) {
    url += `trainer_id=${userId}&`;
  }
  if (filterRule && filterValue) {
    url += `${filterRule}=${filterValue}&`;
  }

  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  
  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    url,
  };

  const trainings = await makeRequest<Training[]>(config);
  if (trainings) {
    console.log('trainings:', trainings);
    return trainings;
  }
  return [];
}


export async function getFavoriteTrainings(): Promise<Training[]> {
  const user = await globalUser.getUser();
  const userId = user?.id;
  const url = `${apiBaseUrl}/training-service/api/trainings/favorites/${userId}`;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  console.log("getting favorite trainings at url: ", url);
  console.log("estoy en getFavoriteTrainings");
  
  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    url,
  };

  const trainings = await makeRequest<Training[]>(config);
  if (trainings) {
    console.log('favorite trainings:', trainings);
    return trainings;
  }
  return [];
}


export async function addFavoriteTraining(trainingPlanId: number): Promise<boolean> {
  const url = `${apiBaseUrl}/training-service/api/trainings/`;
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    url: `${url}${trainingPlanId}/favorite/${userId}`,
  };

  const response = await makeRequest<Training>(config);
  if (response) {
    console.log('favorite training:', response);
    return true;
  }
  return false;
}


export async function quitFavoriteTraining(trainingPlanId: number): Promise<boolean> {
  const url = `${apiBaseUrl}/training-service/api/trainings/`;
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;

  const config: AxiosRequestConfig = {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    url: `${url}${trainingPlanId}/favorite/${userId}`,
  };

  const response = await makeRequest<Training>(config);
  if (response) {
    console.log('quit favorite training:', response);
    return true;
  }
  return false;
}

export async function addTraining(training: TrainerTraining): Promise<boolean> {
  const url = `${apiBaseUrl}/training-service/api/trainings/`;
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  training.trainerId = userId;

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    url,
    data: JSON.stringify(training),
  };
  
  const response = await makeRequest<Training>(config);
  if (response) {
    console.log('added training:', response);
    return true;
  }
  return false;
}

export async function addTrainingReview(trainingId: number, review: trainingReview): Promise<Boolean> {
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  const url = `${apiBaseUrl}/training-service/api/trainings/${trainingId}/review/${userId}`;

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    url,
    data: JSON.stringify(review),
  };

  const response = await makeRequest<Training>(config);
  if (response) {
    console.log('added training review:', response);
    return true;
  }
  return false;
}

export async function getTrainingReviews(trainingId: number): Promise<trainingReview[]> {
  const user = await globalUser.getUser();
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  const url = `${apiBaseUrl}/training-service/api/trainings/${trainingId}/reviews`;

  const config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    url,
  };

  const response = await makeRequest<trainingReview[]>(config);
  if (response) {
    console.log('training reviews:', response);
    return response;
  }
  return [];
}