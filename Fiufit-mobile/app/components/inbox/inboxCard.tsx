import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useEffect, useState } from "react";
import { addDoc, collection, query, where, onSnapshot, doc, getDocs, orderBy, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ChatMetadata } from './inboxList';
import { View, Text } from 'native-base';
import { ActivityIndicator } from 'react-native';


interface Props {
  navigation: any;
  chatMetadata: ChatMetadata;
}

export default function InboxCard(props: Props) {

  const { navigation, chatMetadata } = props;
  const [loading, setLoading] = useState(true);
  const messagesCollectionRef = collection(db, "chats", chatMetadata._id, "messages")
  const [messages, setMessages] = useState<IMessage[]>([]);

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

      setMessages(messages as IMessage[]);
      setLoading(false);
    }

    const unsubscribe = onSnapshot(messagesCollectionRef, (data) => {
      getMessagesFromDB();
    });

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
        lastMessage: newMessages[0]
      });
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