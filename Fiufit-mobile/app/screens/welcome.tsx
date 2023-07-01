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
import { apiGatewayHealthCheck } from '../../api';
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import * as LocalAuthentication from 'expo-local-authentication';
import globalUser from '../../userStorage';
import InboxNotifications from '../components/inbox/inboxNotifications';
export const BACKGROUND_FETCH_TASK = 'background-fetch';


TaskManager.defineTask(BACKGROUND_FETCH_TASK, async (data) => {
  console.log(data)
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
    let res = await GoogleFit.getDailySteps();
    console.log(res);
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

export const BackgroundFetchData = () => {
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
      let user;
      try {
        user = await globalUser.getUser();
      } catch (e) {
        console.log("no user stored");
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        return;
      }
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return;
      }
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        console.log("biometric login success", user);
        navigation.navigate('HomeScreen');
      }
    }
    biometricLogin();

  }, [])


  return <SafeAreaProvider>
    <NativeBaseProvider theme={theme}>
      <BackgroundFetchData />
      <VStack
        space={6}
        style={[welcomeStyles.mainVerticalStack]}
        width={"full"}
        height={"full"}
      >
        <Title />
        <Body navigation={navigation} />
      </VStack>
    </NativeBaseProvider>
  </SafeAreaProvider>;
}
