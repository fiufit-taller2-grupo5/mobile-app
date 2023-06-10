import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useState } from "react";
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

interface Props {
  navigation: any;
  inboxData: any;
}

/*Componente que contiene al chat que presiona el usuario*/

export default function InboxCard(props: Props) {
  const { navigation, inboxData } = props;


  async function addChat(user1: string, user2: string) {
    const docData = {
      participants: [user1, user2],
      messages: []
    };

    try {
      const docRef = await addDoc(collection(db, "chats"), docData);
      console.log("Chat document created with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding chat document: ", e);
    }
  }
  function listenForChatChanges(user1: string, user2: string) {
    const chatsRef = collection(db, "chats");

    const q = query(chatsRef,
      where("participants", "array-contains-any", [user1, user2]),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New chat document:", change.doc.id, change.doc.data());
        } else if (change.type === "modified") {
          console.log("Modified chat document:", change.doc.id, change.doc.data());
        } else if (change.type === "removed") {
          console.log("Removed chat document:", change.doc.id);
        }
      });
    });

    // Call unsubscribe() when you no longer want to listen for changes
    // return unsubscribe;
  }

  const [messages, setMessages] = useState<IMessage[]>(() => {
    return inboxData.messages.map((message: any) => ({
      _id: message.id,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.senderId,
        name: message.senderName,
        avatar: 'https://example.com/avatar.png',
      },
    }));
  });

  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages: IMessage[] | undefined) => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
    />
  );
}