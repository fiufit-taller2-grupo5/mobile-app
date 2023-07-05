import { NativeBaseProvider } from 'native-base';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import globalUser from '../../userStorage';
import TrainingsScreen from './trainings';
import ProfileScreen from './profile';
import MetricsScreen from './metrics';
import RecommendationsScreen from './recommendationsScreen';
import UsersScreen from './users';
import InboxScreen from './inbox';
import NotificationsScreen from './notifications';
import TrainerTrainingsScreen from './trainerTrainings';
import SettingsScreen from './settings';
import * as Notifications from 'expo-notifications';
import GoalsScreen from './goals';
import { registerForPushNotificationsAsync } from '../../notificationsUtils';

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

    useEffect(() => {
        const getToken = async () => {
            registerForPushNotificationsAsync();
            const token = await Notifications.getExpoPushTokenAsync();
            const tokenData = await token.data;
            globalUser.setPushToken(tokenData);
            console.log("PUSH TOKEN:", tokenData);
        }
        getToken();
    }, []);

    const isAthlete = role === 'Atleta';

    return <NativeBaseProvider>
        <Tab.Navigator screenOptions={screenOptions} initialRouteName='Trainings'>
            {isAthlete && <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Descubrir', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='magnify' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Descubrir" component={RecommendationsScreen}
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
            {isAthlete && <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Metas', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='arm-flex-outline' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Goals" component={GoalsScreen}
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
            {isAthlete && <Tab.Screen
                options={
                    {
                        tabBarLabel: 'Métricas', tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='chart-timeline-variant' color={color} size={size} />),
                        tabBarActiveTintColor: '#FF6060'
                    }
                }
                name="Metrics" component={MetricsScreen}
            />}
            <Tab.Screen
                name="NotificationsScreen" component={NotificationsScreen}
                options={
                    {
                        tabBarLabel: 'Notifs', tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="bell" color={color} size={size} />),
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
        </Tab.Navigator>
    </NativeBaseProvider>;
}