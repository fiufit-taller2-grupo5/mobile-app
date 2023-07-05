import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'native-base';
import { RefreshControl } from 'react-native';
import globalUser from "../../../userStorage";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { EmptyListComponent } from '../trainings/emptyListComponent';
import { API, Notification } from '../../../api';
import { NotificationInfoCard } from './inboxInfoCard';

interface Props {
    navigation: any;
}



export default function NotificationList(props: Props) {
    const { navigation } = props;

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const api = new API(navigation);

    const getNotifications = async () => {
        setRefreshing(true);
        try {
            const notifications = await api.getUserNotifications(globalUser.user?.id || 0);
            setNotifications(notifications);
        } catch (e: any) {
            console.error("error getting notifications", e.message);
        }
        setRefreshing(false);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            try {
                getNotifications();
            } catch (error) {
                console.log(error);
            }
        });
        return unsubscribe;

    }, [navigation]);

    useEffect(() => {
        getNotifications();
    }, [])

    return <View flex={1} backgroundColor="#fff">
        <View flex={1}>
            <FlatList
                ListEmptyComponent={!refreshing ? <EmptyListComponent text={"no tienes ninguna notificación todavía."} /> : null}
                contentContainerStyle={{ flexGrow: 1 }}
                data={notifications}
                marginBottom={0}
                marginTop={0}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getNotifications} />}
                renderItem={(chat) => (
                    <NotificationInfoCard
                        key={chat.item.id.toString()}
                        notification={chat.item} />
                )}
                keyExtractor={(chat, i) => i.toString()}
            ></FlatList>
        </View>
    </View>
}
