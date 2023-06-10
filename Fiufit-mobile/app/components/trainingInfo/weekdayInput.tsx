import React, { useState } from 'react';
import { View, Text, Button, Checkbox, Modal, VStack } from 'native-base';


const weekDaysData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Props {
  weekDays: string[];
  setWeekDays: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function WeekDayInput(props: Props) {
  const { weekDays, setWeekDays } = props;
  const [isVisible, setIsVisible] = useState(false);

  const showPicker = () => {
    setIsVisible(true);
  };

  const hidePicker = () => {
    setIsVisible(false);
  };

  const handleChange = (weekDay: string) => {
    setWeekDays((prevWeekDays) => {
      if (prevWeekDays.includes(weekDay)) {
        return prevWeekDays.filter((item) => item !== weekDay);
      } else {
        return [...prevWeekDays, weekDay];
      }
    });
  }

  return (
    <View>
      <Button onPress={showPicker} backgroundColor={"white"}>
        <Text>{weekDays.length > 0 ? weekDays.join(", ") : "Días"}</Text>
      </Button>

      {isVisible &&
        <Modal isOpen={isVisible}>
          <View backgroundColor={"#FFFFFF"} width={"70%"} height={"45%"}>
            <VStack space={4} marginTop={"10%"}>
              {weekDaysData.map((weekDay) => {
                return (
                  <Checkbox
                    colorScheme='rose'
                    key={weekDay}
                    value={weekDay}
                    isChecked={weekDays.includes(weekDay)}
                    mr={"12"}
                    onChange={() => { handleChange(weekDay); }}
                    alignSelf={"center"}
                  >
                    <Text width={"20"}>
                      {weekDay}
                    </Text>
                  </Checkbox>
                );
              })}
              <Button backgroundColor={"#FF6060"} 
                style={{borderRadius:30, alignSelf: "center"}}
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