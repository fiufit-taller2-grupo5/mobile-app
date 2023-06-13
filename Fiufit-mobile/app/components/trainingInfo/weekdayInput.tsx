import React, { useState } from 'react';
import { View, Text, Button, Checkbox, Modal, VStack } from 'native-base';


const weekDaysData = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

interface Props {
  weekDays: string[];
  setWeekDays: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function WeekDayInput(props: Props) {
  const { weekDays, setWeekDays } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);

  const showPicker = () => {
    setIsVisible(true);
  };

  const hidePicker = () => {
    setWeekDays(selectedWeekDays.map((weekDay) => weekDay));
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
        {selectedWeekDays.map((weekDay) => <Text key={weekDay}>
          {weekDay}
        </Text>)}
        {selectedWeekDays.length === 0 && <Text>Seleccionar Días</Text>}
      </Button>

      {isVisible &&
        <Modal isOpen={isVisible}>
          <View backgroundColor={"#FFFFFF"} width={"70%"} height={"45%"}>
            <VStack space={4} marginTop={"10%"}>
              {weekDaysData.map((weekDay) =>
                <Checkbox
                  colorScheme='rose'
                  key={weekDay}
                  value={weekDay}
                  isChecked={selectedWeekDays.includes(weekDay)}
                  mr={"12"}
                  onChange={() => { handleChange(weekDay); }}
                  alignSelf={"center"}
                >
                  <Text key={weekDay} width={"20"}>
                    {weekDay}
                  </Text>
                </Checkbox>
              )}
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