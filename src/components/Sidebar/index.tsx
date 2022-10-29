import { Box, Button, Flex } from '@chakra-ui/react';
import { useAuth } from '../../context/useAuth';
import { Note } from '../../pages/dashboard';

interface SidebarProps {
  createNote: () => void;
  notes: Note[];
}

function Sidebar({ createNote, notes }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <Flex
      display="flex"
      justifyContent="start"
      background=" #070707;"
      flexDir="column"
      height="100vh"
      px={12}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="10vh"
        color="#DDFF0E"
        borderBottom="2px"
        borderColor="#181818"
      >
        <h1>YOUR-NOTES</h1>
      </Box>
      <Flex
        display="flex"
        flexDirection="column"
        py={12}
        flex={1}
        color="#FFFFFF"
      >
        <Flex display="flex" flexDirection="column" overflowY="auto">
          {notes.map(({ title }) => (
            <p style={{ textAlign: 'left', marginBottom: 12 }}>{title}</p>
          ))}
        </Flex>

        <Button
          my="1rem"
          colorScheme="white"
          borderStyle="dashed"
          variant="outline"
          onClick={createNote}
        >
          Nova nota
        </Button>
        <Button
          onClick={logout}
          colorScheme="red"
          color="white"
          variant="solid"
          mt="auto"
        >
          Sair
        </Button>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
