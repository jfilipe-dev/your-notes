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
  email: string;
  password: string;
}

export interface Props {
  loginMocked?: () => void;
}

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha obrigatória'),
});

export default function Home({ loginMocked }: Props) {
  const { login } = useAuth();
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({} as FormProps);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError({} as FormProps);

    const body = {
      email,
      password,
    };

    try {
      await schema.validate(body, {
        abortEarly: false,
      });

      loginMocked?.();
      await login(body);
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
        <title>Sign In</title>
      </Head>
      <Center bg="#1E1E1E" minH="100vh" minW="100vw" px="6">
        <Flex
          bg="#121213"
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
            color="#FFF"
          >
            Sign In
          </Text>

          <Stack spacing={6} color="white">
            <FormControl isInvalid={!!error.email}>
              <FormLabel>Email</FormLabel>
              <Input
                data-testid="email-input"
                colorScheme="blue"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="#FFD257"
              />
              <FormErrorMessage>{error.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!error.password}>
              <FormLabel>Password</FormLabel>
              <Input
                data-testid="password-input"
                colorScheme="blue"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="#FFD257"
              />
              <FormErrorMessage>{error.password}</FormErrorMessage>
            </FormControl>

            <Button
              data-testid="login-button"
              bg="#F05071"
              color="#FFF"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Sign In
            </Button>

            <Button
              onClick={() => push('/register')}
              color="#FFF"
              variant="link"
            >
              Dont have an account? Create account
            </Button>
          </Stack>
        </Flex>
      </Center>
    </>
  );
}
