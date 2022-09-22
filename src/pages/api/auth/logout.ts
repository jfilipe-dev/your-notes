import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../../services/firebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    await auth.signOut();

    res.status(200).json({ message: 'Úsuário deslogado' });
  } else {
    res.setHeader('Allow', 'DELETE');
    res.status(405).end('METHOD Not Allowed');
  }
};
