import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import FooterTab from '../components/menu/footerTab';

export default function HomeScreen() {
    return <NativeBaseProvider>
        <FooterTab/>
    </NativeBaseProvider>;
}