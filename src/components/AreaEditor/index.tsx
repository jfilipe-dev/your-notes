import { Button, Flex, HStack, Icon, Input, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Note } from '../../pages/dashboard';
import { FiTrash2, FiSave } from 'react-icons/fi';

interface AreaEditor {
  data?: Note;
  onUpdate: (note: Note) => void;
}

export default function AreaEditor({ data, onUpdate }: AreaEditor) {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const update = () => {
    const note = {
      ...data,
      message,
      title,
    };

    onUpdate(note);
  };

  useEffect(() => {
    setMessage(data?.message || '');
    setTitle(data?.title || '');
  }, [data]);

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
        justifyContent="space-between"
        h="10vh"
        borderBottom="2px"
        color="white"
        borderColor="#white"
      >
        <Input
          name="title"
          size="lg"
          value={title}
          colorScheme="white"
          onChange={(e) => setTitle(e.target.value)}
          data-testid="input-title"
        />

        <HStack spacing="2" ml="3">
          <Button variant="outline" size="lg" data-testid="update-button">
            <Icon
              as={FiSave}
              fontSize="28"
              color="#DDFF0E"
              onClick={update}
            ></Icon>
          </Button>
          <Button variant="outline" size="lg">
            <Icon as={FiTrash2} fontSize="28" color="#F24482"></Icon>
          </Button>
        </HStack>
      </Flex>

      <Flex display="flex" h="90vh" py={12}>
        <Textarea
          placeholder="Digite seu texto aqui"
          border="none"
          color="white"
          _placeholder={{
            color: '#3c3b3b',
          }}
          flex={1}
          height="100%"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          data-testid="textarea-test"
        />
      </Flex>
    </Flex>
  );
}
