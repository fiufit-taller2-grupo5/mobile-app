import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'native-base';
import { RefreshControl } from 'react-native';
import { InboxInfoCard } from "./inboxInfoCard";
import globalUser from "../../../userStorage";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { EmptyListComponent } from '../trainings/trainingsList';

interface Props {
    navigation: any;
}

interface Participant {
    name: string;
    lastRead: string;
}

export interface ChatMetadata {
    _id: string;
    _currentUserId: number;
    lastMessage: {
        _id: string,
        text: string,
        createdAt: string,
        user: {
            _id: number,
            name: string,
        }
    };
    participants: {
        [id: string]: Participant;
    };

}

export default function InboxList(props: Props) {
    const { navigation } = props;

    const [chatsMetadata, setChatsMetadata] = useState<ChatMetadata[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const getChatsWhereUserIsParticipant = async () => {
        setRefreshing(true);
        const user = await globalUser.getUser();
        const chatsRef = collection(db, "chats");
        const q = query(chatsRef, where(`participants.${user?.id}`, "!=", null));
        const querySnapshot = await getDocs(q);
        const chatsMetadata = querySnapshot.docs.map(doc => {
            const data = doc.data();
            if (data.lastMessage) {
                data.lastMessage.createdAt = data.lastMessage?.createdAt?.toDate()?.toLocaleDateString();
            }
            data._id = doc.id;
            data._currentUserId = user?.id;
            return data;

        });
        setChatsMetadata(chatsMetadata as ChatMetadata[]);
        setRefreshing(false);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            try {
                getChatsWhereUserIsParticipant();
            } catch (error) {
                console.log(error);
            }
        });
        return unsubscribe;

    }, [navigation]);

    return <View flex={1} backgroundColor="#fff">
        <View flex={1}>
            <FlatList
                ListEmptyComponent={!refreshing ? <EmptyListComponent text={"no tienes ningún chat todavía. Ve al perfil de alguien para iniciar una conversación"} /> : null}
                contentContainerStyle={{ flexGrow: 1 }}
                data={chatsMetadata}
                marginBottom={0}
                marginTop={0}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getChatsWhereUserIsParticipant} />}
                renderItem={(chat) => (
                    <InboxInfoCard
                        chatMetadata={chat.item}
                        navigation={navigation}
                        navigateToScreen="InboxInfoScreen"
                    />
                )}
                keyExtractor={(chat, i) => i.toString()}
            ></FlatList>
        </View>
    </View>
}
