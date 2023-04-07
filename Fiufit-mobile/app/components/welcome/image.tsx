import { Image } from "native-base";


export default function WelcomeImage() {
  return (
    <Image
      top="-10%"
      width="100%"
      source={require('../../../assets/images/welcome_image.png')} 
      alt="image"
    />
  );
}