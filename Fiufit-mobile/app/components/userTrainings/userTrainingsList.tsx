import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  VStack,
  Divider,
  Icon,
  Input,
  View,
  CheckIcon,
  Select,
  HStack,
  ArrowDownIcon,
  ChevronDownIcon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import {
  API,
  CompleteUserTraining,
  Training,
} from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from 'react-native';
import { UserTrainingInfoCard } from "./userTrainingInfoCard";
import globalUser from '../../../userStorage';
import { LoadableButton } from "../commons/buttons";
import { EmptyListComponent } from "../trainings/emptyListComponent";


interface Props {
  navigation: any;
}

export default function UserTrainingsList(props: Props) {
  const { navigation } = props;
  const [filteredData, setFilteredData] = useState<CompleteUserTraining[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTitle, setTitle] = useState("");
  const [selectedType, setType] = useState("");
  const [selectedDifficulty, setDifficulty] = useState("");

  const api = new API(navigation);

  const filterData = (unfilteredTrainingsList: CompleteUserTraining[]) => {
    const filtered = unfilteredTrainingsList.filter(
      (item) =>
        (selectedDifficulty === '' || item.trainingData.difficulty === parseInt(selectedDifficulty)) &&
        (selectedType === '' || item.trainingData.type.toLowerCase().includes(selectedType.toLowerCase())) &&
        (selectedTitle === '' || item.trainingData.title.toLowerCase().includes(selectedTitle.toLowerCase()))
    );
    setFilteredData(filtered);
  }

  const handleFilterByTitle = (text: string) => {
    setTitle(text);
  };

  const handleFilterByDifficulty = (text: string) => {
    setDifficulty(text);
  };

  const handleFilterByType = (text: string) => {
    setType(text);
  };

  const getUserTrainingsList = async () => {
    console.log("trying to fetch training list");
    setRefreshing(true);

    try {
      const userTrainingsList = await api.getCompleteUserTrainingSessions(globalUser.user?.id || 0);
      if (userTrainingsList.length > 0) {
        console.log("userTrainingsList: ", userTrainingsList)
        filterData(userTrainingsList);
      }
    } catch (e: any) {
      console.error(e.message);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    getUserTrainingsList();
  }, [selectedTitle, selectedType, selectedDifficulty])

  useEffect(() => {
    getUserTrainingsList();
  }, [])

  // sort by date 
  const sortedFilterData = filteredData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });



  return (
    <>
      <VStack
        paddingY={2}
        paddingX={4}
        w="100%"
      >
        <VStack alignSelf="center" paddingY={2}
          paddingX={0}>
          <Input
            placeholder="Busque por título"
            onChangeText={handleFilterByTitle}
            value={selectedTitle}
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
        <View
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}>
          <View flex={0.8} paddingRight={2}>
            <Select selectedValue={selectedType} accessibilityLabel="Elija un tipo" placeholder="Elija un tipo"
              dropdownIcon={<View paddingRight={2}><ChevronDownIcon /></View>}
              mt={1} onValueChange={handleFilterByType}>
              <Select.Item label="Tipo" value="" />
              <Select.Item label="Correr" value="Running" />
              <Select.Item label="Natación" value="Swimming" />
              <Select.Item label="Ciclismo" value="Biking" />
              <Select.Item label="Yoga" value="Yoga" />
              <Select.Item label="Basketball" value="Basketball" />
              <Select.Item label="Football" value="Football" />
              <Select.Item label="Caminata" value="Walking" />
              <Select.Item label="Gimnasia" value="Gymnastics" />
              <Select.Item label="Danza" value="Dancing" />
              <Select.Item label="Escalar" value="Hiking" />
            </Select>
          </View>
          <View flex={1} paddingRight={2}>
            <Select selectedValue={selectedDifficulty} dropdownIcon={<View paddingRight={2}><ChevronDownIcon /></View>}
              accessibilityLabel="Elija dificultad" placeholder="Elija dificultad" mt={1} onValueChange={handleFilterByDifficulty}>
              <Select.Item label="Dificultad " value="" />
              <Select.Item label="1" value="1" />
              <Select.Item label="2" value="2" />
              <Select.Item label="3" value="3" />
              <Select.Item label="4" value="4" />
              <Select.Item label="5" value="5" />
              <Select.Item label="6" value="6" />
              <Select.Item label="7" value="7" />
              <Select.Item label="8" value="8" />
              <Select.Item label="9" value="9" />
              <Select.Item label="10" value="10" />
            </Select>
          </View>

        </View>
      </VStack>
      {<FlatList
        data={sortedFilterData}
        marginLeft={4}
        ListEmptyComponent={!refreshing ? <EmptyListComponent text={"No se encontraron sesiones de entrenamientos."} /> : null}
        renderItem={(userTraining) => (
          <UserTrainingInfoCard
            userTraining={userTraining.item}
            navigation={navigation}
            navigateToScreen="TrainingInfoScreen"
          />
        )}
        keyExtractor={(userTraining, i) => userTraining.id?.toString() || i.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { getUserTrainingsList() }} />}
      >
      </FlatList>}
    </>
  );
}
