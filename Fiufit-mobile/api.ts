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

export async function getTrainings(): Promise<Training[]> {
  const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings";
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
        const trainings = await response.json();
        console.log("Training plans:", trainings);
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
  const url = 'https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/favorites/'
  const user = await globalUser.getUser();
  const userId = user?.id;
  const accessToken = (user!.googleUser as any).stsTokenManager.accessToken;
  console.log("getting tfavorite rainings at url: ", url + userId);
  console.log("estoy en getFavoriteTrainings");
  try {
    const response = await fetch(url + userId, {
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
        const favoriteTrainings = await response.json();
        console.log("Training plans:", favoriteTrainings);
        return favoriteTrainings;
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.error("error getting favorite trainings response: ", await response.json());
    }
  } catch (err: any) {
    console.error("error fetching favorite trainings: ", err);
  }
  return [];
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