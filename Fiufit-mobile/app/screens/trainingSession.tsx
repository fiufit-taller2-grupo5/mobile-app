import { NativeBaseProvider, Text, VStack, Icon } from "native-base";
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Box } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Stopwatch from "../components/trainings/stopwatch"
import { LoadableButton } from "../components/commons/buttons";

export default function TrainingSessionScreen({ route, navigation }: any) {
    const { trainingInfo } = route.params;
    const steps = 6000; //Hacerlo con google fit
    const calories = 250; //Hacerlo con google fit
    const distance = 3.5; //Hacerlo con google fit

    return (
        <NativeBaseProvider>
            <VStack style={styles.container}>
                <Text style={styles.title}>{trainingInfo.title}</Text>
                <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{trainingInfo.description}</Text>
                </View>
                <View style={styles.timeContainer}>
                <Stopwatch />
                </View>
                <View style={styles.dataRow}>
                    <Box bg="#FF6060" style={styles.dataBoxOne}>
                    <Icon
                        as={<MaterialIcons name="run-circle"/>}
                        size={20}
                        color="#fff"
                        alignSelf="center"
                    />
                        <Text style={styles.dataText}>{steps}</Text>
                        <Text style={styles.dataLabel}>Pasos</Text>
                    </Box>
                    <Box bg="#FF6060" style={styles.dataBoxTwo}>
                    <Icon
                        as={<MaterialCommunityIcons name="fire-circle"/>}
                        size={20}
                        color="#fff"
                        alignSelf="center"
                    />
                        <Text style={styles.dataText}>{calories}</Text>
                        <Text style={styles.dataLabel}>Calorías</Text>
                    </Box>
                    <Box bg="#FF6060" style={styles.dataBoxThree}>
                    <Icon
                        as={<Ionicons name="md-navigate-circle"/>}
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
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 50, 
    },
    elapsedTime: {
        fontSize: 85,
        fontWeight: 'bold',
        justifyContent:'center',
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
        marginBottom: 20, // Espacio entre el título y el tiempo
    },
    descriptionContainer: {
        alignItems: 'flex-start', // Centra verticalmente el tiempo y su etiqueta
        marginTop: 10, // Mueve el título hacia arriba
    },
});