import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth';
import firebaseConfig from '../../../services/firebaseConfig';

interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

initializeApp(firebaseConfig);
const auth = getAuth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body as unknown as RegisterProps;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const userInfo = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        };

        res.status(200).json(userInfo);
      })
      .catch((err: AuthError) => {
        if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
          res.status(400).json({ error: 'E-mail já cadastrado' });
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
