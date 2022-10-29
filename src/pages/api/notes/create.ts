import { initializeApp } from 'firebase/app';
import { NextApiRequest, NextApiResponse } from 'next';

import { addDoc, collection, getFirestore } from 'firebase/firestore';

import firebaseConfig from '../../../services/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const newNote = { title: 'Sem título', message: '' };

    try {
      await addDoc(collection(db, 'notes'), newNote);
      res.status(200).json(newNote);
    } catch (error) {
      res.status(400).json({ error: 'Não foi possível criar nova nota' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('METHOD Not Allowed');
  }
};
