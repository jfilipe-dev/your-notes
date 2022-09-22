import { useAuth } from '../context/useAuth';

export default function dashboard() {
  const { userInfo } = useAuth();

  return <h1>{userInfo.email}</h1>;
}
