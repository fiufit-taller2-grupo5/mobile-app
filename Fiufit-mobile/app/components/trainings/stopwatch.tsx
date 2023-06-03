import React, { useState, useEffect } from "react";
import { Text } from "native-base";
import { StyleSheet } from 'react-native';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        setRunning(true)
        let interval: string | number | NodeJS.Timeout | undefined;
        if (running) {
            interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);
    return (
      <Text style={styles.elapsedTime}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:{("0" + ((time / 10) % 100)).slice(-2)}</Text>
    );
  };

export default Stopwatch;

const styles = StyleSheet.create({
    elapsedTime: {
        fontSize: 85,
        fontWeight: 'bold',
        justifyContent:'center',
        marginTop: 100,
        lineHeight: 85,
    },
});

/*
<button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>       */