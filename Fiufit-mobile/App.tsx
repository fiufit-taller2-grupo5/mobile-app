import * as React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/welcome';
import RegisterScreen from './app/screens/register';
import LoginScreen from './app/screens/login';
import HomeScreen from './app/screens/home';
import ExtraInformationScreen from './app/screens/extraInformation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    BebasNeue: require('./assets/fonts/BebasNeue-Regular.ttf'),
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
  });
  if (!fontsLoaded) { return null; }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="WelcomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={ WelcomeScreen }
          />
          <Stack.Screen
            name="RegisterScreen"
            component={ RegisterScreen } />
          <Stack.Screen
            name="LoginScreen"
            component={ LoginScreen } />
          <Stack.Screen
            name="extraInfo"
            component={ ExtraInformationScreen } />
          <Stack.Screen
            name="HomeScreen"
            component={ HomeScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
