import { useState, useEffect } from "react";
import { VStack, Input, Heading, NativeBaseProvider, Modal, View, Button } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import ErrorMessage from "../../components/form/errorMessage";
import { API } from '../../../api';
import ImageInput from "../../components/trainingInfo/inputImage";


export default function ChangeImageScreen({ navigation }: any) {
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const api = new API(navigation);

  useEffect(() => {
    async function updateName() {
      if (image !== "") {
        await api.addImageUser(image);
      }
    }
    updateName();
  }, [image]);

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
        Selecciona una nueva imagen
      </Heading>
      <ImageInput
        image={image}
        setImage={setImage}
        customStyles={{top: "50%", marginBottom: "10%"}}
      />
      <SubmitButton
        navigation={navigation}
        optionName="image" 
        newValue={image}
        setter={setImage}
        emptyValue=""
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
