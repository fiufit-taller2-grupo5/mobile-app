import { NativeBaseProvider, Text } from "native-base";
import { View, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useCountdown } from 'react-native-countdown-circle-timer'

export default function CountdownTimerScreen({ route, navigation }: any) {
    const { trainingInfo } = route.params;
    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,
    } = useCountdown({ isPlaying: true, duration: 3, initialRemainingTime: 3, colors: '#abc' })
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <CountdownCircleTimer
                    isPlaying
                    duration={3}
                    colors={['#FF5252', '#FF5252', '#FF5252', '#FF5252']}
                    colorsTime={[7, 5, 2, 0]}
                    size={300}
                    strokeWidth={30}
                    onComplete={() => {
                        navigation.navigate("TrainingSessionScreen", { trainingInfo: trainingInfo })
                        return;
                    }}
                    strokeLinecap='butt'
                >
                    {({ remainingTime }) => <View style={styles.time}><Text style={{ fontSize: 36, lineHeight: 36 }}>{remainingTime}</Text></View>}
                </CountdownCircleTimer>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        backgroundColor: '#fff',
        padding: 8,
    },
    time: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
});