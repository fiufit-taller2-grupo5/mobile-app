import * as React from 'react';
import { welcomeStyles } from '../styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme, VStack } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Title from '../components/welcome/title';
import Body from '../components/welcome/body';
import { View, Text, Button } from 'native-base';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { API, apiGatewayHealthCheck } from '../../api';
import { ActivityIndicator } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'
import * as LocalAuthentication from 'expo-local-authentication';
import globalUser from '../../userStorage';
export const BACKGROUND_FETCH_TASK = 'background-fetch';


TaskManager.defineTask(BACKGROUND_FETCH_TASK, async (data) => {
  console.log(data)
  const api = new API(null);
  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  //apiGatewayHealthCheck(new Date(now).toISOString())
  if (!GoogleFit.isAuthorized) {
    const allScopes: string[] = Object.values(Scopes);
    const options = {
      scopes: allScopes as Scopes[],
    }
    GoogleFit.authorize(options)
      .then(async authResult => {
        if (authResult.success) {
          console.log("AUTH_SUCCESS");
          let res = await GoogleFit.getDailySteps();
          console.log(res);
        } else {
          console.log("AUTH_DENIED", authResult.message);
        }
      })
      .catch(() => {
        console.log("AUTH_ERROR");
      })
  } else {
    try {
      const userGoals = await api.getUserGoals();
      let res = await GoogleFit.getDailySteps();
      let steps = 0;
      let estimated = res.find(results => results.source === "com.google.android.gms:estimated_steps");
      if (estimated?.steps[0] !== undefined) {
        console.log("actual steps:", estimated?.steps[0].value);
        steps = estimated?.steps[0].value || 0;
      }
      let stepGoals = userGoals.find(goal => goal.type === "Pasos");
      console.log("steps goals", stepGoals);
      if (stepGoals) {
        if (stepGoals.metric <= steps) {
          console.log("sending");

          await api.sendPushNotification(globalUser.user?.id || 0, "¡Felicitaciones! Has alcanzado tu meta de pasos diarios", `Llegaste a la meta de ${stepGoals.metric} pasos diarios`);
          console.log("sent");
          // await api.updateGoal({
          //   title: stepGoals.title,
          //   description: stepGoals.description,
          //   type: stepGoals.type,
          //   metric: stepGoals.metric,
          //   achieved: true,
          //   athleteId: stepGoals.athleteId,
          // }, stepGoals.id);
        }
      }

      console.log(res);

    } catch (e) {
      console.log("no user stored");
      return;
    }
  }
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60, // every 1 minute
    stopOnTerminate: false, // android only
    startOnBoot: true, // android only
  });
}
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export const BackgroundFetchData = ({ navigation }: any) => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState<BackgroundFetch.BackgroundFetchStatus | null>(null);


  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  React.useEffect(() => {
    try {
      registerBackgroundFetchAsync();
    } catch (err) {
      console.log('Background fetch failed to register', err);
    }

  }, []);

  return (
    <View>
      <Text>
        Background fetch status:{' '}
        <Text>
          {status && BackgroundFetch.BackgroundFetchStatus[status]}
        </Text>
      </Text>
      <Text>
        Background fetch task name:{' '}
        <Text>
          {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
        </Text>
      </Text>
      <View></View>
      <Button
        onPress={toggleFetchTask}
      >
        <Text>
          {isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        </Text>
      </Button>
    </View>
  );
}


export default function WelcomeScreen({ navigation }: NativeStackScreenProps<any, any>) {

  const [loadingAuthentication, setLoadingAuthentication] = React.useState(false);

  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          background: '#FF6060',
        },
      },
      Text: {
        variants: {
          heading1: {
            color: '#FF6060'
          },
          heading2: {
            color: '#616161'
          },
          heading3: {
            color: '#000000'
          },
          paragraph: {
            color: '#212121',
          }
        }
      }
    }
  });

  React.useEffect(() => {

    globalUser.setNavigation(navigation)

    const biometricLogin = async () => {
      setLoadingAuthentication(true);
      let user;
      try {
        user = await globalUser.getUser();
      } catch (e) {
        console.log("no user stored");
        setLoadingAuthentication(false);
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        setLoadingAuthentication(false);
        return;
      }
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        setLoadingAuthentication(false);
        return;
      }
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Ingresá tu huella para seguir",
        cancelLabel: "Cancelar",
        fallbackLabel: "Usar contraseña",

      });
      if (success) {
        console.log("biometric login success", user);
        navigation.navigate('HomeScreen');
      }
    }
    biometricLogin();

  }, [])


  return <SafeAreaProvider>
    <NativeBaseProvider theme={theme}>
      <BackgroundFetchData navigation={navigation} />
      <VStack
        space={6}
        style={[welcomeStyles.mainVerticalStack]}
        width={"full"}
        height={"full"}
      >
        {loadingAuthentication ?
          <View justifyContent={"center"} alignItems="center">
            <Text>Ingresando...</Text>
            <ActivityIndicator color={"#ff6060"} size="large" style={{ marginTop: 20 }} />
          </View> : <>
            <Title />
            <Body navigation={navigation} /></>
        }
      </VStack>
    </NativeBaseProvider>
  </SafeAreaProvider>;
}
