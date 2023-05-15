// screen that allows the user to rate a training session, which includes a punctual rating and a comment

import { Container, NativeBaseProvider } from "native-base";
import { useState } from "react";

// Path: Fiufit-mobile/app/screens/rateTraining.tsx

export default function RateTrainingScreen({ route, navigation }: any) {
    const { trainingData } = route.params;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleRating = (value: number) => {
        setRating(value);
    };
    
    const handleComment = (text: string) => {
        setComment(text);
    };
    
    const handleRateTraining = async () => {
        setIsLoading(true);
        // const response = await rateTraining(trainingData.id, rating, comment);
        setIsLoading(false);
        // if (response) {
        // navigation.navigate("Trainings");
        // }
    };
    
    return (
        <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
            {/* <TrainingCard
            navigation={navigation}
            trainingData={trainingData}
            handleRating={handleRating}
            handleComment={handleComment}
            handleRateTraining={handleRateTraining}
            isLoading={isLoading}
            /> */}
        </Container>
        </NativeBaseProvider>
    );
    }