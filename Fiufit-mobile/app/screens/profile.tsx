import { Box, Text, NativeBaseProvider, extendTheme, FlatList, HStack, Spacer, Link, Button } from 'native-base';
import { editProfileStyles } from '../styles';
import { AntDesign } from '@expo/vector-icons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

// TODO: pedirselo al backend + el rol alfinal que sale del contexto
const userInfo = ['Florencia Sardella', 160, 50, '08-09-2000', 'Cardio, HIT', 'Av Rivadavia', '1872', 'Atleta'];

const screens = ['ChangeNameScreen', 'ChangeHeightScreen', 'ChangeWeightScreen', 'ChangeDateScreen', 'ChangeInterestsScreen', 'ChangeStreetNameScreen', 'ChangeStreetNumberScreen', 'ChangeRoleScreen']

const fields = [
  { name: "Nombre completo", id: 0 },
  { name: "Altura", id: 1 },
  { name: "Peso", id: 2 },
  { name: "Fecha de nacimiento", id: 3 },
  { name: "Intereses", id: 4 },
  { name: "Calle", id: 5 },
  { name: "Altura calle", id: 6 },
  { name: "Atleta/Entrenador", id: 7 },
];

interface Props {
  navigation: any;
}

export default function ProfileScreen(props: Props) {
  const { navigation } = props;

  const theme = extendTheme({
    components: {
      Box: {
        defaultProps: {
          bg: '#FFFFFF',
        }
      }
    }
  });

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.8,
    useShadowColorFromDataset: false,
  };

  const data = {
    labels: ["Pasos", "Distancia", "Calorías"], // optional
    data: [0.4, 0.6, 0.8]
  };

  return <NativeBaseProvider theme={theme}>
    <Box style={editProfileStyles.nameBox}>
      <Text style={editProfileStyles.text}>{userInfo[0]}</Text>
      <ProgressChart
        data={data}
        width={380}
        height={260}
        strokeWidth={25}
        radius={25}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </Box>
    <Box style={editProfileStyles.infoBox}>
      <FlatList data={fields} renderItem={({ item }) =>
        <Box
          borderBottomWidth="1"
          borderColor="#eaeaea"
          px="6"
          py="6"
          borderTopRadius="30px"
        >
          <HStack>
            <Text _dark={{ color: "warmGray.50" }} color="#FF6060" bold>
              {item.name}
            </Text>
            <Spacer />
            <HStack space={2}>
              <Text fontSize="md" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                {userInfo[item.id]}
              </Text>
              <Button backgroundColor="#ffffff" size={5} alignSelf="center"
                onPress={async () => {
                  const value = userInfo[item.id];
                  navigation.navigate(screens[item.id], { value });
                }}>
                <AntDesign name="arrowright" size={15} color="#707070" />
              </Button>
            </HStack>
          </HStack>
        </Box>}
        keyExtractor={item => item.name}
      />
    </Box>
  </NativeBaseProvider>;
}
