import { Inbox } from "../../../api";
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useState } from "react";

interface Props {
    navigation: any;
    inboxData: Inbox;
}
  
/*Componente que contiene al chat que presiona el usuario*/

export default function InboxCard(props: Props) {
    const { navigation, inboxData } = props;
  
    const [messages, setMessages] = useState<IMessage[]>(() => {
      return inboxData.messages.map((message) => ({
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