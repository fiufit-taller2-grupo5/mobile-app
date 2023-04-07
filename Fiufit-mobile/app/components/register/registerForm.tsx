import { VStack, Input, Pressable, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";


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
  const [show, setShow] = useState(false);

  return (
    <VStack space={4} alignItems="center" top={"10%"}>
      <Input
        value={name}
        w={{ base: "80%", md: "30%" }} 
        h="15%" 
        variant="underlined"
        onChangeText={ (name) => setName(name) }
        placeholder="Nombre completo"
      />
      <Input
        value={email}
        w={{ base: "80%", md: "30%" }} 
        h="15%"
        variant="underlined" 
        placeholder="Email" 
        onChangeText={ (email) => setEmail(email) }
      />
      <Input
        value={password}
        w={{ base: "80%", md: "25%" }}
        h="15%"
        type={ show ? "text" : "password" }
        variant="underlined"
        onChangeText={ (password) => setPassword(password) }
        InputRightElement={<Pressable onPress={ () => setShow(!show) }>
        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
        size={5} mr="2" color="muted.400" />
        </Pressable>} placeholder="Contraseña"
      />
    </VStack>
  );
}