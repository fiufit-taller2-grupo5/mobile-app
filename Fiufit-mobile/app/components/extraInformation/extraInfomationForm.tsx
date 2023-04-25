import { VStack, Text, HStack, Checkbox, Button, Input } from "native-base";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface Props {
  streetName: string;
  setStreetName: (streetName: string) => void;
  streetNumber: number;
  setStreetNumber: (streetNumber: number) => void;
  date: Date | null;
  setDate: (date: Date | null) => void;
  weight: number
  setWeight: (weight: number) => void;
  height: number;
  setHeight: (height: number) => void;
  interests: Array<string>;
  setInterests: (interests: any) => void;
}

export default function ExtraInformationForm(props: Props) {
  const {
    streetName,
    setStreetName,
    streetNumber,
    setStreetNumber,
    date,
    setDate,
    weight,
    setWeight,
    height,
    setHeight,
    interests,
    setInterests,
  } = props;

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

  let interestsSelected = interests;

  const handleChange = (interest: string) => {
    if (interestsSelected.includes(interest)) {
      const index = interestsSelected.indexOf(interest);
      if (index > -1) {
        interestsSelected.splice(index, 1);
      }
      setInterests(interestsSelected);
    }
    else {
      interestsSelected.push(interest);
      setInterests(interestsSelected);
    }
  }

  // TODO: use endpoint from backend
  const interestsData = ["HIT", "Cardio", "Body Pump", "Functional", "Resistance", "Running"];

  return (
    <VStack space={6} alignItems="center" top={"5%"}>
      <Text style={{ fontSize: 13, top: "2%" }}>Ubicación</Text>
      <HStack space={6} alignItems="center" >
        <Input
          width={200}
          variant="underlined"
          placeholder="Nombre de la calle"
          placeholderTextColor={"#000000"}
          onChangeText={text => setStreetName(text)}
          value={streetName}
        />
        <Input
          width={20}
          variant="underlined"
          placeholder="Número de la calle"
          placeholderTextColor={"#000000"}
          onChangeText={text => setStreetNumber(parseInt(text))}
          value={streetNumber.toString()}
        />
      </HStack>
      <Button onPress={showDatepicker} variant="ghost" backgroundColor={"white"}>
        <Text>{date ? "Fecha de nacimiento: " + date.toLocaleString().substring(0, 9) : "Ingresar Fecha de nacimiento"}</Text>
      </Button>
      <Input
        width="xs"
        variant="underlined"
        accessibilityLabel="Seleccionar peso"
        placeholder="Seleccionar peso"
        placeholderTextColor={"#000000"}
        mt={1}
        keyboardType="numeric"
        value={weight.toString()}
        InputRightElement={
          <Text
            color="muted.400"
            fontSize="xs"
            mr={2}
            _light={{
              color: "blueGray.400",
            }}
            _dark={{
              color: "blueGray.50",
            }}
          >
            kgs
          </Text>
        }
        onChangeText={text => setWeight(parseInt(text))}
      />
      <Input
        width="xs"
        variant="underlined"
        accessibilityLabel="Seleccionar altura"
        placeholder="Seleccionar altura"
        placeholderTextColor={"#000000"}
        mt={1}
        keyboardType="numeric"
        value={height.toString()}
        InputRightElement={
          <Text
            color="muted.400"
            fontSize="xs"
            mr={2}
            _light={{
              color: "blueGray.400",
            }}
            _dark={{
              color: "blueGray.50",
            }}
          >
            cm
          </Text>
        }
        onChangeText={text => setHeight(parseInt(text))}
      />
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
        {/*rows of 3 elements, equidistant to each other horizontally and vertically:*/}
        <VStack space={"9"}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: "wrap",
            alignItems: 'center',
            justifyContent: "flex-start"
          }}
        >
          {interestsData.map((interest) => {
            return (
              <Checkbox
                colorScheme='rose'
                key={interest}
                value={interest}
                mr={"12"}
                onChange={() => {handleChange(interest);}}
              >
                <Text width={"20"}>
                  {interest}
                </Text>
              </Checkbox>
            );
          })}
        </VStack>
      </VStack>
    </VStack>
  );
}
