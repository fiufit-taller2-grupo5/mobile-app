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
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import { useEffect, useState } from 'react';


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
  const [dailySteps, setDailySteps] = useState(0);
  const [dailyDistance, setDailyDistance] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);

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

  const dailyStepsTarget = 10000;
  const dailyDistanceTarget = 2500;
  const dailyCaloriesTarget = 2000;
  const data = {
    labels: ["Pasos", "Distancia", "Calorías"], // optional
    data: [dailySteps / dailyStepsTarget, dailyDistance / dailyDistanceTarget, dailyCalories / dailyCaloriesTarget]
  };

  useEffect(() => {

    const updateDailyActivity = async () => {
      updateDailySteps();
      updateDailyDistance();
      updateDailyCalories();
    }

    const updateDailyCalories = async () => {
      try {
        const today = new Date(); // Current date and time
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00
        const todayISOString = today.toISOString(); // Convert to ISO string
        const opts = {
          startDate: todayISOString,
          endDate: new Date().toISOString(), // required ISO8601Timestamp
          basalCalculation: true, // optional, to calculate or not basalAVG over the week
        }
        let res = await GoogleFit.getDailyCalorieSamples(opts);
        let estimated = res[0].calorie;
        console.log(estimated);
        setDailyCalories(estimated || 0);
      } catch (err) {
        console.log(err);
      }
    }

    const updateDailyDistance = async () => {
      try {
        const today = new Date(); // Current date and time
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00
        const todayISOString = today.toISOString(); // Convert to ISO string

        const opts = {
          // today at 00:00:00 AM is startDAte
          startDate: todayISOString,
          endDate: new Date().toISOString(), // required ISO8601Timestamp
          bucketUnit: BucketUnit.DAY, // required, DAY or HOUR
          bucketInterval: 1, // required, 1 or 2 for HOUR bucketUnit or 1 - 24 for DAY bucketUnit
        }
        let res = await GoogleFit.getDailyDistanceSamples(opts);
        let estimated = res[0].distance
        console.log(estimated);
        setDailyDistance(estimated || 0);
      } catch (err) {
        console.log(err);
      }
    }

    const updateDailySteps = async () => {
      try {
        let res = await GoogleFit.getDailySteps();
        let estimated = res.find(results => results.source === "com.google.android.gms:estimated_steps");
        console.log(estimated?.steps[0].value);
        setDailySteps(estimated?.steps[0].value || 0);
      } catch (err) {
        console.log(err);
      }
    }

    const testGoogleFit = async () => {
      await GoogleFit.checkIsAuthorized();
      console.log(GoogleFit.isAuthorized);

      if (!GoogleFit.isAuthorized) {
        const allScopes: string[] = Object.values(Scopes);
        const options = {
          scopes: allScopes as Scopes[],
        }
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log("AUTH_SUCCESS");
              updateDailyActivity();
            } else {
              console.log("AUTH_DENIED", authResult.message);
            }
          })
          .catch(() => {
            console.log("AUTH_ERROR");
          })
      } else {
        updateDailyActivity();
      }
    }

    testGoogleFit();

  }, []);


  return <NativeBaseProvider theme={theme}>
    <Box style={editProfileStyles.nameBox}>
      <Text style={editProfileStyles.text}>{userInfo[0]}</Text>
      <ProgressChart
        absolute
        data={data}
        width={380}
        height={260}
        strokeWidth={25}
        radius={25}
        chartConfig={chartConfig}
        hideLegend={false}
      />
      <Text>Pasos de hoy: {dailySteps}</Text>
      <Text>Distancia de hoy: {dailyDistance}</Text>
      <Text>Calorías de hoy: {dailyCalories}</Text>
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
