import { AppProps } from 'next/app';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { AuthProvider } from '../context/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
