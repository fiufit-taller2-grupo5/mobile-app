import React, { useState } from 'react';
import { View, Text, Button, Checkbox, Modal, VStack } from 'native-base';


const weekDaysData = [
  { day: 'lunes', id: 0 },
  { day: 'martes', id: 1 },
  { day: 'miercoles', id: 2 },
  { day: 'jueves', id: 3 },
  { day: 'viernes', id: 4 },
  { day: 'sabado', id: 5 },
  { day: 'domingo', id: 6 },
];

interface Props {
  weekDays: string[];
  setWeekDays: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function WeekDayInput(props: Props) {
  const { weekDays, setWeekDays } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedWeekDays, setSelectedWeekDays] = useState<any[]>([]);

  const showPicker = () => {
    setIsVisible(true);
  };

  const hidePicker = () => {
    setWeekDays(selectedWeekDays.map((weekDay) => weekDay.day));
    setIsVisible(false);
  };

  const handleChange = (weekDay: any) => {
    setSelectedWeekDays((prev) => {
      if (prev.includes(weekDay)) {
        return prev.filter((day) => day !== weekDay);
      } else {
        return [...prev, weekDay];
      }
    });
  }

  return (
    <View>
      <Button onPress={showPicker} backgroundColor={"white"}>
        {selectedWeekDays.map((weekDay) => <Text>
          {weekDay.day}
        </Text>)}
        {selectedWeekDays.length === 0 && <Text>Seleccionar Días</Text>}
      </Button>

      {isVisible &&
        <Modal isOpen={isVisible}>
          <View backgroundColor={"#FFFFFF"} width={"70%"} height={"45%"}>
            <VStack space={4} marginTop={"10%"}>
              {weekDaysData.map((weekDay) => {
                return (
                  <Checkbox
                    colorScheme='rose'
                    key={weekDay.day}
                    value={weekDay.day}
                    isChecked={selectedWeekDays.includes(weekDay)}
                    mr={"12"}
                    onChange={() => { handleChange(weekDay); }}
                    alignSelf={"center"}
                  >
                    <Text width={"20"}>
                      {weekDay.day}
                    </Text>
                  </Checkbox>
                );
              })}
              <Button backgroundColor={"#FF6060"}
                style={{ borderRadius: 30, alignSelf: "center" }}
                _text={{ color: "#FFFFFF", fontSize: "14px", fontWeight: "bold" }}
                onPress={hidePicker}
                width={"50%"}
              >
                Aceptar
              </Button>
            </VStack>
          </View>
        </Modal>
      }
    </View>
  );
}