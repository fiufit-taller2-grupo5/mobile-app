import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useEffect, useState } from "react";
import { addDoc, collection, query, where, onSnapshot, doc, getDocs, orderBy, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ChatMetadata } from './inboxList';
import { View, Text } from 'native-base';
import { ActivityIndicator } from 'react-native';
import globalUser from '../../../userStorage';
import { API } from '../../../api';


interface Props {
  navigation: any;
  chatMetadata: ChatMetadata;
}

export default function InboxCard(props: Props) {

  const { navigation, chatMetadata } = props;
  console.log("received chatmetadata: ", chatMetadata)
  const [loading, setLoading] = useState(true);
  const messagesCollectionRef = collection(db, "chats", chatMetadata._id, "messages")
  const [messages, setMessages] = useState<IMessage[]>([]);
  const api = new API(navigation);

  useEffect(() => {

    const getMessagesFromDB = async () => {
      const q = query(messagesCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        data.createdAt = data.createdAt.toDate();
        console.log("data: ", data);
        return data;
      });

      console.log("metadta id: ", chatMetadata._id)

      setMessages(messages as IMessage[]);
      setLoading(false);
    }

    const unsubscribe = onSnapshot(messagesCollectionRef, (data) => {
      getMessagesFromDB();
    });

    const updateLastRead = async () => {
      const docRef = doc(db, 'chats', chatMetadata._id);
      await updateDoc(docRef, {
        [`participants.${globalUser.user?.id}.lastRead`]: new Date(),
      });
    }

    updateLastRead();
    getMessagesFromDB();
    return () => unsubscribe();
  }, []);


  const onSend = async (newMessages: IMessage[]) => {
    try {
      console.log("new messages to add: ", newMessages)
      if (messages.findIndex((message) => message._id === newMessages[0]._id) !== -1) {
        return;
      }

      await addDoc(collection(db, "chats", chatMetadata._id, "messages"), newMessages[0]);
      const docRef = doc(db, 'chats', chatMetadata._id);
      await updateDoc(docRef, {
        lastMessage: newMessages[0],
      });
      // TODO check if it works
      const selfUser = await globalUser.getUser();

      const userId = Object.keys(chatMetadata.participants).find((id) => id !== selfUser!.id.toString());
      api.sendPushNotification(parseInt(userId!), "Nuevo mensaje de selfUser?.name", newMessages[0].text)
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <>
      {
        loading ?
          <View
            flex={1}
            justifyContent="center"
            alignItems="center"

          >
            <ActivityIndicator size="large" color="#ff6060" />
          </View> :
          <GiftedChat
            messages={messages}
            user={{ _id: chatMetadata._currentUserId, name: chatMetadata.participants[chatMetadata._currentUserId].name }}
            onSend={onSend}
          />
      }
    </>
  );
}