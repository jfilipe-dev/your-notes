import { Flex } from '@chakra-ui/react';

export default function AreaEditor() {
  return (
    <Flex
      display="block"
      alignItems="center"
      justifyContent="end"
      px="12"
      background=" #0A0A0A;"
    >
      <Flex
        display="flex"
        alignItems="center"
        justifyContent="start"
        h="10vh"
        color="white"
        borderBottom="2px"
        borderColor="#181818"
      >
        Sem título
      </Flex>

      <Flex display="flex" h="90vh" pt={12}>
        Teste Teste
      </Flex>
    </Flex>
  );
}
