import React from 'react';
import { NativeBaseProvider, Box, Heading, Container, View } from 'native-base';
import InboxList from '../components/inbox/inboxList';

export default function InboxScreen({ navigation }: any) {
    return <View style={{ flex: 1 }} backgroundColor="#fff">
                <Heading p="4" pb="3" size="lg">
                    Inbox
                </Heading>
                <InboxList navigation={navigation}/>
            </View>;
}
