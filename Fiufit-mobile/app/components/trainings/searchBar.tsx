import { Box, Divider, Heading, Icon, Input, VStack } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchBar() {
    return <VStack mx="1" my="3" space={2} w="100%" maxW="380px" backgroundColor="#fff" divider={<Box px="2">
        <Divider />
        </Box>}>
        <VStack w="100%" space={5} alignSelf="center">
            <Input placeholder="Search trainings" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
    </VStack>;
}