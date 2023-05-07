import { VStack } from "native-base";
import InputForm from "../form/inputForm";
import InputPassword from "../form/inputPassword";


interface Props {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}


export default function RegisterForm(props: Props) {
  const { name, setName, email, setEmail, password, setPassword } = props;

  return (
    <VStack space={10} alignItems="center" marginBottom={"32"}>
      <InputForm value={name} placeholder="Nombre completo" setValue={setName} />
      <InputForm value={email} placeholder="Email" setValue={setEmail} />
      <InputPassword password={password} setPassword={setPassword} />
    </VStack>
  );
}
