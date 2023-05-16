import { NativeBaseProvider, VStack, Heading, Modal, View } from "native-base";
import { useEffect, useState } from "react";
import BirthDateForm from "../../components/metadata/birthdateForm";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import ErrorMessage from "../../components/form/errorMessage";
import globalUser from "../../../userStorage";


export default function ChangeDateScreen({ navigation }: any) {
  const [date, setDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateDate() {
      if (date !== null) {
        await globalUser.setBirthdate(date.toISOString());
      }
    }
    updateDate();
  }, [date]);

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
        ¿Cuando naciste?
      </Heading>
      <BirthDateForm top={"60%"} date={date} setDate={setDate}/>
      <SubmitButton
        navigation={navigation}
        optionName="birthdate"
        newValue={date}
        setter={setDate}
        emptyValue={null}
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
