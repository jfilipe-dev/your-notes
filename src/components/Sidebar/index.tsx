import { Box, Button, Flex } from '@chakra-ui/react';
import { useAuth } from '../../context/useAuth';
import { Note } from '../../pages/dashboard';

interface SidebarProps {
  createNote: () => void;
  notes: Note[];
  // eslint-disable-next-line react/require-default-props
  onSelect?: (note: Note) => void;
}

function Sidebar({ createNote, notes, onSelect }: SidebarProps) {
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
        fontWeight="bold"
        color="#DDFF0E"
        borderBottom="2px"
        borderColor="#181818"
      >
        YOUR-NOTES
      </Box>
      <Flex
        display="flex"
        flexDirection="column"
        py={12}
        flex={1}
        color="#FFFFFF"
      >
        <Flex display="flex" flexDirection="column" overflowY="auto">
          {notes.map((note) => (
            <Button
              variant="link"
              style={{ textAlign: 'left', marginBottom: 12 }}
              display="block"
              onClick={() => onSelect(note)}
              colorScheme="white"
            >
              {note.title}
            </Button>
          ))}
        </Flex>

        <Button
          data-testid="mewnote-button"
          my="1rem"
          colorScheme="white"
          borderStyle="dashed"
          variant="outline"
          onClick={createNote}
        >
          Nova nota
        </Button>
        <Button
          data-testid="exit-button"
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
