import { Box, Text, View, NativeBaseProvider, Button, Image, HStack } from 'native-base';
import { editProfileStyles } from '../styles';
import { ProgressChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';
import TrainingsList from '../components/trainings/trainingsList';
import { API } from '../../api';
import { userInfo } from '../../asyncStorageAPI';
import { MaterialIcons } from "@expo/vector-icons";
import { collection, query, where, getDocs, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FollowButton } from '../components/users/followButton';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

export default function ProfileScreen(props: Props) {
  const { navigation, route } = props;
  const userId = route?.params?.userId;

  const [dailySteps, setDailySteps] = useState(0);
  const [dailyDistance, setDailyDistance] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);

  const [userTrainingsCount, setUserTrainingsCount] = useState<number | null>(null);
  const [userFollowersCount, setUserFollowersCount] = useState<number | null>(null);
  const [userFollowingCount, setUserFollowingCount] = useState<number | null>(null);

  const [image, setImage] = useState(null);
  const [refreshTrainingList, setRefreshTrainingList] = useState(false);

  const [following, setFollowing] = useState(false);

  const [user, setUser] = useState<userInfo | null>();
  const [role, setRole] = useState("Atleta");
  const api = new API(navigation);

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 96, 96, ${opacity})`,
    barPercentage: 0.8,
    useShadowColorFromDataset: false,
  };

  const dailyStepsTarget = 10000;
  const dailyDistanceTarget = 10000;
  const dailyCaloriesTarget = 2000;
  const data = {
    labels: ["Pasos", "Distancia", "Calorías"], // optional
    data: [dailySteps / dailyStepsTarget, dailyDistance / dailyDistanceTarget, dailyCalories / dailyCaloriesTarget]
  };

  useEffect(() => {
    const updateDailyActivity = async () => {
      updateDailySteps();
      updateDailyDistance();
      updateDailyCalories();
    }

    const updateDailyCalories = async () => {
      try {
        const today = new Date(); // Current date and time
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00
        const todayISOString = today.toISOString(); // Convert to ISO string
        const opts = {
          startDate: todayISOString,
          endDate: new Date().toISOString(), // required ISO8601Timestamp
          basalCalculation: true, // optional, to calculate or not basalAVG over the week
        }
        let res = await GoogleFit.getDailyCalorieSamples(opts);
        if (res.length > 0) {
          let estimated = res[0].calorie;
          console.log(estimated);
          setDailyCalories(estimated || 0);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const updateDailyDistance = async () => {
      try {
        const today = new Date(); // Current date and time
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00
        const todayISOString = today.toISOString(); // Convert to ISO string

        const opts = {
          // today at 00:00:00 AM is startDAte
          startDate: todayISOString,
          endDate: new Date().toISOString(), // required ISO8601Timestamp
          bucketUnit: BucketUnit.DAY, // required, DAY or HOUR
          bucketInterval: 1, // required, 1 or 2 for HOUR bucketUnit or 1 - 24 for DAY bucketUnit
        }
        let res = await GoogleFit.getDailyDistanceSamples(opts);
        if (res.length > 0) {
          let estimated = res[0].distance
          console.log(estimated);
          setDailyDistance(estimated || 0);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const updateDailySteps = async () => {
      try {
        let res = await GoogleFit.getDailySteps();
        let estimated = res.find(results => results.source === "com.google.android.gms:estimated_steps");
        if (estimated?.steps[0] !== undefined) {
          console.log(estimated?.steps[0].value);
          setDailySteps(estimated?.steps[0].value || 0);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const testGoogleFit = async () => {
      await GoogleFit.checkIsAuthorized();
      console.log(GoogleFit.isAuthorized);

      if (!GoogleFit.isAuthorized) {
        const allScopes: string[] = Object.values(Scopes);
        const options = {
          scopes: allScopes as Scopes[],
        }
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {

              console.log("AUTH_SUCCESS");
              updateDailyActivity();
            } else {
              console.log("AUTH_DENIED", authResult.message);
            }
          })
          .catch(() => {
            console.log("AUTH_ERROR");
          })
      } else {
        updateDailyActivity();
      }
    }

    if (!userId) {
      testGoogleFit();
    }

  }, []);

  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const api = new API(navigation);
      const getUserInfo = async () => {
        let user: userInfo | undefined | null;
        if (userId) {
          user = await api.getUserInfoById(userId);
        } else {
          user = await globalUser.getUser();
          if (user && user.id) {
            user = await api.getUserInfoById(user.id);
          }
        }
        console.log("USER -----------:", user);
        setUser(user);
        if (user) {
          setName(user.name);
          const trainingSessions = await api.getUserTrainingSessions(user.id);
          setUserTrainingsCount(trainingSessions.length);
          const followers = await api.getFollowers(user.id);
          setFollowing(followers.find((follower) => follower.id === globalUser.user?.id) !== undefined);
          setUserFollowersCount(followers.length);
          const following = await api.getFollowedUsers(user.id);
          setUserFollowingCount(following.length);
          if (user.multimedia && user.multimedia !== null && user.multimedia !== undefined && user.multimedia.length > 0) {
            setImage(user.multimedia);
          }
        }
      }
      // if (user) {
      //   setRole(user.role);
      //   console.log("role: ", role);
      // }
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const onPressFollowers = () => {
    navigation.navigate("SelectedUsersScreen", { isFollowers: true, userId: user!.id });
  }

  const onPressFollowing = () => {
    navigation.navigate("SelectedUsersScreen", { isFollowers: false, userId: user!.id });
  }

  const onPressInbox = async () => {
    try {
      const user = await globalUser.getUser();
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participantIds", "==", [user!.id, userId].sort().join("_")),
      );

      const querySnapshot = await getDocs(q);

      console.log("the query", q, querySnapshot.docs);

      const chatsMetadata = querySnapshot.docs.map(doc => {
        console.log("doc data: ", doc.data());
        console.log("doc id: ", doc.id);
        const data = doc.data();
        data.lastMessage.createdAt = data.lastMessage.createdAt.toDate().toLocaleDateString();
        data._id = doc.id;
        data._currentUserId = user?.id;
        return data;
      });

      if (chatsMetadata.length > 0) {
        navigation.navigate("InboxInfoScreen", { chatMetadata: chatsMetadata[0] });
      } else {
        const participants: any = {};
        participants[user!.id] = { name: user!.name, lastRead: new Date() };
        participants[userId] = { name: name, lastRead: new Date() };

        const chat = {
          participants: participants,
          participantIds: [user!.id, userId].sort().join("_"),
          lastMessage: {
            _id: "",
            text: "Inicia la conversación!",
            createdAt: new Date(),
          }
        }

        const docRef = await addDoc(collection(db, "chats"), chat);
        const chatMetadata = await getDoc(docRef);

        const data: any = chatMetadata.data();
        data._id = chatMetadata.id;
        data._currentUserId = user?.id;

        console.log("chat metadata", data);
        navigation.navigate("InboxInfoScreen", { chatMetadata: data });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const onFollow = async (userId: number) => {
    await api.followUser(userId);
  };

  const onUnfollow = async (userId: number) => {
    await api.unfollowUser(userId);
  };

  console.log("the role", role);

  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
    <ScrollView
      refreshControl={<RefreshControl refreshing={false} onRefresh={
        () => {
          setRefreshTrainingList(oldRefreshing => !oldRefreshing);
        }
      } />}
    >
      <Box style={editProfileStyles.nameBox}>
        <Text style={editProfileStyles.text}>{name}</Text>
        <View
          alignItems={"center"}
          justifyContent="space-between"
          height={100}
          margin={5}
        >
          <Image
            source={(image !== null) ? { uri: image } : require("../../assets/images/user_logo.jpg")}
            alt="image"
            size="lg"
            borderRadius={10}
          />
        </View>
        <View flexDirection={"row"} width={'100%'} justifyContent={"center"}>
          {userId != undefined && <FollowButton
            customStyles={{
              borderColor: "#FF6060",
              borderWidth: 1,
            }}
            forceLoading={userFollowersCount === null}
            userId={userId}
            following={following}
            onFollow={() => onFollow(userId)}
            onUnfollow={() => onUnfollow(userId)}
          />}
          {userId !== undefined && <Button
            style={{
              bottom: 0,
              backgroundColor: "#fff",
              padding: 0,
              paddingTop: 8,
            }}
            onPress={async () => { onPressInbox() }}
          >
            <MaterialIcons name="inbox" style={{ margin: 0, padding: 0 }} size={30} color="#000000" />
          </Button>}
        </View>
        <View height={20} flexDirection="row" alignItems="center" justifyContent="center">
          {userId === undefined && <LoadableButton
            customStyles={{
              width: 120,
            }}
            hideTextWhileLoading
            overrideLoading={userTrainingsCount === null}
            onPress={async () => { navigation.navigate("UserTrainingsScreen"); }}
            text={
              <>
                <Text fontWeight={"bold"}>{userTrainingsCount} Sesiones</Text>
              </>
            }
          />}
          <LoadableButton
            hideTextWhileLoading
            customStyles={{
              width: 120,
              marginRight: 5,
              marginLeft: 5
            }}
            overrideLoading={userFollowersCount === null}
            onPress={async () => { onPressFollowers() }}
            text={
              <>
                <Text fontWeight={"bold"}>{userFollowersCount} Seguidores</Text>
              </>
            }
          />
          <LoadableButton
            hideTextWhileLoading
            customStyles={{ width: 120 }}
            overrideLoading={userFollowingCount === null}
            onPress={async () => { onPressFollowing() }}
            text={
              <>
                <Text fontWeight={"bold"}>{userFollowingCount} Siguiendo</Text>
              </>
            }
          />
        </View>

        {
          (!userId || userId === globalUser.user?.id) &&
          <ProgressChart
            absolute
            data={data}
            width={380}
            height={260}
            strokeWidth={25}
            radius={25}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        }
      </Box>
      {role === "Atleta" && <Text style={editProfileStyles.favTrainings} fontSize={13}>Entrenamientos Favoritos</Text>}
      {role === "Atleta" && <TrainingsList
        usingScrollView={true}
        forceRefresh={refreshTrainingList}
        userId={userId ? userId : globalUser.user?.id}
        onlyFavorites
        navigation={navigation}
      />
      }
    </ScrollView>
  </View></NativeBaseProvider>;
}
