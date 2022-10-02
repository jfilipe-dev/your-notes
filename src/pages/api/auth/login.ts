import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase/app';
import {
  AuthError,
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import firebaseConfig from '../../../services/firebaseConfig';

interface LoginProps {
  email: string;
  password: string;
}

const badLoginErros: string[] = [
  AuthErrorCodes.USER_DELETED,
  AuthErrorCodes.INVALID_PASSWORD,
];

initializeApp(firebaseConfig);
const auth = getAuth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body as unknown as LoginProps;

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userInfo = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        };

        res.status(200).json(userInfo);
      })
      .catch((err: AuthError) => {
        if (badLoginErros.includes(err.code)) {
          res.status(400).json({ error: 'E-mail e/ou senha inválido(s)' });
        }

        if (err.code === AuthErrorCodes.INVALID_EMAIL) {
          res.status(400).json({ error: 'E-mail inválido' });
        }
      });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('METHOD Not Allowed');
  }
};
