import { VStack } from "native-base";
import React from "react";
import InputForm from "../form/inputForm";
import InputPassword from "../form/inputPassword";


interface Props {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

export default function LoginForm(props: Props) {
  const { email, setEmail, password, setPassword } = props;

  return (
    <VStack space={10} marginBottom={"32"}>
      <InputForm value={email} placeholder="Email" setValue={setEmail} />
      <InputPassword password={password} setPassword={setPassword} />
    </VStack>
  );
}