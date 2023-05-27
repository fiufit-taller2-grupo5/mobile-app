import { Image } from "native-base";


export default function WelcomeImage() {
  return (
    <Image
      marginBottom={10}
      width={300}
      height={300}
      source={require('../../../assets/images/logo.png')}
      alt="image"
    />
  );
}