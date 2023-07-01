import { NativeBaseProvider } from 'native-base';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import globalUser from '../../userStorage';
import TrainingsScreen from './trainings';
import ProfileScreen from './profile';
import UsersScreen from './users';
import InboxScreen from './inbox';
import TrainerTrainingsScreen from './trainerTrainings';
import SettingsScreen from './settings';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }: any) {
    const screenOptions = {
        headerShown: false,
        tabBarStyle: {
            height: 60,

        },
        tabBarItemStyle: {
            margin: 5,
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
        <Tab.Navigator screenOptions={screenOptions} initialRouteName='Trainings'>
            <Tab.Screen
                name="Users" component={UsersScreen}
                options={
                    {
                        tabBarLabel: 'Usuarios', tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name='users' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
            />
            <Tab.Screen
                name="Inbox" component={InboxScreen}
                options={
                    {
                        tabBarLabel: 'Mensajes', tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name='inbox' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
            />
            {isAthlete && <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Entrenamientos', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='dumbbell' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Trainings" component={TrainingsScreen}
            />}
            {!isAthlete && <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Entrenamientos', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='dumbbell' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Trainings" component={TrainerTrainingsScreen}
            />}
            <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Perfil', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='account' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Profile" component={ProfileScreen}
            />
            <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Ajustes', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='cog' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Settings" component={SettingsScreen}
            />
        </Tab.Navigator>
    </NativeBaseProvider>;
}