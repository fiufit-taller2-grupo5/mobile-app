import * as React from 'react';
import { Text, NativeBaseProvider, extendTheme, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { footerTabStyles } from '../../styles';

export default function FooterTab() {
    const [selected, setSelected] = React.useState(1);
    const theme = extendTheme({
        components: {
            HStack: {
                defaultProps: {
                    bg: '#EAEAEA',
                }
            }
        }
    });

    return <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="white" safeAreaTop width="100%" maxW="1000px" alignSelf="center">
        <HStack alignItems="center" safeAreaBottom shadow={6} style={[footerTabStyles.horizontalFooterTab]}>
          <Pressable opacity={selected === 0 ? 3 : 2} py="3" flex={1} onPress={() => setSelected(0)}>
            <Center>
              <Icon mb="1" as={<FontAwesome5 name='users' />} color={selected === 0 ? 'pink.600' : 'black'} size="sm" />
              <Text color={selected === 0 ? 'pink.600' : 'black'} fontSize="12" style={[footerTabStyles.text]}>
                Users
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 1 ? 3 : 2} py="2" flex={1} onPress={() => setSelected(1)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name='dumbbell' />} color={selected === 1 ? 'pink.600' : 'black'} size="sm" />
              <Text color={selected === 1 ? 'pink.600' : 'black'} fontSize="12" style={[footerTabStyles.text]}>
                Trainings
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 2 ? 3 : 2} py="2" flex={1} onPress={() => setSelected(2)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'heart' : 'heart-outline'} />} color={selected === 2 ? 'pink.600' : 'black'} size="sm" />
              <Text color={selected === 2 ? 'pink.600' : 'black'} fontSize="12" style={[footerTabStyles.text]}>
                Favorites
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 3 ? 3 : 2} py="2" flex={1} onPress={() => setSelected(3)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color={selected === 3 ? 'pink.600' : 'black'} size="sm" />
              <Text color={selected === 3 ? 'pink.600' : 'black'} fontSize="12" style={[footerTabStyles.text]}>
                Profile
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>;
}