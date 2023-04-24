import { Box, Divider, Heading, Icon, Input, VStack } from "native-base";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
    return <VStack my="2" mx="2" space={2} w="100%" maxW="300px" divider={<Box px="2">
        <Divider />
        </Box>}>
        <VStack>
            <Input placeholder="Search trainings" variant="filled" width="100%" minW={350} minH={30} backgroundColor="gray.200" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.800" as={<Ionicons name="ios-search" />} />} />
        </VStack>
    </VStack>;
}