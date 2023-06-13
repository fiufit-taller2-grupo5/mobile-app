import { Box, Text, extendTheme, FlatList, HStack, Spacer, Button, View, NativeBaseProvider } from 'native-base';
import { editProfileStyles } from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { ProgressChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';
import TrainingsList from '../components/trainings/trainingsList';
import { API } from '../../api';
import { userInfo } from '../../asyncStorageAPI';


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

  const [user, setUser] = useState<userInfo | null>();

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
        }
        console.log("user", user);
        setUser(user);
        if (user) {
          setName(user.name);
          const trainingSessions = await api.getUserTrainingSessions(user.id);
          setUserTrainingsCount(trainingSessions.length);
          const followers = await api.getFollowers(user.id);
          setUserFollowersCount(followers.length);
          const following = await api.getFollowedUsers(user.id);
          setUserFollowingCount(following.length);
        }
      }
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const onPressFollowers = async () => {
    navigation.navigate("SelectedUsersScreen", { isFollowers: true, userId: user!.id });
  }

  const onPressFollowing = () => {
    navigation.navigate("SelectedUsersScreen", { isFollowers: false, userId: user!.id });
  }

  console.log(userId, globalUser.user?.id);


  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
    <Box style={editProfileStyles.nameBox}>
      <Text style={editProfileStyles.text}>{name}</Text>
      <View height={20} flexDirection="row" alignItems="center" justifyContent="space-evenly">
        {userId === undefined && <LoadableButton
          customStyles={{
            width: 130,
          }}
          hideTextWhileLoading
          overrideLoading={userTrainingsCount === null}
          onPress={async () => { }}
          text={
            <>
              <Text fontWeight={"bold"}>{userTrainingsCount} Sesiones</Text>
            </>
          }
        />}
        <LoadableButton
          hideTextWhileLoading
          customStyles={{ width: 130 }}
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
          customStyles={{ width: 130 }}
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
    <Text style={editProfileStyles.favTrainings} fontSize={13}>Entrenamientos Favoritos</Text>
    <TrainingsList
      userId={userId ? userId : globalUser.user?.id}
      onlyFavorites
      navigation={navigation}
    />
  </View></NativeBaseProvider>;
}
