import { VStack, Heading, NativeBaseProvider, Modal, View } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import React, { useEffect, useState } from "react";
import WeightForm from "../../components/metadata/weightForm";
import globalUser from "../../../userStorage";
import ErrorMessage from "../../components/form/errorMessage";


export default function ChangeWeightScreen({ navigation }: any) {
  const [weight, setWeight] = React.useState(50);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateWeight() {
      if (weight !== null) {
        await globalUser.setWeight(weight);
      }
    }
    updateWeight();
  }, [weight]);
  

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      {errorMessage && 
        <Modal
          style={{maxHeight:"20%", height:"20%", width:"100%", top:"-1.3%"}}
          _backdrop={{backgroundColor: "transparent"}}
          closeOnOverlayClick={true}
          onClose={() => setErrorMessage("")}
          isOpen={errorMessage !== ""}
        >
          <View maxHeight="20%" width="100%">
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
          </View>
        </Modal>
      }
      <Heading style={editProfileStyles.heading}>
        ¿Cuál es tu peso?
      </Heading>
      <WeightForm top="60%" weight={weight} setWeight={setWeight}/>
      <SubmitButton
        navigation={navigation}
        optionName="weight"
        newValue={weight}
        setter={setWeight}
        emptyValue={50}
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
