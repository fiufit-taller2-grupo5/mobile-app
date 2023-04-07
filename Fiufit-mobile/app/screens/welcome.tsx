import * as React from 'react';
import { welcomeStyles } from '../styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme, VStack } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Title from '../components/welcome/title';
import Body from '../components/welcome/body';

export default function WelcomeScreen({navigation} : NativeStackScreenProps<any, any>) {
  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
            background: '#FF6060',
        },
      },
      Text: {
        variants: {
          heading1: {
            color: '#FF6060'
          },
          heading2: {
            color: '#616161'
          },
          heading3: {
            color: '#000000'
          },
          paragraph: {
            color: '#212121',
          }
        }
      }
    }
  });

  return <SafeAreaProvider>
    <NativeBaseProvider theme={theme}>
      <VStack
        space={6}
        style={[welcomeStyles.mainVerticalStack]}
        width={"full"}
        height={"full"}
      >
        <Title/>
        <Body navigation={navigation}/>
      </VStack>
    </NativeBaseProvider>
  </SafeAreaProvider>;
}
