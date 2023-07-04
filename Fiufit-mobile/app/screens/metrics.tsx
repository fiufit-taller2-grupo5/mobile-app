import { Box, Text, View, NativeBaseProvider, Button, Image, Select } from 'native-base';
import { editProfileStyles } from '../styles';
import { BarChart, ProgressChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';
import TrainingsList, { EmptyListComponent } from '../components/trainings/trainingsList';
import { API, TimeInterval } from '../../api';
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

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [groupBy, setGroupBy] = useState<TimeInterval>("day");
  const [metric, setMetric] = useState<"steps" | "calories" | "distance">("steps");

  const showDatepicker = async (setNewDate: any) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        setNewDate(selectedDate);
        DateTimePickerAndroid.dismiss('date');
      },
      mode: "date",
      is24Hour: true,
    });
  };

  useEffect(() => {
    const getMetrics = async () => {
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      console.log("fetching metrics:", startDate, endDate, groupBy);
      const metrics = await api.getMetrics(start.toISOString(), (new Date()).toISOString(), groupBy);
      console.log("metrics retrieved", metrics);
      setChartData({
        labels: metrics.label,
        datasets: [
          {
            data: metrics[metric].map((m: number) => m.toFixed(1))
          }
        ]
      });
    }

    getMetrics();
  }, [startDate, endDate, groupBy, metric]);

  const metricSuffix = (metric: string): string => {
    switch (metric) {
      case "steps":
        return "pasos";
      case "distance":
        return "km";
      case "calories":
        return "kcal";
    }
    return "";
  }

  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
    <View flex={1} justifyContent="center">
      <View flex={1} justifyContent="space-evenly" marginTop={2}>
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Fecha inicio</Text>
          <LoadableButton
            customStyles={{
              width: 200, marginLeft: 20, backgroundColor: "#FFFFFF",
              borderColor: "#FF6060",
              borderWidth: 1,
            }}
            textColor={"#FF6060"}
            text={!startDate ? "elegir fecha inicio" : startDate.toDateString()}
            onPress={async () => { await showDatepicker(setStartDate) }}
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
            text={!endDate ? "elegir fecha fin" : endDate.toDateString()}
            onPress={async () => { await showDatepicker(setEndDate) }}
          />
        </View>
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Agrupar por </Text>
          <Select
            fontSize={15}
            selectedValue={groupBy}
            marginLeft={5}
            minWidth={200}
            accessibilityLabel="pasos / distancia / calorías"
            placeholder="Año"
            defaultValue='year'
            _selectedItem={{ bg: "#FF6060" }}
            onValueChange={(itemValue: any) => setGroupBy(itemValue)}>
            <Select.Item label="Año" value="year" />
            <Select.Item label="Mes" value="month" />
            <Select.Item label="Semana" value="week" />
            <Select.Item label="Día" value="day" />
          </Select>
        </View>
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Métrica</Text>
          <Select
            fontSize={15}
            selectedValue={metric}
            marginLeft={5}
            minWidth={200}
            accessibilityLabel="pasos / distancia / calorías"
            placeholder="Pasos"
            defaultValue='steps'
            _selectedItem={{ bg: "#FF6060" }}
            onValueChange={(itemValue: any) => setMetric(itemValue)}>
            <Select.Item label="Pasos" value="steps" />
            <Select.Item label="Distancia" value="distance" />
            <Select.Item label="Calorías" value="calories" />
          </Select>
        </View>

      </View>
      <View flex={2} justifyContent="flex-end">
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
              borderRadius: 15,
              paddingTop: 60,
              paddingBottom: 5,
            }}
            fromZero
            showValuesOnTopOfBars
            withInnerLines
            data={chartData}
            xLabelsOffset={5}
            yLabelsOffset={-6}
            showBarTops={true}
            width={Dimensions.get("window").width - 20}
            height={450}
            yAxisLabel=""
            yAxisSuffix={` ${metricSuffix(metric)}`}
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


