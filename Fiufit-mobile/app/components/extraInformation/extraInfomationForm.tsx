import { VStack, Text, HStack, Link, Select, CheckIcon, Checkbox, Button } from "native-base";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from "react";

interface Props {
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
  dateOfBirth: Date;
  setDateOfBirth: (dateOfBirth: Date) => void;
  weight: number
  setWeight: (weight: number) => void;
  height: number;
  setHeight: (height: number) => void;
  interests: string;
  setInterests: (interests: string) => void;
  navigation: any,
  route: any
}

export default function ExtraInformationForm(props: Props) {
  const {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    dateOfBirth,
    setDateOfBirth,
    weight,
    setWeight,
    height,
    setHeight,
    interests,
    setInterests,
    navigation,
    route
  } = props;

  const [date, setDate] = useState(new Date(1598051730000));

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    DateTimePickerAndroid.dismiss('date');
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDateOfBirth(currentDate);
  };

  const weightStart = 30;
  const weightFinish = 150;
  const weightData = Array.from({ length: weightFinish }, (_, a) => a + weightStart);

  const heightStart = 130;
  const heightFinish = 220;
  const heightData = Array.from({ length: heightFinish }, (_, a) => a + heightStart);

  // TODO: use endpoint from backend
  const interestsData = ["Deportes", "Música", "Cine", "Arte", "Literatura", "Cocina", "Viajes", "Tecnología", "Otros"];
  console.log("latitude:", latitude);
  return (
    <VStack space={6} alignItems="center" top={"10%"}>
      <HStack space={48}>
        <Text style={{ fontSize: 13, top: "2%" }}>Ubicación</Text>
        <Link
          isUnderlined={false}
          style={{ top: "20%" }}
          onPress={() => {
            //navigation.navigate('MapScreen');
            console.log("maps screen not implemented yet");
          }}
          _text={{ color: "#FF6060" }}
        >
          Modificar
        </Link>
      </HStack>
      <HStack space={4}>
        <Text style={{ color: "#9d9d9d", fontSize: 13 }}>Latitud:</Text>
        <Text style={{ color: "#9d9d9d", fontSize: 13 }}>{latitude.toFixed(5)}</Text>
        <Text style={{ color: "#9d9d9d", fontSize: 13 }}>Longitud:</Text>
        <Text style={{ color: "#9d9d9d", fontSize: 13 }}>{longitude.toFixed(5)}</Text>
      </HStack>
      <HStack space={8}>
        <Text style={{ fontSize: 13, top: "2%" }}>Fecha de nacimiento!</Text>
        <Button onPress={showDatepicker}>
          <Text>Seleccionar fecha de nacimiento</Text>
        </Button>
        <Text>selected: {date.toLocaleString()}</Text>
      </HStack>
      <Select
        width="xs"
        variant="underlined"
        accessibilityLabel="Seleccionar peso"
        placeholder="Seleccionar peso"
        placeholderTextColor={"#000000"}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
        mt={1}
        onValueChange={numberString => setWeight(parseInt(numberString))}
      >
        {weightData.map((number) => {
          return <Select.Item key={number} label={number.toString()} value={number.toString()} />
        })}
      </Select>
      <Select
        width="xs"
        variant="underlined"
        accessibilityLabel="Seleccionar altura"
        placeholder="Seleccionar altura"
        placeholderTextColor={"#000000"}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
        mt={1}
        onValueChange={numberString => setHeight(parseInt(numberString))}
      >
        {heightData.map((number) => {
          return <Select.Item key={number} label={number.toString()} value={number.toString()} />
        })}
      </Select>
      <VStack space={8}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '80%',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {interestsData.map((interest) => {
          return (
            <Checkbox colorScheme='rose' key={interest} value={interest}>
              {interest}
            </Checkbox>
          );
        })}
      </VStack>
    </VStack>
  );
}
