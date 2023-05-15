import { VStack, Button, Text } from 'native-base';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


interface Props {
  top: string;
  date: Date | null;
  setDate: (date: Date) => void;
}

export default function BirthDateForm(props: Props) {
  const { top, date, setDate } = props;

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    DateTimePickerAndroid.dismiss('date');
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <VStack height="20%">
      <Button top={top} onPress={showDatepicker} variant="ghost" backgroundColor={"white"}>
        <Text>{date ? "Fecha de nacimiento: " + date.toLocaleString().substring(0, 9) : "Ingresar Fecha de nacimiento"}</Text>
      </Button>
    </VStack>
  );
}