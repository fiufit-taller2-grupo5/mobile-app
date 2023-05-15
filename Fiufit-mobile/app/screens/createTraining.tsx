import { VStack, Heading, Text, NativeBaseProvider } from "native-base";
import { createTrainingStyles } from "../styles";
import { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useTitleModal, useDescriptionModal, useTypeModal, useDifficultyModal } from "../components/trainingInfo/modals";
import InputButton from "../components/trainingInfo/inputButton";
import TitleModal from "../components/trainingInfo/titleModal";
import DescriptionModal from "../components/trainingInfo/descriptionModal";
import TypeModal from "../components/trainingInfo/typeModal";
import DifficultyModal from "../components/trainingInfo/difficultyModal";
import SubmitButton from "../components/trainingInfo/submitButton";


export type Training = {
  name: string,
  description: string,
  type: string,
  difficulty: number,
}

export default function CreateTrainingScreen({ navigation }: any) {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingDescription, setTrainingDescription] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [trainingDifficulty, setTrainingDifficulty] = useState(0);

  const { isTitleOpen, openTitle, closeTitle } = useTitleModal();
  const { isDescriptionOpen, openDescription, closeDescription } = useDescriptionModal();
  const { isTypeOpen, openType, closeType } = useTypeModal();
  const { isDifficultyOpen, openDifficulty, closeDifficulty } = useDifficultyModal();

  return <NativeBaseProvider>
    <VStack style={createTrainingStyles.stack}>
      <Heading style={createTrainingStyles.heading}>Nuevo entrenamiento</Heading>
      <Text style={createTrainingStyles.text}>Detalles:</Text>
      <InputButton
        top="45%"
        openModalFunction={openTitle}
        iconModuleRight={MaterialIcons}
        iconNameRight="drive-file-rename-outline"
        paddingRightIcon="-420%"
        paddingText="-380%"
        iconModuleLeft={AntDesign}
        iconNameLeft="right"
        paddingLeftIcon="410%"
        text="Nombre"
      />
      <InputButton
        top="50%"
        openModalFunction={openDescription}
        iconModuleRight={MaterialIcons}
        iconNameRight="description"
        paddingRightIcon="-360%"
        paddingText="-340%"
        iconModuleLeft={AntDesign}
        iconNameLeft="right"
        paddingLeftIcon="360%"
        text="Descripción"
      />
      <InputButton
        top="55%"
        openModalFunction={openType}
        iconModuleRight={MaterialCommunityIcons}
        iconNameRight="dumbbell"
        paddingRightIcon="-450%"
        paddingText="-400%"
        iconModuleLeft={AntDesign}
        iconNameLeft="right"
        paddingLeftIcon="450%"
        text="Tipo"
      />
      <InputButton
        top="60%"
        openModalFunction={openDifficulty}
        iconModuleRight={Feather}
        iconNameRight="activity"
        paddingRightIcon="-390%"
        paddingText="-340%"
        iconModuleLeft={AntDesign}
        iconNameLeft="right"
        paddingLeftIcon="390%"
        text="Dificultad"
      />

      <TitleModal
        isTitleOpen={isTitleOpen}
        closeTitle={closeTitle}
        trainingTitle={trainingTitle}
        setTrainingTitle={setTrainingTitle}
      />

      <DescriptionModal
        isDescriptionOpen={isDescriptionOpen}
        closeDescription={closeDescription}
        trainingDescription={trainingDescription}
        setTrainingDescription={setTrainingDescription}
      />

      <TypeModal
        isTypeOpen={isTypeOpen}
        closeType={closeType}
        trainingType={trainingType}
        setTrainingType={setTrainingType}
      />

      <DifficultyModal
        isDifficultyOpen={isDifficultyOpen}
        closeDifficulty={closeDifficulty}
        trainingDifficulty={trainingDifficulty}
        setTrainingDifficulty={setTrainingDifficulty}
      />

      <SubmitButton
        trainingTitle={trainingTitle}
        trainingDescription={trainingDescription}
        trainingDifficulty={trainingDifficulty}
        trainingType={trainingType}
        navigation={navigation}
      />
    </VStack>
  </NativeBaseProvider>;
}