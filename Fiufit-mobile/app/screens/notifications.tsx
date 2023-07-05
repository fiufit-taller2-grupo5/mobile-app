import React from 'react';
import { NativeBaseProvider, Box, Heading, Container, View } from 'native-base';
import NotificationList from '../components/notifications/inboxList';
export default function NotificationsScreen({ navigation }: any) {
  return <View style={{ flex: 1 }} backgroundColor="#fff">
    <Heading p="4" pb="3" size="lg">
      Inbox
    </Heading>
    <NotificationList navigation={navigation} />
  </View>;
}
