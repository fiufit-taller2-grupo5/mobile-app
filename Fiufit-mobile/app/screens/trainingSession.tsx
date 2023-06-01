import { NativeBaseProvider, Text } from "native-base";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Box, Progress } from 'native-base';

export default function TrainingSessionScreen({ route, navigation }: any) {
    const { trainingInfo } = route.params;
    const trainingTitle = 'Entrenamiento 1';
    const steps = 6000;
    const calories = 250;
    const distance = 3.5;
    const elapsedTime = '00:45:30';
    const completionPercentage = 70;
    return (
        <NativeBaseProvider>
    <Container style={styles.container}>
      <Text style={styles.title}>{trainingTitle}</Text>

      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <Box bg="#FF6060" style={styles.gridBox}>
            <Text style={styles.dashboardText}>{steps}</Text>
            <Text style={styles.dashboardLabel}>Pasos</Text>
          </Box>

          <Box bg="#FF6060" style={styles.gridBox}>
            <Text style={styles.dashboardText}>{calories}</Text>
            <Text style={styles.dashboardLabel}>Calorías</Text>
          </Box>
        </View>

        <View style={styles.gridRow}>
          <Box bg="#FF6060" style={styles.gridBox}>
            <Text style={styles.dashboardText}>{distance}</Text>
            <Text style={styles.dashboardLabel}>Distancia (km)</Text>
          </Box>

          <Box bg="#FF6060" style={styles.gridBox}>
            <Text style={styles.dashboardText}>{elapsedTime}</Text>
            <Text style={styles.dashboardLabel}>Tiempo</Text>
          </Box>
        </View>
      </View>
      <Progress
        colorScheme="pink"
        value={completionPercentage}
        size="xs"
        mt={4}
        mb={2}
      />
    </Container>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 3,
      paddingRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      minWidth: 400,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    gridContainer: {
      flex:1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridRow: {
      flexDirection: 'row',
      width: '80%',
      marginBottom: 5,
    },
    gridBox: {
      flex: 3,
      aspectRatio: 1,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
      height:200,
      minWidth:150,
    },
    dashboardText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    dashboardLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
  });
