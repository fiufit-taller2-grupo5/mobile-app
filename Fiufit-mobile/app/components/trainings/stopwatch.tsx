import React, { useState, useEffect } from "react";
import { Text } from "native-base";
import { StyleSheet } from 'react-native';

const Stopwatch = ({ onTimeChange }: any) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms / 60000) % 60);
        const seconds = Math.floor((ms / 1000) % 60);
    
        return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    };

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

    useEffect(() => {
        onTimeChange(formatTime(time));
      }, [time, onTimeChange]);

    return (
        <Text style={styles.elapsedTime}>{formatTime(time)}</Text>
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