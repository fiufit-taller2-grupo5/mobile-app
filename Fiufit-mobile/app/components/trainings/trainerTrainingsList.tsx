import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, Button, Divider, Input, Icon, View, Select, CheckIcon } from "native-base";
import { trainingStyles } from "../../styles"
import { getTrainerTrainings, Training } from "../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from 'react-native';

interface Props {
  navigation: any;
};

interface TrainerTrainingInfoProps {
  navigation: any;
  trainerTraining: Training;
};

const mainImage = (training_type: any) => {
  if (training_type === 'Running') return "https://wallpaperaccess.com/thumb/2604922.jpg";
  else if (training_type === 'Swimming') return "https://wallpaperaccess.com/thumb/1634055.jpg";
  else if (training_type === 'Walking') return "https://wallpaperaccess.com/thumb/654835.jpg";
  else if (training_type === 'Biking') return "https://wallpaperaccess.com/thumb/4431599.jpg";
  else if (training_type === 'Yoga') return "https://wallpaperaccess.com/thumb/2532294.jpg";
  else if (training_type === 'Basketball') return "https://wallpaperaccess.com/thumb/798750.jpg";
  else if (training_type === 'Football') return "https://wallpaperaccess.com/thumb/1813065.jpg";
  else if (training_type === 'Gymnastics') return "https://wallpaperaccess.com/thumb/2236559.jpg";
  else if (training_type === 'Dancing') return "https://wallpaperaccess.com/thumb/1315981.jpg";
  else if (training_type === 'Hiking') return "https://wallpaperaccess.com/thumb/7309738.jpg";
};

const TrainerTrainingsInfo = (props: TrainerTrainingInfoProps) => {
  const { navigation, trainerTraining } = props;
  return <Box backgroundColor="#fff" >
    <Button
      height={150}
      px="10" py="10"
      backgroundColor="#fff"
      onPress={async () => {
        navigation.navigate(
          'TrainingInfoScreen',
          { trainingData: trainerTraining });
      }
      }
    >
      <HStack space={[2, 3]} height={70} width={380}>
        <Image source={{ uri: mainImage(trainerTraining.type) }} alt="Alternate Text" size="lg" borderRadius={10} />
        <VStack my={1} width={220} height={10} mr={0} ml={1}>
          <Text style={trainingStyles.textTitle} color="#000000" text-align="left" bold>
            {trainerTraining.title}
          </Text>
          <Text fontSize="sm" color="#000000">
            {trainerTraining.description}
          </Text>
          <Text fontSize="xs" color="#000000">
            Dificultad: {trainerTraining.difficulty}
          </Text>
        </VStack>
      </HStack>
      <Divider my={10} mx={1} />
    </Button>
  </Box>;
};

export default function TrainerTrainingsList(props: Props) {
  const { navigation } = props;
  const [trainerTrainingsList, setTrainerTrainingsList] = useState<Training[]>([]);
  const [filteredData, setFilteredData] = useState<Training[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [selectedTitle, setTitle] = useState("");
  const [selectedType, setType] = React.useState("");
  const [selectedDifficulty, setDifficulty] = React.useState("");

  const filterData = () => {
    const filtered = trainerTrainingsList.filter(
      (item) =>
        (selectedDifficulty === '' || item.difficulty === parseInt(selectedDifficulty)) &&
        (selectedType === '' || item.type.toLowerCase().includes(selectedType.toLowerCase())) &&
        (selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase()))
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

  const getTrainingsList = async () => {
    setRefreshing(true);
    const trainersTrainingsResponse = await getTrainerTrainings();
    setTrainerTrainingsList(trainersTrainingsResponse);
    setRefreshing(false);
    filterData();
  }

  useEffect(() => {
    getTrainingsList();
  }, [selectedTitle, selectedType, selectedDifficulty])

  return (
    <>
      <VStack
        paddingY={2}
        paddingX={4}
        w="100%"
        backgroundColor="#fff"
      >
      <VStack alignSelf="center" paddingY={2}
        paddingX={4}>
        <Input
          placeholder="Search trainings by title"
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
      <HStack>
        <Box maxW="300">
          <Select selectedValue={selectedType} minWidth="180" maxWidth="190" accessibilityLabel="Choose Type" placeholder="Choose Type" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={handleFilterByType}>
            <Select.Item label="All types" value="" />
            <Select.Item label="Running" value="Running" />
            <Select.Item label="Swimming" value="Swimming" />
            <Select.Item label="Biking" value="Biking" />
            <Select.Item label="Yoga" value="Yoga" />
            <Select.Item label="Basketball" value="Basketball" />
            <Select.Item label="Football" value="Football" />
            <Select.Item label="Walking" value="Walking" />
            <Select.Item label="Gymnastics" value="Gymnastics" />
            <Select.Item label="Dancing" value="Dancing" />
            <Select.Item label="Hiking" value="Hiking" />
          </Select>
        </Box>
        <Box maxW="300">
          <Select selectedValue={selectedDifficulty} minWidth="180" maxWidth="190" accessibilityLabel="Choose Difficulty" placeholder="Choose Difficulty" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={handleFilterByDifficulty}>
            <Select.Item label="All difficulties" value="" />
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
        </Box>
      </HStack>
      </VStack>
      <View style={{ display: "flex", alignItems: 'flex-end', paddingHorizontal: 15 }}>
        <Button
          style={{ backgroundColor: "#FF6060", width: "100%" }}
          _text={{ fontFamily: "Roboto", fontWeight: "bold", color: "#fff" }}
          onPress={() => { navigation.navigate('CreateTrainingScreen'); }}
        >
          Crear nuevo
        </Button>
      </View>
      <FlatList
        data={filteredData}
        marginBottom={65}
        marginTop={5}
        renderItem={(trainerTraining) =>
          <TrainerTrainingsInfo
            trainerTraining={trainerTraining.item}
            navigation={navigation}
          />
        }
        keyExtractor={(training) => training.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTrainingsList} />}
      >
      </FlatList>
    </>
  );
};
