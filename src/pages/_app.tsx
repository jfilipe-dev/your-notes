import { AppProps } from 'next/app';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/useAuth';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default MyApp;
