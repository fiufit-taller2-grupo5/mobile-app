import { NativeBaseProvider, Text } from 'native-base';
import * as React from 'react';
import LoginScreen from './login';
import RegisterScreen from './register';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return <NativeBaseProvider>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{borderTopRightRadius:30, borderTopLeftRadius:30, height:"6%"} }}>
            <Tab.Screen
                name="Users" component={LoginScreen}
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
                name="Trainings" component={RegisterScreen}
            />
            <Tab.Screen
                options={
                    {tabBarLabel: 'Favorites', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='heart' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
                name="Favorites" component={LoginScreen} 
            />
            <Tab.Screen
                options={
                    {tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='account' color={color} size={size} />),
                    tabBarActiveTintColor: '#FF6060'}
                }
                name="Profile" component={LoginScreen}
            />
        </Tab.Navigator>
    </NativeBaseProvider>;
}