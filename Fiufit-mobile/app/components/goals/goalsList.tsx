import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
} from 'native-base';
import {
  API,
  AthleteGoal,
} from "../../../api";
import { RefreshControl } from 'react-native';
import { GoalsInfoCard } from "./goalsInfoCard";
import { LoadableButton } from "../commons/buttons";

interface Props {
  navigation: any;
  userId?: number;
  forceRefresh?: boolean;
  usingScrollView?: boolean;
}

export default function GoalsList(props: Props) {
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [goalsList, setGoalsList] = useState<AthleteGoal[]>([]);

  //metas de prueba 
  const goals = [{
      id: 1,
      title: "correr 10 km en el dia",
      description: "correr un monton",
      type: "Distancia",
      metric: 10,
      athleteId: props.userId,
      multimedia: undefined,
    },
    {
      id: 2,
      title: "llegar a 100 pasos en el dia",
      description: "caminar un poco mas",
      type: "Pasos",
      metric: 100,
      athleteId: props.userId,
      multimedia: undefined,
    },
    {
      id: 3,
      title: "hacer mucho deporte",
      description: "gastar 50 calorias por dia",
      type: "Calorias",
      metric: 50,
      athleteId: props.userId,
      multimedia: undefined,
    }
  ];

  const updateData = async () => {
    await getGoalsList();
  }

  useEffect(() => {
    if(props.usingScrollView) {
      updateData();
      console.log("force refreshando")
    }
  }, [props.forceRefresh])

  const api = new API(navigation);
  
  const getGoalsList = async () => {
    setRefreshing(true);
    try {
        //const goals = await api.getUserGoals(props.userId);
        setGoalsList(goals)
    } catch (e: any) {
      console.error("error getting goals list", e.message);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    updateData();
  }, [])

  return (
    <>
        <View style={{ display: "flex", alignItems: 'flex-end', paddingHorizontal: 15 }}>
          <LoadableButton
            customStyles={{ width: "100%" }}
            text="Crear nueva meta"
            onPress={async () => { navigation.navigate('CreateGoalScreen'); }}
          />
        </View>
      {props.usingScrollView && goalsList.map(goal => {
        return <GoalsInfoCard
          key={goal.id.toString()}
          goalData={goal}
          navigation={navigation}
          navigateToScreen="GoalInfoScreen"
        />
      })}
      {!props.usingScrollView && <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={goalsList}
        marginBottom={0}
        marginTop={0}
        renderItem={(goal) => (
          <GoalsInfoCard
            goalData={goal.item}
            navigation={navigation}
            navigateToScreen="GoalInfoScreen"
          />
        )}
        keyExtractor={(goal) => goal.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { getGoalsList() }} />}
      />}
    </>
  );
}
