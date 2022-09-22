import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import firebaseConfig from '../../../services/firebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const handleUser = (user?: User) => {
      if (user) {
        const userInfo = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        };
        res.status(200).json(userInfo);
      } else {
        res.status(403).json({ error: 'Úsuário não encontrado' });
      }
    };

    auth.onIdTokenChanged(handleUser);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('METHOD Not Allowed');
  }
};
