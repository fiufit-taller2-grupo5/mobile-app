import { VStack, Checkbox, Text } from "native-base";
import { useEffect, useState } from "react";
import { API } from "../../../api";


interface Props {
  top: string;
  interests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
  navigation: any;
}

export default function InterestsForm(props: Props) {
  const { top, interests, setInterests } = props;
  const [interestsData, setInterestsList] = useState<string[]>([]);

  const api = new API(props.navigation);

  const handleChange = (interest: string) => {
    console.log(interests, interest);
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((item) => item !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  }

  useEffect(() => {
    const getInterests = async () => {
      const interests = await api.getInterests();
      setInterestsList(interests);
    }
    getInterests();
  }, []);


  return (
    <VStack space={8}
      height={"25%"}
      style={{
        top: top,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/*rows of 3 elements, equidistant to each other horizontally and vertically:*/}
      <VStack space={"9"}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: "wrap",
          alignItems: 'center',
          justifyContent: "flex-start"
        }}
      >
        {interestsData.map((interest) => {
          return (
            <Checkbox
              colorScheme='rose'
              key={interest}
              value={interest}
              isChecked={interests.includes(interest)}
              mr={"12"}
              onChange={() => { handleChange(interest); }}
            >
              <Text width={"20"}>
                {interest}
              </Text>
            </Checkbox>
          );
        })}
      </VStack>
    </VStack>
  );
}