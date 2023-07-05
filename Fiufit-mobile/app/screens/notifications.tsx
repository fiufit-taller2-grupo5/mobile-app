import React from 'react';
import { Heading, View } from 'native-base';
import NotificationList from '../components/notifications/notificationList';

export default function NotificationsScreen({ navigation }: any) {
  return <View style={{ flex: 1 }} backgroundColor="#fff">
    <Heading p="4" pb="3" size="lg">
      Notificaciones
    </Heading>
    <NotificationList navigation={navigation} />
  </View>;
}
