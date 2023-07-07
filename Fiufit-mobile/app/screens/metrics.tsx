import { Text, View, NativeBaseProvider, Select } from 'native-base';
import { BarChart } from "react-native-chart-kit";
import React, { useEffect, useState } from 'react';
import { LoadableButton } from '../components/commons/buttons';
import { API, TimeInterval } from '../../api';
import { Dimensions } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { EmptyListComponent } from '../components/trainings/emptyListComponent';


interface Props {
  navigation: any;
  route: any;
}

export default function MetricsScreen(props: Props) {

  const api = new API(props.navigation);

  const [dataIndex, setDataIndex] = useState(0);
  const [allData, setAllData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });

  const aWeekAgo = new Date();
  aWeekAgo.setDate(aWeekAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(aWeekAgo);
  const [endDate, setEndDate] = useState(new Date());
  const [groupBy, setGroupBy] = useState<TimeInterval>("day");
  const [metric, setMetric] = useState<"steps" | "calories" | "distance">("steps");
  const [refreshing, setRefreshing] = useState(false);

  const showDatepicker = async (current: Date, setNewDate: any) => {
    DateTimePickerAndroid.open({
      value: current,
      onChange: (event, selectedDate) => {
        setNewDate(selectedDate);
        DateTimePickerAndroid.dismiss('date');
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const getMetrics = async () => {
    setRefreshing(true);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    const metrics = await api.getMetrics(startDate.toISOString(), endDate.toISOString(), groupBy);
    const labelsAsDates = metrics.label.map(label => {
      switch (groupBy) {
        case 'day':
          return new Date(label.split('-').reverse().join('-'));
        case 'month':
          const [month, year] = label.split('-');
          return new Date(`${year}-${month}`);
        case 'year':
          return new Date(label);
      }
      return new Date();
    });

    // Get sorting order
    const sortIndices = labelsAsDates.map((date, index) => index).sort((a, b) => labelsAsDates[a].getTime() - labelsAsDates[b].getTime());
    const dataToDisplay = metrics[metric].map((m: number) => m.toFixed(1))
    const sortedLabels = sortIndices.map(index => metrics.label[index]);
    const sortedData = sortIndices.map(index => dataToDisplay[index]);

    // Format sorted labels for display

    // Format sorted labels for display
    const displayLabels = sortedLabels.map(label => {
      switch (groupBy) {
        case 'day':
        case 'month':
          return label;
        case 'year':
          return new Date(label).getFullYear().toString();
      }
    });

    setAllData({
      labels: displayLabels,
      datasets: [
        {
          data: sortedData
        }
      ]
    });

    let initialData = {
      labels: displayLabels.slice(-5),
      datasets: [
        {
          data: sortedData.slice(-5)
        }
      ]
    }

    setDataIndex(0);
    setChartData(initialData);
    setRefreshing(false);
  }

  useEffect(() => {
    getMetrics();
  }, [startDate, endDate, groupBy, metric]);

  const nextData = async () => {
    if (dataIndex + 5 < allData.labels.length) {
      setDataIndex(dataIndex + 5);
      let newData = {
        labels: allData.labels.slice(dataIndex + 5, dataIndex + 10),
        datasets: [
          {
            data: allData.datasets[0].data.slice(dataIndex + 5, dataIndex + 10)
          }
        ]
      }
      setChartData(newData);
    }
  }

  const prevData = async () => {
    if (dataIndex - 5 >= 0) {
      setDataIndex(dataIndex - 5);
      let newData = {
        labels: allData.labels.slice(dataIndex - 5, dataIndex),
        datasets: [
          {
            data: allData.datasets[0].data.slice(dataIndex - 5, dataIndex)
          }
        ]
      }
      setChartData(newData);
    }
  }

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
      <View flex={1} justifyContent="space-evenly" marginTop={8}>
        <View flexDirection="row" alignItems={"center"} justifyContent="center">
          <Text bold fontSize={15} width={100}>Fecha inicio</Text>
          <LoadableButton
            customStyles={{
              width: 200, marginLeft: 20, backgroundColor: "#FFFFFF",
              borderColor: "#FF6060",
              borderWidth: 1,
            }}
            textColor={"#FF6060"}
            text={!startDate ? "elegir fecha inicio" : startDate.toLocaleDateString('es-ES')}
            onPress={async () => { await showDatepicker(startDate, setStartDate) }}
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
            text={!endDate ? "elegir fecha fin" : endDate.toLocaleDateString('es-ES')}
            onPress={async () => { await showDatepicker(endDate, setEndDate) }}
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
        <View flexDirection="row" justifyContent="space-between" marginX={12} marginTop={2}>
          <View flexDirection="row" >
            <LoadableButton
              customStyles={{
                borderRadius: 50,
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 5,
                paddingBottom: 0,
                marginRight: 5
              }}
              text={
                <View >
                  <MaterialIcons name="arrow-back" size={30} color="#ff6060" />
                </View>
              }
              hideTextWhileLoading

              onPress={prevData}
            />
            <LoadableButton
              customStyles={{
                borderRadius: 50,
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 5,
                paddingBottom: 0,
              }}
              text={
                <View >
                  <MaterialIcons name="arrow-forward" size={30} color="#ff6060" />
                </View>
              }
              hideTextWhileLoading

              onPress={nextData}
            />
          </View>
          <LoadableButton
            customStyles={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              padding: 0,
              paddingBottom: 0,
              paddingLeft: 5,

            }}
            spinnerProps={{
              paddingLeft: 2,
              paddingBottom: 2,
              size: 30
            }}
            text={
              <View flex={1} justifyContent="center" alignItems={"center"}>
                <MaterialIcons name="refresh" size={30} color="#fff" />
              </View>
            }
            hideTextWhileLoading
            overrideLoading={refreshing}
            onPress={getMetrics}
          />
        </View>
      </View>
      <View height={430} justifyContent="flex-end" >
        {chartData.datasets[0].data.length === 0 &&
          <View height={380} borderColor="#FF6060" borderWidth={2} margin={10} borderRadius={15} justifyContent="center">
            <EmptyListComponent text='No hay métricas disponibles todavía.' />
          </View>
        }
        {chartData.datasets[0].data.length > 0 &&

          <BarChart
            style={{
              marginVertical: 8,
              marginLeft: 10,
              borderRadius: 15,
              paddingTop: 30,
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
            height={400}
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


