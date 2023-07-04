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
import { FollowButton } from '../components/users/followButton';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

export default function RecommendationsScreen(props: Props) {



  return <NativeBaseProvider><View style={{ flex: 1 }} backgroundColor="#fff">
  </View></NativeBaseProvider>;
}
