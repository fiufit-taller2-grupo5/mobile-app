import { Input, VStack, Icon, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

export default function LoginForm(props: Props) {
  const { email, setEmail, password, setPassword } = props;
  const [show, setShow] = useState(false);

  return (
    <VStack space={10} alignItems="center" top={"5%"}>
      <Input
        value={email}
        w={{base: "80%", md: "30%"}} 
        h="15%" 
        variant="underlined" 
        placeholder="Email" 
        onChangeText={(email) => setEmail(email)}
      />
      <Input w={{base: "80%", md: "25%"}}
        value={password}
        h="15%"
        type={show ? "text" : "password"}
        variant="underlined"
        onChangeText={(password) => setPassword(password)}
        InputRightElement={<Pressable onPress={ () => setShow(!show) }>
        <Icon as={<MaterialIcons name={ show ? "visibility" : "visibility-off" } />}
        size={5} mr="2" color="muted.400" />
        </Pressable>} placeholder="Contraseña"
      />
    </VStack>
  );
}