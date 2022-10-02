import {
  Button,
  Center,
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import getValidationErrors from '../utils/getYupValidationErrors';
import { useAuth } from '../context/useAuth';

interface FormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Props {
  registerMocked?: () => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha obrigatória'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senhas não conferem',
  ),
});

export default function Home({ registerMocked }: Props) {
  const { push } = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({} as FormProps);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError({} as FormProps);

    const body = {
      email,
      password,
      name,
      confirmPassword,
    };

    try {
      await schema.validate(body, {
        abortEarly: false,
      });

      registerMocked?.();
      await register(body);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newError = getValidationErrors(err);
        setError(newError as FormProps);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <Center bg="gray.200" minH="100vh" minW="100vw" px="6">
        <Flex
          bg="white"
          w="100%"
          my="6"
          maxWidth={540}
          px="6"
          py="12"
          borderRadius={12}
          direction="column"
        >
          <Text
            align="center"
            fontWeight="bold"
            fontSize="3xl"
            marginBottom={6}
          >
            Cadastro
          </Text>

          <Stack spacing={6}>
            <FormControl isInvalid={!!error.name}>
              <FormLabel>Nome</FormLabel>
              <Input
                data-testid="name-input"
                colorScheme="blue"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormErrorMessage>{error.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!error.email}>
              <FormLabel>Email</FormLabel>
              <Input
                data-testid="email-input"
                colorScheme="blue"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{error.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!error.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                data-testid="password-input"
                colorScheme="blue"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{error.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!error.confirmPassword}>
              <FormLabel>Confirmação de senha</FormLabel>
              <Input
                data-testid="password-confirm-input"
                colorScheme="blue"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormErrorMessage>{error.confirmPassword}</FormErrorMessage>
            </FormControl>

            <Button
              data-testid="register-button"
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Cadastrar
            </Button>

            <Button onClick={() => push('/')} colorScheme="blue" variant="link">
              Já tem login? Entrar
            </Button>
          </Stack>
        </Flex>
      </Center>
    </>
  );
}
