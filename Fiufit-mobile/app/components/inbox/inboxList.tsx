import React, { useState } from 'react';
import { FlatList, View } from 'native-base';
import { API } from "../../../api";
import { InboxInfoCard } from "./inboxInfoCard";
interface Props {
    navigation: any;
}

export default function InboxList(props: Props) {
    const { navigation } = props;
    const data = [{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        fullName: 'Afreen Khan',
        timeStamp: '12:47 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        messages: [{id: 1, text: 'Hola como estas', createdAt: new Date(), senderId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', senderName: 'Afreen Khan'}]
    }, {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        fullName: 'Sujita Mathur',
        timeStamp: '11:11 PM',
        recentText: 'Cheer up, there!',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU'
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        fullName: 'Anci Barroco',
        timeStamp: '6:22 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg'
    }, {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        fullName: 'Aniket Kumar',
        timeStamp: '8:56 PM',
        recentText: 'All the best',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU'
    }, {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        fullName: 'Kiara',
        timeStamp: '12:47 PM',
        recentText: 'I will call today.',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU'
    }
    ];
    
    const [listData, setListData] = useState(data);
    const api = new API(navigation);
    const [refreshing, setRefreshing] = useState(false);

    const getInboxList = async () => {
        setRefreshing(true);
          const trainingList = await api.getTrainings();
          if (trainingList.length > 0) {
            //const inboxList = await api.getInboxList();
          }
        setRefreshing(false);
    }

    return <View flex={1} backgroundColor="#fff">
            <View flex={1}>
                <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={listData}
                marginBottom={0}
                marginTop={0}
                renderItem={(chat) => (
                    <InboxInfoCard
                        messageData={chat.item}
                        navigation={navigation}
                        navigateToScreen="InboxInfoScreen"
                    />
                )}
                keyExtractor={(training) => training.id.toString()}
                ></FlatList>
            </View>
        </View>
}

//refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTrainingsList} />} debajo de keyextractor