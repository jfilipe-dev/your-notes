import { initializeApp } from 'firebase/app';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import firebaseConfig from '../../../services/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      res.status(403).json({ error: 'Usuário não identificado' });
    }

    try {
      const q = query(collection(db, 'notes'), where('userId', '==', userId));

      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: 'Não foi possível criar nova nota' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('METHOD Not Allowed');
  }
};
