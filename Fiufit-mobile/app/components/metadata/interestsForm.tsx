import { VStack, Checkbox, Text } from "native-base";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import { getInterests } from "../../../api";


interface Props {
  top: string;
  interests: string[];
  setInterests: (interests: any) => void;
}

export default function InterestsForm(props: Props) {
  const { top, interests, setInterests } = props;

  let interestsSelected = interests;

  const handleChange = (interest: string) => {
    if (interestsSelected.includes(interest)) {
      const index = interestsSelected.indexOf(interest);
      if (index > -1) {
        interestsSelected.splice(index, 1);
      }
      setInterests(interestsSelected);
    }
    else {
      interestsSelected.push(interest);
      setInterests(interestsSelected);
    }
  }

  // TODO should move this to api.ts?
  const interestsResponse = useSWR("https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/interests", getInterests);

  const [interestsData, setInterestsList] = useState<string[]>([]);
  useEffect(() => {
    if(interestsResponse.data) {
      setInterestsList(interestsResponse.data);
    }
  }, [interestsResponse.data]);
  

  return (
    <VStack space={8}
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
              mr={"12"}
              onChange={() => {handleChange(interest);}}
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