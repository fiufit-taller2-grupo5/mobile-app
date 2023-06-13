import { Box, Text, extendTheme, FlatList, HStack, Spacer, Button, View } from 'native-base';
import { editProfileStyles } from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { ProgressChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';
import TrainingsList from '../components/trainings/trainingsList';

const screens = ['ChangeNameScreen', 'ChangeHeightScreen', 'ChangeWeightScreen', 'ChangeDateScreen', 'ChangeInterestsScreen', 'ChangeLocationScreen', 'ChangeRoleScreen']

const fields = [
  { name: "Nombre completo", id: 0 }, // no hay endpoint para cambiar esto
  { name: "Altura", id: 1 },
  { name: "Peso", id: 2 },
  { name: "Fecha de nacimiento", id: 3 },
  { name: "Intereses", id: 4 },
  { name: "Dirección", id: 5 },
  { name: "Rol", id: 6 }, // se guarda en el contexto
];

interface Props {
  navigation: any;
}

export default function ProfileScreen(props: Props) {
  const { navigation } = props;
  const [dailySteps, setDailySteps] = useState(0);
  const [dailyDistance, setDailyDistance] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);

  const theme = extendTheme({
    components: {
      Box: {
        defaultProps: {
          bg: '#fff',
        }
      }
    }
  });

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

    testGoogleFit();

  }, []);

  const [userInformation, setUserInformation] = useState(["", "", "", "", "", "", ""]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getUserInfo = async () => {
        const userInfoStored = await globalUser.getUser();

        if (userInfoStored === null) {
          return;
        }

        const details = await globalUser.getUserMetadata();
        console.log("details:", details);

        if (details === null || details === undefined) { // if the user has skipped the registration form
          setUserInformation([userInfoStored.name, "", "", "", "", "", userInfoStored!.role]);
          return;
        }

        const interests = details!.interests

        let birthdate = details!.birthDate; // from "2000-09-22T17:43:38.879Z" to "22/09/2000"
        if (birthdate !== null) {
          birthdate = birthdate.split('T')[0].split('-').reverse().join('/');
        }

        console.log("there is user info stored:", userInfoStored, "details:", details, "interests:", interests);
        if (userInfoStored && details && interests) {
          setUserInformation([userInfoStored.name, details.height?.toString() ?? "", details.weight?.toString() ?? "", birthdate ?? "", interests.join(', '), details.location ?? "", userInfoStored.role]);
        }
      }
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  return <View style={{ flex: 1 }} backgroundColor="#fff">
    <Box style={editProfileStyles.nameBox}>
      <Text style={editProfileStyles.text}>{userInformation[0]}</Text>
      <View height={20} flexDirection="row" alignItems="center" justifyContent="space-evenly">
        <LoadableButton
          // textColor={"#FF6060"}
          customStyles={{
            width: 125,
            //backgroundColor: "#FFFFFF",
          }}
          onPress={async () => { }}
          text={
            <>
              <Text fontWeight={"bold"}>10 Trainings</Text>
            </>
          }
        />
        <LoadableButton
          customStyles={{ width: 125 }}
          onPress={async () => { }}
          text={
            <>
              <Text fontWeight={"bold"}>40 Followers</Text>
            </>
          }
        />
        <LoadableButton
          customStyles={{ width: 125 }}
          onPress={async () => { }}
          text={
            <>
              <Text fontWeight={"bold"}>Following 23</Text>
            </>
          }
        />
      </View>
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
    </Box>
    <Text style={editProfileStyles.favTrainings} fontSize={13}>Entrenamientos Favoritos</Text>
    <TrainingsList
      userId={globalUser.user?.id}
      onlyFavorites
      navigation={navigation}
    />
  </View>;
}
