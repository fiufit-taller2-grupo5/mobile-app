import { Text, Spinner, Button as NativeBaseButton, View, Modal } from "native-base";
import { CSSProperties, useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useToast } from 'native-base';

interface Props {
  onPress: () => Promise<string>;
  text: string;
  customStyles?: StyleProp<ViewStyle>;
}

const baseStyles = StyleSheet.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    width: 300,
    margin: 2,
    color: '#FFFFFF',
  },
});

export const Button = ({ text, customStyles, onPress }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const msg = await onPress();
      toast.show({
        description: msg,
        backgroundColor: "green.600",
        duration: 3000,
      })
    } catch (e: any) {
      toast.show({
        description: e.message,
        backgroundColor: "red.700",
        duration: 3000,
      })
      console.log(e);
    }
    setIsLoading(false);
  }

  const styles = StyleSheet.flatten([baseStyles.base, customStyles]);

  return (
    <>
      <NativeBaseButton onPress={handleClick} style={styles}>
        <View flexGrow={1} justifyContent={"space-around"} flexDirection={"row"} >
          <View width={"45%"} flexGrow={1} justifyContent={isLoading ? "space-between" : "center"} flexDirection={"row"} >
            <Text color={"#FFFFFF"} bold fontSize={"md"}>{text}</Text>
            {isLoading && <Spinner color={"#FFFFFF"} />}
          </View>
        </View>
      </NativeBaseButton>
    </>
  );
}
