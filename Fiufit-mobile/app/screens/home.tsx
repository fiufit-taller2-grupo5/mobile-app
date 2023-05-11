import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import TrainingsScreen from './trainings';
import ProfileScreen from './profile';
import UsersScreen from './users';
import FavoritesScreen from './favorites';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
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

    // TODO: use context to get user role
    const isAthlete = true;

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
            <Tab.Screen
                options={
                    {tabBarLabel: 'Trainings', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='dumbbell' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
                name="Trainings" component={TrainingsScreen}
            />
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