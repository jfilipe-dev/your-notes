import { Box, Button, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { useAuth } from '../../context/useAuth';

export default function dashboard() {
  const { userInfo, logout } = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box>
        <Flex display="flex">
          <Flex
            display="flex"
            alignItems="center"
            justifyContent="start"
            background=" #070707;"
            flex="1"
            h="100vh"
            flexDir="column"
          >
            <Flex
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="10vh"
              w="90%"
              color="#DDFF0E"
              borderBottom="2px"
              borderColor="#181818"
            >
              <h1>YOUR-NOTES</h1>
            </Flex>
            <Flex
              display="block"
              alignItems="center"
              justifyContent="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              m="2rem 0 "
              w="35vh"
              color="#FFFFFF"
            >
              titulo do negocio ai do post n sei o que la <br />
            </Flex>

            <Button
              mt="1rem"
              w="35vh"
              color="white"
              borderStyle="dashed"
              variant="outline"
            >
              Nova nota
            </Button>
            <Button
              mt="1rem"
              w="35vh"
              onClick={logout}
              colorScheme="red"
              color="white"
              variant="solid"
            >
              Sair
            </Button>
          </Flex>
          <Flex
            display="block"
            alignItems="center"
            justifyContent="end"
            flex="3"
            background=" #0A0A0A;"
          >
            <Flex
              display="flex"
              alignItems="center"
              justifyContent="start"
              flex="1"
              p="0 2rem"
              m="0 2rem"
              h="10vh"
              w="90%"
              color="white"
              borderBottom="2px"
              borderColor="#181818"
            >
              Sem título
            </Flex>

            <Flex
              display="flex"
              flex="3"
              h="90vh"
              w="90%"
              p="2rem 0 0 2rem "
              m="0 2rem"
            >
              Teste Teste
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
