import { NativeBaseProvider, Text, VStack, Icon } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Box } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Stopwatch from "../components/trainings/stopwatch"
import { LoadableButton } from "../components/commons/buttons";
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { API } from "../../api";
import { Alert } from 'react-native';
import GoogleFit from 'react-native-google-fit'

export type trainingSession = {
    id?: number;
    distance: number;
    duration: string;
    steps: number,
    calories: number,
    date: Date,
};

export default function TrainingSessionScreen({ route, navigation }: any) {
    const { trainingInfo } = route.params;

    const [steps, setSteps] = useState(1); //cambiar a 0
    const [calories, setCalories] = useState(1); //cambiar a 0
    const [distance, setDistance] = useState(1); //cambiar a 0
    const date = new Date();
    const [duration, setDuration] = useState("00:00:00");

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } as const;
    const api = new API(navigation);

    const getGoogleFitData = async (startTime: string, endTime: string) => {
        const today = new Date();
        const [startHours, startMinutes, startSeconds] = startTime.split(":").map(part => parseInt(part, 10));
        const [endHours, endMinutes, endSeconds] = endTime.split(":").map(part => parseInt(part, 10));

        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHours, startMinutes, startSeconds, 0);
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHours, endMinutes, endSeconds, 999);
      
        const options = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };

        const updateStepCount = () => {
            GoogleFit.getDailyStepCountSamples(options)
              .then(stepData => {
                setSteps(stepData.reduce((total, sample) => total + sample.steps[0].value, 0));
              })
              .catch(err => {
                console.error("error updating step count: ", err);
              });
        };
        setInterval(updateStepCount, 5000); 

        const updateCaloriesCount = () => {
            GoogleFit.getDailyCalorieSamples(options)
              .then(caloriesData => {
                setCalories(caloriesData.reduce((total, sample) => total + sample.calorie, 0));
              })
              .catch(err => {
                console.error("error updating calorie count: ", err);
              });
        };
        setInterval(updateCaloriesCount, 5000);

        const updateDistanceCount = () => {
            GoogleFit.getDailyDistanceSamples(options)
              .then(distanceData => {
                setDistance(distanceData.reduce((total, sample) => total + sample.distance, 0));
              })
              .catch(err => {
                console.error("error updating distance count: ", err);
              });
        };
        setInterval(updateDistanceCount, 5000);

        try {
            updateStepCount();
            //updateCaloriesCount();
            //updateDistanceCount();
          } catch (error) {
            console.log('Error fetching Google Fit data:', error);
          }
      };

    useFocusEffect(
        React.useCallback(() => {
            getGoogleFitData("00:00:00",duration);
            const onBackPress = () => {
                handleAddTrainingSession();
                return true; // Indicar que se ha manejado el evento del botón de retroceso
            };

            // Agregar el listener para el evento de botón de retroceso
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Limpiar el listener cuando el componente se desmonte
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const handleAddTrainingSession = () => {
        Alert.alert(
          'Confirmación',
          'Si continúa, el entrenamiento terminará. ¿Seguro desea terminarlo?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Terminar',
              onPress: async () => {
                await api.addTrainingSession(trainingInfo.id, {
                  distance: distance,
                  duration: duration,
                  steps: steps,
                  calories: calories,
                  date: date,
                })
                navigation.navigate('HomeScreen');
              },
            },
          ]
        );
      };
    
    const updateTime = (time: React.SetStateAction<string>) => {
        setDuration(time);
    };

    return (
        <NativeBaseProvider>
            <VStack style={styles.container}>
                <Text style={styles.title}>{trainingInfo.title}</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{trainingInfo.description}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Stopwatch onTimeChange={updateTime} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.date}>{date.toLocaleDateString('es-AR', options)}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Box bg="#FF6060" style={styles.dataBoxOne}>
                        <Icon
                            as={<MaterialIcons name="run-circle" />}
                            size={20}
                            color="#fff"
                            alignSelf="center"
                        />
                        <Text style={styles.dataText}>{steps}</Text>
                        <Text style={styles.dataLabel}>Pasos</Text>
                    </Box>
                    <Box bg="#FF6060" style={styles.dataBoxTwo}>
                        <Icon
                            as={<MaterialCommunityIcons name="fire-circle" />}
                            size={20}
                            color="#fff"
                            alignSelf="center"
                        />
                        <Text style={styles.dataText}>{calories}</Text>
                        <Text style={styles.dataLabel}>Calorías</Text>
                    </Box>
                    <Box bg="#FF6060" style={styles.dataBoxThree}>
                        <Icon
                            as={<Ionicons name="md-navigate-circle" />}
                            size={20}
                            color="#fff"
                            alignSelf="center"
                        />
                        <Text style={styles.dataText}>{distance} km</Text>
                        <Text style={styles.dataLabel}>Distancia</Text>
                    </Box>
                </View>
                <LoadableButton
                    text="Finalizar entrenamiento"
                    customStyles={{
                        backgroundColor: "#FF6060",
                        width: "70%",
                        height: "8%",
                        borderRadius: 30,
                        alignSelf: "center",
                        top: "0%"
                    }}
                    onPress={async () => {
                        handleAddTrainingSession();
                        return;
                    }}
                />
            </VStack>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 50,
        marginTop: -100, // Mueve el título hacia arriba
    },
    description: {
        fontSize: 23,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    elapsedTime: {
        fontSize: 85,
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: 100, // Mueve el título hacia arriba
        lineHeight: 85, // Ajusta el valor según el espacio deseado
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 10,
    },
    dataBoxOne: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        height: 200,
        minWidth: 120,
        backgroundColor: '#FF5252',
        marginBottom: 100, //probar que funcione
    },
    dataBoxTwo: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        height: 200,
        minWidth: 120,
        backgroundColor: '#212121',
    },
    dataBoxThree: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        height: 200,
        minWidth: 120,
        backgroundColor: '#757575',
    },
    dataText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 30,
        marginBottom: -10, // Ajusta el valor según el espacio deseado
    },
    dataLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 50,
    },
    dataLabelTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 50,
    },
    timeContainer: {
        alignItems: 'center', // Centra verticalmente el tiempo y su etiqueta
        marginTop: -80,
    },
    descriptionContainer: {
        alignItems: 'flex-start', // Centra verticalmente el tiempo y su etiqueta
        marginTop: 10, // Mueve el título hacia arriba
    },
});