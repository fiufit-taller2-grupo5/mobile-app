import { Box, Text, View, NativeBaseProvider, Button, Image, Select } from 'native-base';
import { editProfileStyles } from '../styles';
import { BarChart, ProgressChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';
import TrainingsList, { EmptyListComponent } from '../components/trainings/trainingsList';
import { API } from '../../api';
import { userInfo } from '../../asyncStorageAPI';
import { MaterialIcons } from "@expo/vector-icons";
import { collection, query, where, getDocs, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FollowButton } from '../components/users/followButton';
import { ScrollView } from 'react-native';
import { RefreshControl, Dimensions } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#ff6060' },
      }}>
      <Tab.Screen name="Home" component={MetricsScreen} />
      <Tab.Screen name="Settings" component={GoalsScreen} />
    </Tab.Navigator>
  );
}


interface Props {
  navigation: any;
  route: any;
}

export function GoalsScreen(props: Props) {
  return <View><Text>hola</Text></View>;
}

export function MetricsScreen(props: Props) {

  const api = new API(props.navigation);

  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        data: [22, 45, 28, 80, 300, 43]
      }
    ]
  };

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });


  useEffect(() => {

    // setChartData(data);
  }, []);

  const [startDate, setStartDate] = useState(new Date());


  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
    DateTimePickerAndroid.dismiss('date');
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = async () => {
    showMode('date');
  };

  useEffect(() => {
    // const getMetrics = async () => {
    //   const start = new Date();
    //   start.setMonth(start.getMonth() - 1);
    //   const metrics = await api.getMetrics(start.toISOString(), (new Date()).toISOString(), "day");
    //   console.log(metrics);
    // }

    // getMetrics();
  }, []);

  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
    <View flex={1} justifyContent="center">
      <View flex={1} justifyContent="space-evenly">
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Fecha inicio</Text>
          <LoadableButton
            customStyles={{
              width: 200, marginLeft: 20, backgroundColor: "#FFFFFF",
              borderColor: "#FF6060",
              borderWidth: 1,
            }}
            textColor={"#FF6060"}
            text={"elegir fecha inicio"}
            onPress={showDatepicker}
          />
        </View>
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Fecha fin</Text>
          <LoadableButton
            customStyles={{
              width: 200, marginLeft: 20, backgroundColor: "#FFFFFF",
              borderColor: "#FF6060",
              borderWidth: 1,
            }}
            textColor={"#FF6060"}
            text={"elegir fecha inicio"}
            onPress={showDatepicker}
          />
        </View>
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Agrupar por </Text>
          <Select
            fontSize={15}
            selectedValue={"Día"}
            marginLeft={5}
            minWidth={200}
            accessibilityLabel="año / mes / semana / día"
            placeholder="Día"
            defaultValue='day'
            _selectedItem={{ bg: "#FF6060" }}
            onValueChange={newRole => null}>
            <Select.Item label="Año" value="year" />
            <Select.Item label="Mes" value="month" />
            <Select.Item label="Semana" value="week" />
            <Select.Item label="Día" value="day" />
          </Select>
        </View>
      </View>
      <View flex={2} justifyContent="flex-end" >
        {chartData.datasets[0].data.length === 0 &&
          <View height={450} borderColor="#FF6060" borderWidth={2} margin={10} borderRadius={15} justifyContent="center">
            <EmptyListComponent text='No hay métricas disponibles todavía' />
          </View>
        }
        {chartData.datasets[0].data.length > 0 &&
          <BarChart
            style={{
              marginVertical: 8,
              marginLeft: 10,
              marginRight: 8,
              borderRadius: 15,
              paddingTop: 60,
              paddingBottom: 5,
            }}
            fromZero
            showValuesOnTopOfBars
            withInnerLines
            data={chartData}
            xLabelsOffset={10}
            yLabelsOffset={10}
            showBarTops={true}
            width={Dimensions.get("window").width - 20}
            height={450}
            yAxisLabel=""
            yAxisSuffix=' km'
            chartConfig={{
              backgroundColor: "#ff6060",
              backgroundGradientFrom: "#ff8080",
              backgroundGradientTo: "#ff5050",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />}
      </View>
    </View>
  </View></NativeBaseProvider >;
}


