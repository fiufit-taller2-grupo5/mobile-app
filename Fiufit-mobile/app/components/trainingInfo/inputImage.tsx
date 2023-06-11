import * as ImagePicker from 'expo-image-picker';
import { View, Button, Text } from 'native-base';


interface Props {
  image: string;
  setImage: (image: string) => void;
}

export default function ImageInput(props: Props) {
  const { image, setImage } = props;

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

  return (
    <View>
      <Button variant='ghost' onPress={pickImage}>
        <Text>{image === "" ? "Seleccioná una imagen" : "Toca para modificar"}</Text>
      </Button>
    </View>
  );
}
