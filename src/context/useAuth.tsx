import { useRouter } from 'next/router';
import {
  createContext,
  useContext,
  useState,
  ReactChild,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import api from '../services/api';

interface LoginProps {
  email: string;
  password: string;
}

interface UserInfoProps {
  id: string;
  email: string;
  token: string;
}

interface AuthContextData {
  userInfo: UserInfoProps;
  loading: boolean;
  login: (data: LoginProps) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactChild }) {
  const { push, route } = useRouter();

  const [userInfo, setUserInfo] = useState({} as UserInfoProps);
  const [loading, setLoading] = useState(true);

  const redirect = async (isValid = false) => {
    if (route !== 'register' && !isValid) {
      await push('/');
    }

    if (isValid) {
      await push('/dashboard');
    }
  };

  const verify = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/verify');

      if (data) {
        setUserInfo(data);
        await redirect(true);
      } else {
        await redirect();
      }
    } catch {
      redirect();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (body: LoginProps) => {
    const { data } = await api.post<UserInfoProps>('/auth/login', body);

    setUserInfo(data);
    await push('/dashboard');
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  const value = useMemo(
    () => ({
      userInfo,
      loading,
      login,
    }),
    [userInfo, loading, login],
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <h1>CARREGANDO....</h1> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as Authprovider');
  }

  return context;
}
