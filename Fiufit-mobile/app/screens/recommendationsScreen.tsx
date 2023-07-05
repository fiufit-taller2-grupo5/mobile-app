import { Box, Text, View, NativeBaseProvider, Button, Image, HStack } from 'native-base';
import { editProfileStyles } from '../styles';
import { ProgressChart } from "react-native-chart-kit";
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
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrainingsScreen from './trainings';
import UsersScreen from './users';

const Tab = createMaterialTopTabNavigator();

export default function RecommnedationTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#ff6060' },
      }}>
      <Tab.Screen name="Entrenamientos" component={TrainingsScreen} />
      <Tab.Screen name="Usuarios" component={UsersScreen} />
    </Tab.Navigator>
  );
}

interface Props {
  navigation: any;
  route: any;
}

export function RecommendationsScreen(props: Props) {
  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
  </View></NativeBaseProvider>;
}
