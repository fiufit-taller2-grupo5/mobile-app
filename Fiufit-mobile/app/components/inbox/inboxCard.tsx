import { Text } from "native-base";
import { Inbox } from "../../../api";
  
interface Props {
    navigation: any;
    inboxData: Inbox;
}
  
/*Componente que contiene al chat que presiona el usuario*/

export default function InboxCard(props: Props) {
    const { navigation, inboxData } = props;
    return (
        <Text> {inboxData.fullName} </Text>
    );
}