import { initializeApp } from 'firebase/app';
import { NextApiRequest, NextApiResponse } from 'next';

import { getFirestore, doc, updateDoc } from 'firebase/firestore';

import firebaseConfig from '../../../services/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const data = req.body;

    if (!data.userId) {
      res.status(403).json({ error: 'Usuário não identificado' });
    }

    const newNote = { ...data };

    try {
      const cardDocRef = doc(db, 'notes', data.id);
      await updateDoc(cardDocRef, newNote);
      res.status(200).json({});
    } catch (error) {
      res.status(400).json({ error: 'Não foi possível criar nova nota' });
    }
  } else {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('METHOD Not Allowed');
  }
};
