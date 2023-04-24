import React, { useState } from 'react';
import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, Center } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

export default function TrainingsList() {
    const [mode, setMode] = useState('Basic');
    return <NativeBaseProvider>
        <Box textAlign="center" bg="white" flex={1} safeAreaTop>
          <TrainingsInfo />
        </Box>
      </NativeBaseProvider>;
  }
  
function TrainingsInfo() {
    const [listData, setListData] = useState(Array(20).fill('').map((_, i) => ({
      key: `${i}`,
      text: `item #${i}`
    })));
  
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };
  
    const renderItem = ({
      item,
      index
    }) => <Box>
        <Pressable onPress={() => console.log('You touched me')} alignItems="center" bg="white" borderBottomColor="trueGray.200" borderBottomWidth={1} justifyContent="center" height={50} underlayColor={'#AAA'} _pressed={{
        bg: 'trueGray.200'
      }} py={8}>
          <HStack width="100%" px={4}>
            <HStack space={2} alignItems="center">
              <Avatar color="white" bg={'secondary.700'}>
                {index}
              </Avatar>
              <Text>{item.text}</Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>;
  
    const renderHiddenItem = (data, rowMap) => <HStack flex={1} pl={2}>
        <Pressable px={4} ml="auto" bg="dark.500" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <Icon as={<Ionicons name="close" />} color="white" />
        </Pressable>
      </HStack>;
  
    return <Box bg="white" safeArea flex={1}>
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
      </Box>;
  }