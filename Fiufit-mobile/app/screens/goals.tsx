import React from 'react';
import { Heading, View } from "native-base";
import GoalsList from '../components/goals/goalsList';

export default function GoalsScreen({ navigation }: any) {
    return <View style={{ flex: 1 }} backgroundColor="#fff">
        <Heading p="4" pb="3" size="md">
            Mis metas
        </Heading>
        <GoalsList navigation={navigation} />
    </View>;
}