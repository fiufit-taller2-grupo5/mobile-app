import 'expo-dev-client';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './app/screens/welcome';
import RegisterScreen from './app/screens/register';
import LoginScreen from './app/screens/login';
import TrainingInfoScreen from './app/screens/trainingInfo';
import HomeScreen from './app/screens/home';
import ProfileScreen from './app/screens/profile';
import UsersScreen from './app/screens/users';
import TrainingsScreen from './app/screens/trainings';
import LocationScreen from './app/screens/locationScreen';
import ExtraInformationScreen from './app/screens/extraInformation';
import ChangeNameScreen from './app/screens/editProfile/changeName';
import ChangeHeightScreen from './app/screens/editProfile/changeHeight';
import ChangeWeightScreen from './app/screens/editProfile/changeWeight';
import ChangeDateScreen from './app/screens/editProfile/changeBirthDate';
import ChangeInterestsScreen from './app/screens/editProfile/changeInterests';
import ChangeRoleScreen from './app/screens/editProfile/changeRole';
import CreateTrainingScreen from './app/screens/createTraining';
import ChangeLocationScreen from './app/screens/editProfile/changeLocation';
import FavoritesScreen from './app/screens/favorites';
import FavoriteTrainingInfoScreen from './app/screens/favoriteTrainingInfoScreen';
import TrainerTrainingsScreen from './app/screens/trainerTrainings';
import TrainerTrainingInfoScreen from './app/screens/trainerTrainingsInfo';
import RatingsScreen from './app/screens/ratings';
import RateTrainingScreen from './app/screens/rateTraining';

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
            component={WelcomeScreen}/>
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen} />
          <Stack.Screen
            name="LocationScreen"
            component={LocationScreen}/>
          <Stack.Screen
            name="ExtraInfoScreen"
            component={ExtraInformationScreen}
            initialParams={{streetName: '', streetNumber: 0}}/>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen} />
          <Stack.Screen
            name="UsersScreen"
            component={UsersScreen} />
          <Stack.Screen
            name="TrainingsScreen"
            component={TrainingsScreen} />
          <Stack.Screen
            name="FavoritesScreen"
            component={FavoritesScreen} />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen} />
          <Stack.Screen
            name="TrainingInfoScreen"
            component={TrainingInfoScreen} />
          <Stack.Screen
            name="FavoriteTrainingInfoScreen"
            component={FavoriteTrainingInfoScreen} />
          <Stack.Screen
            name="ChangeNameScreen"
            component={ChangeNameScreen} />
          <Stack.Screen
            name="ChangeHeightScreen"
            component={ChangeHeightScreen} />
          <Stack.Screen
            name="ChangeWeightScreen"
            component={ChangeWeightScreen} />
          <Stack.Screen
            name="ChangeDateScreen"
            component={ChangeDateScreen} />
          <Stack.Screen
            name="ChangeInterestsScreen"
            component={ChangeInterestsScreen} />
          <Stack.Screen
            name="ChangeLocationScreen"
            component={ChangeLocationScreen} />
          <Stack.Screen
            name="ChangeRoleScreen"
            component={ChangeRoleScreen} />
          <Stack.Screen
            name="CreateTrainingScreen"
            component={CreateTrainingScreen} />
          <Stack.Screen
            name="TrainerTrainingsScreen"
            component={TrainerTrainingsScreen} />
          <Stack.Screen
            name="TrainerTrainingInfoScreen"
            component={TrainerTrainingInfoScreen} />
          <Stack.Screen
            name="RatingsScreen"
            component={RatingsScreen} 
            initialParams={{trainingData: null}}/>
          <Stack.Screen
            name="RateTrainingScreen"
            component={RateTrainingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
