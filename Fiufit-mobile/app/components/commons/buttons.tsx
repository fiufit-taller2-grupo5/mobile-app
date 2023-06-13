import { Text, Spinner, Button as NativeBaseButton, View, Link } from "native-base";
import { Component, CSSProperties, ReactElement, useState } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useToast } from 'native-base';

interface Props {
  onPress: () => Promise<any | void>;
  text: string | ReactElement;
  customStyles?: StyleProp<ViewStyle>;
  textColor?: string;
  overrideLoading?: boolean;
  hideTextWhileLoading?: boolean;
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
    backgroundColor: "#FF6060",
  },
});

export const LoadableButton = ({ text, customStyles, textColor, overrideLoading, hideTextWhileLoading, onPress }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleClick = (e: GestureResponderEvent) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const msg = await onPress();
        setIsLoading(false);
        if (msg) {
          toast.show({
            description: msg,
            backgroundColor: "green.600",
            duration: 3000,
          })
        }
      } catch (e: any) {
        setIsLoading(false);
        toast.show({
          description: e.message,
          backgroundColor: "red.700",
          duration: 3000,
        })
        console.log(e);
      }
    }, 0);
  }

  const styles = StyleSheet.flatten([baseStyles.base, customStyles]);

  return (
    <>
      <NativeBaseButton onPress={(e) => handleClick(e)} style={styles}>
        <View flexGrow={1} justifyContent={"space-around"} flexDirection={"row"} >
          <View width={"100%"} flexGrow={1} justifyContent={"center"} flexDirection={"row"} >
            <Text color={textColor ? textColor : "#FFFFFF"} bold fontSize={"md"} marginRight={isLoading ? 3 : 0} alignItems="center" justifyContent="center">{(isLoading || overrideLoading) && hideTextWhileLoading ? "" : text}</Text>
            {(isLoading || overrideLoading) && <Spinner color={textColor ? textColor : "#FFFFFF"} />}
          </View>
        </View>
      </NativeBaseButton>
    </>
  );
}

export const LoadableLink = ({ text, customStyles, onPress }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const msg = await onPress();
        setIsLoading(false);
        if (msg) {
          toast.show({
            description: msg,
            backgroundColor: "green.600",
            duration: 3000,
          })
        }
      } catch (e: any) {
        setIsLoading(false);
        toast.show({
          description: e.message,
          backgroundColor: "red.700",
          duration: 3000,
        })
        console.log(e);
      }
    }, 0);
  }

  const styles = StyleSheet.flatten([customStyles]);

  return (
    <>
      <Link
        style={styles}
        onPress={handleClick}
        _text={{ color: "#BC2666" }}
      >
        <Text color={"#BC2666"} underline fontSize={"sm"} marginRight={isLoading ? 3 : 0}>{text}</Text>
        {isLoading && <Spinner color={"#BC2666"} />}
      </Link>
    </>
  );
}

