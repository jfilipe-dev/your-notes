import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../../../services/firebaseConfig';

interface LoginProps {
  email: string;
  password: string;
}

initializeApp(firebaseConfig);
const auth = getAuth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body as unknown as LoginProps;

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const userInfo = {
      email: user.email,
      id: user.uid,
      token: user.refreshToken,
    };

    res.status(200).json(userInfo);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('METHOD Not Allowed');
  }
};
