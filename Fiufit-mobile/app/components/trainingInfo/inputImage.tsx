import * as ImagePicker from 'expo-image-picker';
import { View, Button, Text } from 'native-base';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';


interface Props {
  image: string;
  setImage: (image: string) => void;
  customStyles?: StyleProp<ViewStyle>;
}

export default function ImageInput(props: Props) {
  const { image, setImage, customStyles } = props;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (result.assets !== null) {
      setImage(result.assets[0].uri);
    }
  };

  const styles = StyleSheet.flatten([customStyles]);
  console.log("IMAGE ", image);

  return (
    <View>
      <Button style={styles} variant='ghost' onPress={pickImage}>
        <Text>{image === null ? "Seleccioná una imagen" : "Toca para modificar"}</Text>
      </Button>
    </View>
  );
}
