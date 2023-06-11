import { NativeBaseProvider, Text, VStack, Icon, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Box } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Stopwatch from "../components/trainings/stopwatch"
import { LoadableButton } from "../components/commons/buttons";
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { API } from "../../api";
import { Alert } from 'react-native';
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import { share } from "../../shareUtils";

export type trainingSession = {
    id?: number;
    distance: number;
    duration: string;
    steps: number,
    calories: number,
    date: Date,
    trainingPlanId: number,
};

export default function TrainingSessionScreen({ route, navigation }: any) {
    const { trainingInfo } = route.params;

    const [steps, setSteps] = useState(0); //cambiar a 0
    const [calories, setCalories] = useState(0); //cambiar a 0
    const [distance, setDistance] = useState(0); //cambiar a 0
    const date = new Date();
    const [duration, setDuration] = useState("00:00:00");

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } as const;
    const api = new API(navigation);

    const toast = useToast();
    const [tickers, setTickers] = useState<NodeJS.Timer[]>([]);


    const getGoogleFitData = async (startTime: string, endTime: string) => {
        const today = new Date();
        const [startHours, startMinutes, startSeconds] = startTime.split(":").map(part => parseInt(part, 10));
        const [endHours, endMinutes, endSeconds] = endTime.split(":").map(part => parseInt(part, 10));
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHours, startMinutes, startSeconds, 0);
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHours, endMinutes, endSeconds, 999);

        const rightNowStartTime = new Date();
        const inThreeHours = new Date();
        inThreeHours.setHours(inThreeHours.getHours() + 3);
        const options = {
            startDate: rightNowStartTime.toISOString(),
            endDate: inThreeHours.toISOString(),
            bucketUnit: BucketUnit.DAY, // required, DAY or HOUR
            bucketInterval: 1, // required, 1 or 2 for HOUR bucketUnit or 1 - 24 for DAY bucketUnit
        };

        let initialCalories = 0;
        try {
            const initialCaloriesResponse = await GoogleFit.getDailyCalorieSamples(options);
            if (initialCaloriesResponse.length > 0) {
                initialCalories = initialCaloriesResponse[0].calorie;
                console.log("initial calories", initialCalories);
            }
        } catch (e) {
            console.log("error getting initial calories", e);
        }

        const updateStepCount = () => {

            GoogleFit.getDailyStepCountSamples(options)
                .then(res => {
                    console.log("step data:", res);
                    let estimated = res.find(results => results.source === "com.google.android.gms:estimated_steps");
                    if (estimated?.steps[0] !== undefined) {
                        console.log("daily steps:", estimated?.steps[0]);
                        setSteps(estimated?.steps[0]?.value || 0);
                    }
                })
                .catch(err => {
                    console.error("error updating step count: ", err);
                });
        };
        const stepInterval = setInterval(updateStepCount, 1000);
        setTickers(prev => [...prev, stepInterval]);

        const updateCaloriesCount = () => {
            GoogleFit.getDailyCalorieSamples(options)
                .then(caloriesData => {
                    console.log("calories data", caloriesData)
                    if (caloriesData.length > 0) {
                        console.log("current calories: ", caloriesData[0].calorie)
                        console.log("initial calories: ", initialCalories);
                        setCalories(caloriesData[0].calorie - initialCalories);
                    }
                })
                .catch(err => {
                    console.error("error updating calorie count: ", err);
                });
        };
        const caloriesInterval = setInterval(updateCaloriesCount, 1000);
        setTickers(prev => [...prev, caloriesInterval]);

        const updateDistanceCount = () => {
            GoogleFit.getDailyDistanceSamples(options)
                .then(res => {
                    console.log("distance data", res)
                    if (res.length > 0) {
                        let estimated = res[0].distance / 1000;
                        console.log(estimated);
                        setDistance(estimated || 0);
                    }
                })
                .catch(err => {
                    console.error("error updating distance count: ", err);
                });
        };
        const distanceInterval = setInterval(updateDistanceCount, 1000);
        setTickers(prev => [...prev, distanceInterval]);
    };

    useFocusEffect(
        React.useCallback(() => {
            const allScopes: string[] = Object.values(Scopes);

            const options = {
                scopes: allScopes as Scopes[],
            }
            GoogleFit.authorize(options).then(() => {
                // var date = new Date();
                // var time = date.toISOString().split('T')[1].split('.')[0];
                // console.log("now", time);
                // // transfrom now to format hh:mm:ss
                toast.show({
                    description: "hola",
                    backgroundColor: "red.700",
                    duration: 3000,
                })
                getGoogleFitData("00:00:00", "03:00:00");
                const onBackPress = () => {
                    handleAddTrainingSession();
                    return true; // Indicar que se ha manejado el evento del botón de retroceso
                };

                // Agregar el listener para el evento de botón de retroceso
                BackHandler.addEventListener('hardwareBackPress', onBackPress);

                // Limpiar el listener cuando el componente se desmonte
                return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            });
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
                        console.log(trainingInfo.id, distance, duration, steps, calories, date);

                        try {

                            await api.addTrainingSession(trainingInfo.id, {
                                distance: distance,
                                duration: duration,
                                steps: steps,
                                calories: calories,
                                date: date,
                                trainingPlanId: trainingInfo.trainingPlanId,
                            })
                            tickers.forEach(ticker => {
                                clearInterval(ticker);
                            });
                            navigation.navigate('HomeScreen');
                        } catch (err: any) {
                            tickers.forEach(ticker => {
                                clearInterval(ticker);
                            });
                            Alert.alert(
                                'Error',
                                err.message,
                            );
                        }
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
                        <Text style={styles.dataText}>{calories.toFixed(2)}</Text>
                        <Text style={styles.dataLabel}>Calorías</Text>
                    </Box>
                    <Box bg="#FF6060" style={styles.dataBoxThree}>
                        <Icon
                            as={<Ionicons name="md-navigate-circle" />}
                            size={20}
                            color="#fff"
                            alignSelf="center"
                        />
                        <Text style={styles.dataText}>{distance.toFixed(2)} km</Text>
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