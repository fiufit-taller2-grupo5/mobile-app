import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, Text, Pressable, Heading, HStack, Avatar, VStack, Spacer, Center, Container } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function InboxScreen({ navigation }: any) {
  return <NativeBaseProvider>
            <Container minHeight={690} minWidth={390}>
                <Box bg= 'white' flex="1" safeAreaTop maxW="400px" w="100%">
                    <Heading p="4" pb="3" size="lg">
                    Inbox
                    </Heading>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <InboxList />
                    </ScrollView>
                </Box>
            </Container>
        </NativeBaseProvider>;
}

function InboxList() {

  const data = [{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Afreen Khan',
    timeStamp: '12:47 PM',
    recentText: 'Good Day!',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  }, {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Sujita Mathur',
    timeStamp: '11:11 PM',
    recentText: 'Cheer up, there!',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU'
  }, {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Anci Barroco',
    timeStamp: '6:22 PM',
    recentText: 'Good Day!',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg'
  }, {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Aniket Kumar',
    timeStamp: '8:56 PM',
    recentText: 'All the best',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU'
  }, {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Kiara',
    timeStamp: '12:47 PM',
    recentText: 'I will call today.',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU'
  }
];
  
  const [listData, setListData] = useState(data);

  const renderItem = ({
    item,
    index
  }: any) => <Box>
      <Pressable onPress={() => console.log('You touched me')} bg= 'white'>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar size="48px" source={{ uri: item.avatarUrl }} />
            <VStack>
              <Text color="coolGray.800" bold> {item.fullName} </Text>
              <Text color="coolGray.600"> {item.recentText} </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start"> {item.timeStamp} </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>;

  return <Box bg="white" safeArea flex="1">
      <SwipeListView data={listData} renderItem={renderItem} />
    </Box>;
}
