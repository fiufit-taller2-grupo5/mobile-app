import { Icon, Input, VStack } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export const SearchBar = ({text, searchText, trainings, filterData}: any) => {
    
    const filterDataByTitle = (text: string) => {
        if (text) {
          const filtered = trainings.filter(
            (item: { title: string; }) =>
              item.title.toLowerCase().includes(text.toLowerCase())
          );
          filterData(filtered);
        } else {
          filterData(trainings);
        }
    };
    
    const handleSearch = (text: string) => {
        searchText(text);
        filterDataByTitle(text);
      };

    return <VStack alignSelf="center">
        <Input
        placeholder="Buscar por nombre"
        onChangeText={handleSearch}
        value={text}
        width="100%"
        borderRadius="4"
        fontSize="14"
        InputLeftElement={
            <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
            />
        }
        />
    </VStack>
  };
  
  