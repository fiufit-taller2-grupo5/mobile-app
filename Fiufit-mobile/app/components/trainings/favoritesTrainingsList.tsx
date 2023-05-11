import React, { useEffect, useState } from "react";
import { Image, Box, FlatList, HStack, VStack, Text, NativeBaseProvider, Button, Divider} from "native-base";
import SearchBar from './searchBar';
import { trainingStyles } from "../../styles"
import useSWR from 'swr';
import { getFavoriteTrainings } from "../../../api";

interface Props {
  navigation: any;
};

const FavoritesTrainingsInfo = (props: Props) => {
  const { navigation } = props;
  const [selected, setSelected] = React.useState(1);
  const favoritesTrainingsResponse  = useSWR('https://api-gateway-prod-szwtomas.cloud.okteto.net/training-service/api/trainings/favorites/', getFavoriteTrainings);
  const [trainingsData, setFavoritesTrainingsList] = useState<string[]>([]);
  useEffect(() => {
    if(favoritesTrainingsResponse.data) {
        setFavoritesTrainingsList(favoritesTrainingsResponse.data);
    }
  }, [favoritesTrainingsResponse.data]);
  
  return <Box backgroundColor="#fff" >
    <SearchBar />
    <FlatList data={trainingsData} marginBottom={5} marginTop={2} renderItem={({item}) => 
    <Button height={150} px="10" py="10" backgroundColor="#fff" onPress={async () => { navigation.navigate('FavoriteTrainingInfoScreen', { trainingData: item });}}>
            <HStack space={[2, 3]} justifyContent="space-between" height={70} width={380}>
            <Image source={{uri: "https://wallpaperaccess.com/thumb/654835.jpg"}} alt="Alternate Text" size="lg" borderRadius={10}/>
              <VStack my={1} width={220} height={10} mr={0} ml={1}>
                <Text style={trainingStyles.textTitle} color="#000000" text-align="left" bold>
                  {item.title}
                </Text>
                <Text fontSize="sm" color="#000000">
                  {item.description}
                </Text>
                <Text fontSize="xs" color="#000000">
                Dificultad: {item.difficulty}
                </Text>
              </VStack>
            </HStack>
            <Divider my={10} mx={1} />
          </Button>
        } keyExtractor={item => item.id} />
    </Box>;
};

export default function FavoritesTrainingsList(props: Props) {
  const { navigation } = props;
  return (
    <NativeBaseProvider>
      <FavoritesTrainingsInfo navigation={navigation}/>
    </NativeBaseProvider>
  );
};
