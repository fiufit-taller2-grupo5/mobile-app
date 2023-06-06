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

export type trainingSession = {
    id?: number;
    distance: number;
    duration: number; //cambiar a string
    steps: number,
    calories: number,
    date: Date,
};

export default function TrainingSessionScreen({ route, navigation }: any) {
    const { trainingInfo } = route.params;
    const steps = 6000; //Hacerlo con google fit
    const calories = 250; //Hacerlo con google fit
    const distance = 3; //Hacerlo con google fit
    const duration = 10; //Sacarlo y usar durationTime
    const date = new Date();
    const [durationTime, setDurationTime] = useState("00:00:00");
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } as const;

    const api = new API(navigation);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                handleAddTrainingSession();
                navigation.navigate('HomeScreen'); // Navegar a la HomeScreen al presionar el botón de retroceso
                return true; // Indicar que se ha manejado el evento del botón de retroceso
            };

            // Agregar el listener para el evento de botón de retroceso
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Limpiar el listener cuando el componente se desmonte
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const handleAddTrainingSession = async () => {
        await api.addTrainingSession(trainingInfo.id, {
            distance: distance,
            duration: duration,
            steps: steps,
            calories: calories,
            date: date,
        });
    };

    const updateTime = (time: React.SetStateAction<string>) => {
        setDurationTime(time);
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
                        handleAddTrainingSession()
                        navigation.navigate("HomeScreen")
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
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 50,
        marginTop: -200, // Mueve el título hacia arriba
    },
    description: {
        fontSize: 25,
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