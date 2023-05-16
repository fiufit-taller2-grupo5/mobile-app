import { VStack, Heading, NativeBaseProvider, Modal, View } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useEffect, useState } from "react";
import HeightForm from "../../components/metadata/heightForm";
import ErrorMessage from "../../components/form/errorMessage";
import globalUser from "../../../userStorage";


export default function ChangeHeightScreen({ navigation }: any) {
  const [height, setHeight] = useState(150);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateHeight() {
      if (height !== null) {
        await globalUser.setHeight(height);
      }
    }
    updateHeight();
  }, [height]);

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
        ¿Cuál es tu altura?
      </Heading>
      <HeightForm top={"60%"} height={height} setHeight={setHeight}/>
      <SubmitButton
        navigation={navigation}
        optionName="height"
        newValue={height}
        setter={setHeight}
        emptyValue={150}
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
