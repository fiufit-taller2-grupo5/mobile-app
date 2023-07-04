import { Box, Text, View, NativeBaseProvider, Button, Image, HStack } from 'native-base';
import { editProfileStyles } from '../styles';
import { BarChart, ProgressChart } from "react-native-chart-kit";
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import React, { useEffect, useState } from 'react';
import globalUser from '../../userStorage';
import { LoadableButton } from '../components/commons/buttons';
import TrainingsList from '../components/trainings/trainingsList';
import { API } from '../../api';
import { userInfo } from '../../asyncStorageAPI';
import { MaterialIcons } from "@expo/vector-icons";
import { collection, query, where, getDocs, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FollowButton } from '../components/users/followButton';
import { ScrollView } from 'react-native';
import { RefreshControl, Dimensions } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

export default function MetricsScreen(props: Props) {

  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
    <BarChart
      style={{
        marginVertical: 8,
        marginLeft: 10,
        marginRight: 8,
        borderRadius: 8,
        elevation: 20,
        // borderWidth: 1

      }}
      showValuesOnTopOfBars
      showBarTops
      data={data}
      width={Dimensions.get("window").width - 20}
      height={320}
      yAxisLabel=""
      yAxisSuffix='km'
      chartConfig={{
        backgroundColor: "#ff6060",
        backgroundGradientFrom: "#ff8080",
        backgroundGradientTo: "#ff5050",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  </View></NativeBaseProvider>;
}
