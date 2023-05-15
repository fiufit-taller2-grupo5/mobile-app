import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import globalUser from '../../userStorage';
import TrainingsScreen from './trainings';
import ProfileScreen from './profile';
import UsersScreen from './users';
import FavoritesScreen from './favorites';
import TrainerTrainingsScreen from './trainerTrainings';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }: any) {
    const screenOptions = {
        headerShown: false,
        tabBarStyle:{
          height:"8%",
          borderTopRightRadius:30, 
          borderTopLeftRadius:30,
        },
        tabBarItemStyle:{
          margin:5,
          borderRadius:10,
        },
    };

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            async function getCurrentRole() {
                const role = await globalUser.getRole();
                setRole(role);
            }
            getCurrentRole();
        });
        return listener;
      }, [navigation]);

    const isAthlete = role === 'Atleta';

    return <NativeBaseProvider>
        <Tab.Navigator {... { screenOptions }} >
            <Tab.Screen
                name="Users" component={UsersScreen}
                options={
                    {tabBarLabel: 'Users', tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name='users' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
            />
            {isAthlete && <Tab.Screen
                options={
                    {tabBarLabel: 'Trainings', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='dumbbell' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
                name="Trainings" component={TrainingsScreen}
            />}
            {!isAthlete && <Tab.Screen
                options={
                    {tabBarLabel: 'Trainings', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='dumbbell' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
                name="Trainings" component={TrainerTrainingsScreen}
            />}
            {isAthlete && <Tab.Screen
                options={{
                    tabBarLabel: 'Favorites', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='heart' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'
                }}
                name="Favorites" component={FavoritesScreen} 
            />}
            <Tab.Screen
                options={
                    {tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='account' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
                name="Profile" component={ProfileScreen}
            />
        </Tab.Navigator>
    </NativeBaseProvider>;
}