import { Button } from '@chakra-ui/react';
import { useAuth } from '../context/useAuth';

export default function dashboard() {
  const { userInfo, logout } = useAuth();

  return (
    <>
      <h1>Olá, {userInfo.email}</h1>
      <Button onClick={logout} colorScheme="red" variant="link">
        Sair
      </Button>
    </>
  );
}
