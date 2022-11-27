import { initializeApp } from 'firebase/app';
import { NextApiRequest, NextApiResponse } from 'next';

import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

import firebaseConfig from '../../../services/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { userId, noteId } = req.query;

    if (!userId) {
      res.status(403).json({ error: 'Usuário não identificado' });
    }

    if (!noteId) {
      res.status(403).json({ error: 'Nota não encontrada' });
    }

    try {
      const cardDocRef = doc(db, 'notes', noteId as string);
      await deleteDoc(cardDocRef);
      res.status(200).json({});
    } catch (error) {
      res.status(400).json({ error: 'Não foi possível deletear a nota' });
    }
  } else {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('METHOD Not Allowed');
  }
};
