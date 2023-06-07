import React, { useState } from 'react';
import { Container, Button, Text } from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


interface Props {
  placeholderText: string;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function TimePicker(props: Props) {
  const { placeholderText, selectedTime, setSelectedTime } = props;

  const [isVisible, setIsVisible] = useState(false);

  const showPicker = () => {
    setIsVisible(true);
  };

  const hidePicker = () => {
    setIsVisible(false);
  };

  const handleConfirm = (time : any) => {
    const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
    setSelectedTime(formattedTime);
    hidePicker();
  };

  return (
    <Container>
      <Button onPress={showPicker} backgroundColor={"white"}>
        <Text>{selectedTime ? selectedTime : placeholderText}</Text>
      </Button>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </Container>
  );
}