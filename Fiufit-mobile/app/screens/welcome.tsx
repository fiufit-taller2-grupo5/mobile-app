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
import { authorizeAndGetGoogleFitStepsCaloriesAndDistance } from './profile';
export const BACKGROUND_FETCH_TASK = 'background-fetch';


TaskManager.defineTask(BACKGROUND_FETCH_TASK, async (data) => {
  const api = new API(null);
  console.log(`Got background fetch call at: ${new Date().toISOString()}`);

  const { steps, calories, distance } = await authorizeAndGetGoogleFitStepsCaloriesAndDistance();
  const userGoals = await api.getUserGoals();

  userGoals.forEach(async (goal) => {
    if (goal.type === "Pasos") {
      if (goal.metric <= steps && goal.lastAchieved?.slice(0, 10) !== new Date().toISOString().slice(0, 10)) {
        await api.sendPushNotification(globalUser.user?.id || 0, `¡Felicitaciones! Alcanzaste tu meta ${goal.title}`, `Llegaste a la meta de ${goal.metric} pasos diarios`);
        await api.achieveGoal(goal.id);
      }
    } else if (goal.type === "Calorias" && goal.lastAchieved?.slice(0, 10) !== new Date().toISOString().slice(0, 10)) {
      if (goal.metric <= calories) {
        await api.sendPushNotification(globalUser.user?.id || 0, `¡Felicitaciones! Alcanzaste tu meta ${goal.title}`, `Llegaste a la meta de ${goal.metric} calorías diarias`);
        await api.achieveGoal(goal.id);
      }
    } else if (goal.type === "Distancia" && goal.lastAchieved?.slice(0, 10) !== new Date().toISOString().slice(0, 10)) {
      if (goal.metric <= distance) {
        await api.sendPushNotification(globalUser.user?.id || 0, `¡Felicitaciones! Alcanzaste tu meta ${goal.title}`, `Llegaste a la meta de ${goal.metric} metros diarios`);
        await api.achieveGoal(goal.id);
      }
    }
  })

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
  React.useEffect(() => {
    try {
      registerBackgroundFetchAsync();
    } catch (err) {
      console.log('Background fetch failed to register', err);
    }

  }, []);

  return (
    null
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
        if (!user) {
          setLoadingAuthentication(false);
          return;
        }
        console.log("globl user issss:", user)
        const api = new API(navigation);
        const userFromApi = await api.getUserInfoById(user.id);
        console.log("user from api issss:", userFromApi)
        if (userFromApi.email !== user.email) {
          setLoadingAuthentication(false);
          return;
        }
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

