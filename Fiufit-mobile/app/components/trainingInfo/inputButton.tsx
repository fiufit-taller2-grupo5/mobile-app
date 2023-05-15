import { Button, HStack, Icon, Text } from 'native-base';
import { createTrainingStyles } from '../../styles';



interface Props {
  top: string;
  openModalFunction: () => void;
  iconModuleRight: any;
  iconNameRight: string;
  paddingRightIcon: string;
  paddingText: string;
  iconModuleLeft: any;
  iconNameLeft: string;
  paddingLeftIcon: string;
  text: string;
}

export default function InputButton(props: Props) {
  const { top, openModalFunction, iconModuleRight, iconNameRight, paddingRightIcon, paddingText, iconModuleLeft, iconNameLeft, paddingLeftIcon, text } = props;

  return <Button
      style={createTrainingStyles.buttonForm}
      top={top} onPress={() => openModalFunction()}
    >
    <HStack>
      <Icon as={iconModuleRight} size={6} name={iconNameRight} color="#707070" left={paddingRightIcon}/>
      <Text color="#000000" left={paddingText}>
        {text}
      </Text>
      <Icon as={iconModuleLeft} name={iconNameLeft} size={6} color="#707070" left={paddingLeftIcon}/>  
    </HStack>
  </Button>
}