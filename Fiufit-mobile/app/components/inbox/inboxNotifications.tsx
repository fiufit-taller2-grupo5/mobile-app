import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
import { API } from '../../../api';
import globalUser from '../../../userStorage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function InboxNotifications(props: any) {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notification | any>();
  const notificationListener = useRef<Subscription | any>();
  const responseListener = useRef<Subscription | any>();
  const { navigation } = props;
  const api = new API(navigation);
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
    }
    );

    if (notificationListener) {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
    }
    if (responseListener) {
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
    }

    return () => {
      if (notificationListener) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const sendPushNotification = async () => {
    // const message = {
    //   // to: "ExponentPushToken[xMsIjsOnuKrC-ziNUUopQM]",
    //   to: expoPushToken,
    //   title: 'New message',
    //   body: 'You have a new message!',
    // };
    const title =  'New message';
    const body =  'You have a new message!';
    api.sendPushNotification(await globalUser.getUserId(), title, body);


    // await fetch('https://exp.host/--/api/v2/push/send', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Accept-encoding': 'gzip, deflate',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(message)
    // });
  };
  // Screen con boton de prueba para poder probar que funcionen 
  //las notificaciones cada vez que se apreta el boton

  console.log("token: " + expoPushToken)

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await sendPushNotification();
        }}
      />
    </View>
  );
}




async function schedulePushNotification() {
  Notifications.getDevicePushTokenAsync().then((token) => {
    console.log("TOKEN TOKEN TOKEN: ", token);
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });

}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}