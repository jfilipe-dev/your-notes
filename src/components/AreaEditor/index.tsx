import { Button, Flex, Input, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Note } from '../../pages/dashboard';

interface AreaEditor {
  data: Note;
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
        justifyContent="start"
        h="10vh"
        color="white"
        borderBottom="2px"
        borderColor="#181818"
      >
        <Input
          size="lg"
          value={title}
          colorScheme="white"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button
          data-testid="login-button"
          colorScheme="blue"
          size="lg"
          ml={8}
          onClick={update}
        >
          Salvar
        </Button>
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
        />
      </Flex>
    </Flex>
  );
}
