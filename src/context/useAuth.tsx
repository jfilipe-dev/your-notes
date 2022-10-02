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
import { toast } from 'react-toastify';
import api from '../services/api';

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  email: string;
  password: string;
  name: string;
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
  register: (data: RegisterProps) => Promise<void>;
  logout: () => Promise<void>;
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

  const register = useCallback(async (body: RegisterProps) => {
    try {
      const { data } = await api.post<UserInfoProps>('/auth/register', body);

      setUserInfo(data);
      redirect(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  const login = useCallback(async (body: LoginProps) => {
    try {
      const { data } = await api.post<UserInfoProps>('/auth/login', body);

      setUserInfo(data);
      redirect(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.delete('/auth/logout');
      setUserInfo({} as UserInfoProps);
      redirect();
    } catch {
      //
    }
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  const value = useMemo(
    () => ({
      userInfo,
      loading,
      login,
      logout,
      register,
    }),
    [userInfo, loading, login, register],
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
